import { getDB } from "@/lib/db";
import {
  APPLICATION_STATUSES,
  isApplicationStatus,
  isLoanType,
  LOAN_APPLICATION_CONFIG,
  type ApplicationStatus,
} from "@/lib/loan-application-config";
import { sendLoanApplicationAdminEmail } from "@/lib/mail/mailer/loan-application-mailer";
import { sendUserApplicationConfirmationEmail } from "@/lib/mail/mailer/loan-application-user-mailer";
import { NextRequest, NextResponse } from "next/server";

type StoredApplication = {
  id: number;
  application_id: string;
  loan_type: string;
  loan_subtype: string;
  full_name: string;
  email: string;
  mobile: string;
  status: ApplicationStatus;
  status_note: string | null;
  form_data: string;
  documents_metadata: string;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
};

type FileRecord = {
  filename: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  storageKey: string;
};

const ALLOWED_MIME_TYPES = new Set(["application/pdf", "image/jpeg", "image/png"]);
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const memoryStore = globalThis as unknown as {
  __loanDocStore?: Map<string, Buffer>;
};

function getDocStore(): Map<string, Buffer> {
  if (!memoryStore.__loanDocStore) {
    memoryStore.__loanDocStore = new Map<string, Buffer>();
  }
  return memoryStore.__loanDocStore;
}

function createPublicApplicationId(): string {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `LA-${Date.now()}-${rand}`;
}

async function ensureLoanApplicationsTable() {
  const db = getDB();
  await db.query(`
    CREATE TABLE IF NOT EXISTS loan_applications (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      application_id VARCHAR(40) NOT NULL UNIQUE,
      user_id VARCHAR(36) NULL,
      loan_type VARCHAR(60) NOT NULL,
      loan_subtype VARCHAR(80) NOT NULL,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      mobile VARCHAR(20) NOT NULL,
      status ENUM('submitted', 'in_review', 'approved', 'rejected') NOT NULL DEFAULT 'submitted',
      status_note TEXT NULL,
      rejection_reason TEXT NULL,
      internal_notes TEXT NULL,
      reviewed_by VARCHAR(36) NULL,
      form_data LONGTEXT NOT NULL,
      documents_metadata LONGTEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      reviewed_at TIMESTAMP NULL,
      INDEX idx_user_id (user_id),
      INDEX idx_loan_type (loan_type),
      INDEX idx_status (status),
      INDEX idx_created_at (created_at)
    )
  `);
}

