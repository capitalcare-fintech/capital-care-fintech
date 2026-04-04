import { getDB } from "@/lib/db";
import {
  INSURANCE_APPLICATION_CONFIG,
  INSURANCE_APPLICATION_STATUSES,
  isInsuranceApplicationStatus,
  isInsuranceType,
  type InsuranceApplicationStatus,
} from "@/lib/insurance-application-config";
import { sendInsuranceApplicationAdminEmail } from "@/lib/mail/mailer/insurance-application-mailer";
import { sendUserInsuranceApplicationConfirmationEmail } from "@/lib/mail/mailer/insurance-application-user-mailer";
import { NextRequest, NextResponse } from "next/server";

type StoredInsuranceApplication = {
  id: number;
  application_id: string;
  insurance_type: string;
  full_name: string;
  email: string;
  mobile: string;
  status: InsuranceApplicationStatus;
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
  __insuranceDocStore?: Map<string, Buffer>;
};

function getDocStore(): Map<string, Buffer> {
  if (!memoryStore.__insuranceDocStore) {
    memoryStore.__insuranceDocStore = new Map<string, Buffer>();
  }
  return memoryStore.__insuranceDocStore;
}

function createPublicApplicationId(): string {
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `IA-${Date.now()}-${rand}`;
}

async function ensureInsuranceApplicationsTable() {
  const db = getDB();
  await db.query(`
    CREATE TABLE IF NOT EXISTS insurance_applications (
      id BIGINT AUTO_INCREMENT PRIMARY KEY,
      application_id VARCHAR(40) NOT NULL UNIQUE,
      user_id VARCHAR(36) NULL,
      insurance_type VARCHAR(60) NOT NULL,
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
      INDEX idx_insurance_type (insurance_type),
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

function parseStoredRow(row: StoredInsuranceApplication) {
  return {
    ...row,
    form_data: JSON.parse(row.form_data),
    documents_metadata: JSON.parse(row.documents_metadata),
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const insuranceTypeRaw = normalizeFormValue(body.get("insuranceType") ?? body.get("insurance_type"));
    const formDataRaw = normalizeFormValue(body.get("formData") ?? body.get("form_data"));

    if (!isInsuranceType(insuranceTypeRaw)) {
      return NextResponse.json({ success: false, error: "Invalid insurance type" }, { status: 400 });
    }

    if (!formDataRaw) {
      return NextResponse.json({ success: false, error: "Missing form data" }, { status: 400 });
    }

    let formData: Record<string, unknown>;
    try {
      formData = JSON.parse(formDataRaw);
    } catch {
      return NextResponse.json({ success: false, error: "Invalid form data format" }, { status: 400 });
    }

    const files: Array<{ key: string; file: File }> = [];
    for (const [key, value] of body.entries()) {
      if (value instanceof File) files.push({ key, file: value });
    }

    const fileMap = new Map(files.map((item) => [item.key, item.file]));
    const fieldErrors: Record<string, string[]> = {};
    const typeConfig = INSURANCE_APPLICATION_CONFIG[insuranceTypeRaw];

    for (const field of typeConfig.requiredFields) {
      const val = normalizeFormValue(formData[field]);
      if (!val) {
        fieldErrors[field] = ["This field is required"];
      }
    }

    const email = normalizeFormValue(formData.email);
    const mobile = normalizeFormValue(formData.mobile);
    const pinCode = normalizeFormValue(formData.pinCode);

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fieldErrors.email = ["Invalid email address"];
    }

    if (mobile && !/^\d{10}$/.test(mobile.replace(/\D/g, ""))) {
      fieldErrors.mobile = ["Mobile must be 10 digits"];
    }

    if (pinCode && !/^\d{6}$/.test(pinCode)) {
      fieldErrors.pinCode = ["PIN code must be 6 digits"];
    }

    for (const docType of typeConfig.requiredDocs) {
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
      return NextResponse.json(
        { success: false, error: "Validation failed", fieldErrors },
        { status: 400 },
      );
    }

    await ensureInsuranceApplicationsTable();

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

    await db.query(
      `INSERT INTO insurance_applications
      (application_id, insurance_type, full_name, email, mobile, status, form_data, documents_metadata)
      VALUES (?, ?, ?, ?, ?, 'submitted', ?, ?)`,
      [
        applicationId,
        insuranceTypeRaw,
        fullName,
        email,
        mobile,
        JSON.stringify(formData),
        JSON.stringify(documentsMetadata),
      ],
    );

    await sendInsuranceApplicationAdminEmail({
      applicationId,
      insuranceTypeLabel: INSURANCE_APPLICATION_CONFIG[insuranceTypeRaw].label,
      fullName,
      email,
      mobile,
      formData,
      files,
    });

    await sendUserInsuranceApplicationConfirmationEmail({
      applicationId,
      insuranceTypeLabel: INSURANCE_APPLICATION_CONFIG[insuranceTypeRaw].label,
      fullName,
      email,
      mobile,
    });

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
    console.error("[POST /api/insurance-applications] error", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await ensureInsuranceApplicationsTable();

    const params = req.nextUrl.searchParams;
    const status = params.get("status")?.trim() ?? "";
    const insuranceType = params.get("insuranceType")?.trim() ?? "";
    const page = parsePositiveInt(params.get("page"), 1);
    const limit = Math.min(parsePositiveInt(params.get("limit"), 20), 100);
    const offset = (page - 1) * limit;

    const whereParts: string[] = [];
    const values: Array<string | number> = [];

    if (status) {
      if (!isInsuranceApplicationStatus(status)) {
        return NextResponse.json(
          {
            success: false,
            error: `status must be one of: ${INSURANCE_APPLICATION_STATUSES.join(", ")}`,
          },
          { status: 400 },
        );
      }
      whereParts.push("status = ?");
      values.push(status);
    }

    if (insuranceType) {
      if (!isInsuranceType(insuranceType)) {
        return NextResponse.json({ success: false, error: "Invalid insuranceType" }, { status: 400 });
      }
      whereParts.push("insurance_type = ?");
      values.push(insuranceType);
    }

    const whereClause = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";

    const db = getDB();
    const [rows] = await db.query(
      `SELECT * FROM insurance_applications ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [...values, limit, offset],
    );

    const [countRows] = await db.query(
      `SELECT COUNT(*) as total FROM insurance_applications ${whereClause}`,
      values,
    );

    const typedRows = rows as StoredInsuranceApplication[];
    const total = Number((countRows as Array<{ total: number }>)[0]?.total ?? 0);

    return NextResponse.json({
      success: true,
      data: {
        items: typedRows.map(parseStoredRow),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("[GET /api/insurance-applications] error", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
