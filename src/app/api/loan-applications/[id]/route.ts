import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type StoredApplication = {
  id: number;
  application_id: string;
  loan_type: string;
  loan_subtype: string;
  full_name: string;
  email: string;
  mobile: string;
  status: string;
  status_note: string | null;
  form_data: string;
  documents_metadata: string;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
};

function parseStoredRow(row: StoredApplication) {
  return {
    ...row,
    form_data: JSON.parse(row.form_data),
    documents_metadata: JSON.parse(row.documents_metadata),
  };
}

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const applicationId = id.trim();

    if (!applicationId) {
      return NextResponse.json({ success: false, error: "Missing application id" }, { status: 400 });
    }

    const db = getDB();
    const [rows] = await db.query(
      "SELECT * FROM loan_applications WHERE application_id = ? LIMIT 1",
      [applicationId],
    );

    const typedRows = rows as StoredApplication[];

    if (!typedRows[0]) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: parseStoredRow(typedRows[0]) }, { status: 200 });
  } catch (error) {
    console.error("[GET /api/loan-applications/[id]]", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