function normalizeFormValue(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function parsePositiveInt(value: string | null, fallback: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return parsed;
}

function parseStoredRow(row: StoredApplication) {
  return {
    ...row,
    form_data: JSON.parse(row.form_data),
    documents_metadata: JSON.parse(row.documents_metadata),
  };
}

export async function POST(req: NextRequest) {
  try {
    console.log("[POST /api/loan-applications] ✅ Request received");

    const body = await req.formData();
    const loanTypeRaw = normalizeFormValue(body.get("loanType") ?? body.get("loan_type"));
    const loanSubtypeRaw = normalizeFormValue(body.get("loanSubtype") ?? body.get("loan_subtype"));
    const formDataRaw = normalizeFormValue(body.get("formData") ?? body.get("form_data"));

    console.log("[POST /api/loan-applications] 📋 Form parsed", {
      loanType: loanTypeRaw,
      loanSubtype: loanSubtypeRaw,
      hasFormData: !!formDataRaw,
    });

    if (!isLoanType(loanTypeRaw)) {
      console.log("[POST /api/loan-applications] ❌ Invalid loan type:", loanTypeRaw);
      return NextResponse.json({ success: false, error: "Invalid loan type" }, { status: 400 });
    }

    const subtypeConfig = LOAN_APPLICATION_CONFIG[loanTypeRaw].subtypes[loanSubtypeRaw];
    if (!subtypeConfig) {
      console.log("[POST /api/loan-applications] ❌ Invalid loan subtype:", loanSubtypeRaw);
      return NextResponse.json({ success: false, error: "Invalid loan subtype" }, { status: 400 });
    }

    if (!formDataRaw) {
      console.log("[POST /api/loan-applications] ❌ Missing form data");
      return NextResponse.json({ success: false, error: "Missing form data" }, { status: 400 });
    }

    let formData: Record<string, unknown>;
    try {
      formData = JSON.parse(formDataRaw);
    } catch {
      console.log("[POST /api/loan-applications] ❌ Invalid form data JSON");
      return NextResponse.json({ success: false, error: "Invalid form data format" }, { status: 400 });
    }

    const files: Array<{ key: string; file: File }> = [];
    for (const [key, value] of body.entries()) {
      if (value instanceof File) {
        files.push({ key, file: value });
      }
    }

    console.log("[POST /api/loan-applications] 📎 Files extracted", {
      count: files.length,
      names: files.map((f) => f.file.name),
    });

    const fileMap = new Map(files.map((item) => [item.key, item.file]));
    const fieldErrors: Record<string, string[]> = {};

    for (const field of subtypeConfig.requiredFields) {
      const val = normalizeFormValue(formData[field]);
      if (!val) {
        fieldErrors[field] = ["This field is required"];
      }
    }

    const email = normalizeFormValue(formData.email);
    const mobile = normalizeFormValue(formData.mobile);
    const panNumber = normalizeFormValue(formData.panNumber);

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.email = ["Invalid email address"];
    }

    if (mobile && !/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
      fieldErrors.mobile = ["Mobile must be 10 digits"];
    }

    if (panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(panNumber)) {
      fieldErrors.panNumber = ["Invalid PAN format"];
    }

    for (const docType of subtypeConfig.requiredDocs) {
      if (!fileMap.has(docType)) {
        fieldErrors[docType] = ["Required document missing"];
      }
    }

    for (const [docType, file] of fileMap.entries()) {
      if (!ALLOWED_MIME_TYPES.has(file.type)) {
        fieldErrors[docType] = ["Only PDF, JPG, PNG files are allowed"];
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        fieldErrors[docType] = ["File size must be <= 10MB"];
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      console.log("[POST /api/loan-applications] ⚠️ Validation failed", {
        errorCount: Object.keys(fieldErrors).length,
        errors: Object.keys(fieldErrors),
      });
      return NextResponse.json(
        { success: false, error: "Validation failed", fieldErrors },
        { status: 400 },
      );
    }

    console.log("[POST /api/loan-applications] ✅ All validations passed");

    await ensureLoanApplicationsTable();

    const applicationId = createPublicApplicationId();
    const uploadedAt = new Date().toISOString();
    const documentsMetadata: Record<string, FileRecord> = {};
    const store = getDocStore();

    for (const [docType, file] of fileMap.entries()) {
      const storageKey = `${applicationId}/${docType}/${Date.now()}-${file.name}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      store.set(storageKey, buffer);

      documentsMetadata[docType] = {
        filename: file.name,
        mimeType: file.type,
        size: file.size,
        uploadedAt,
        storageKey,
      };
    }

    const fullName = normalizeFormValue(formData.fullName);
    const db = getDB();

    console.log("[POST /api/loan-applications] 💾 Inserting application", {
      applicationId,
      loanType: loanTypeRaw,
      loanSubtype: loanSubtypeRaw,
      fullName,
      email,
    });

    await db.query(
      `INSERT INTO loan_applications
      (application_id, loan_type, loan_subtype, full_name, email, mobile, status, form_data, documents_metadata)
      VALUES (?, ?, ?, ?, ?, ?, 'submitted', ?, ?)`,
      [
        applicationId,
        loanTypeRaw,
        loanSubtypeRaw,
        fullName,
        email,
        mobile,
        JSON.stringify(formData),
        JSON.stringify(documentsMetadata),
      ],
    );

    console.log("[POST /api/loan-applications] ✅ Application inserted to DB", { applicationId });

    console.log("[POST /api/loan-applications] 📧 Sending admin email");
    await sendLoanApplicationAdminEmail({
      applicationId,
      loanTypeLabel: LOAN_APPLICATION_CONFIG[loanTypeRaw].label,
      loanSubtype: loanSubtypeRaw,
      fullName,
      email,
      mobile,
      formData,
      files,
    });

    console.log("[POST /api/loan-applications] ✅ Admin email sent");

    console.log("[POST /api/loan-applications] 📧 Sending user confirmation email");
    await sendUserApplicationConfirmationEmail({
      applicationId,
      loanTypeLabel: LOAN_APPLICATION_CONFIG[loanTypeRaw].label,
      fullName,
      email,
      mobile,
      panNumber,
    });

    console.log("[POST /api/loan-applications] ✅ User confirmation email sent");

    console.log("[POST /api/loan-applications] 🎉 Request completed successfully", { applicationId });

    return NextResponse.json(
      {
        success: true,
        data: {
          applicationId,
          status: "submitted",
          message: "Application submitted successfully",
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("[POST /api/loan-applications] ❌ Error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await ensureLoanApplicationsTable();

    const params = req.nextUrl.searchParams;
    const status = params.get("status")?.trim() ?? "";
    const loanType = params.get("loanType")?.trim() ?? "";
    const loanSubtype = params.get("loanSubtype")?.trim() ?? "";
    const page = parsePositiveInt(params.get("page"), 1);
    const limit = Math.min(parsePositiveInt(params.get("limit"), 20), 100);
    const offset = (page - 1) * limit;

    const whereParts: string[] = [];
    const values: Array<string | number> = [];

    if (status) {
      if (!isApplicationStatus(status)) {
        return NextResponse.json(
          { success: false, error: `status must be one of: ${APPLICATION_STATUSES.join(", ")}` },
          { status: 400 },
        );
      }
      whereParts.push("status = ?");
      values.push(status);
    }

    if (loanType) {
      if (!isLoanType(loanType)) {
        return NextResponse.json({ success: false, error: "Invalid loanType" }, { status: 400 });
      }
      whereParts.push("loan_type = ?");
      values.push(loanType);
    }

    if (loanSubtype) {
      whereParts.push("loan_subtype = ?");
      values.push(loanSubtype);
    }

    const whereSql = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";

    const db = getDB();
    const [rows] = await db.query(
      `SELECT * FROM loan_applications ${whereSql} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...values, limit, offset],
    );

    const typedRows = rows as StoredApplication[];

    const [countRows] = await db.query(
      `SELECT COUNT(*) as total FROM loan_applications ${whereSql}`,
      values,
    );

    const typedCountRows = countRows as Array<{ total: number }>;

    return NextResponse.json(
      {
        success: true,
        data: {
          items: typedRows.map(parseStoredRow),
          pagination: {
            page,
            limit,
            total: typedCountRows[0]?.total ?? 0,
            hasMore: page * limit < (typedCountRows[0]?.total ?? 0),
          },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[GET /api/loan-applications]", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
