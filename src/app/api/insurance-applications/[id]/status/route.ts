import { getDB } from "@/lib/db";
import { isInsuranceApplicationStatus } from "@/lib/insurance-application-config";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params;
    const applicationId = id.trim();

    if (!applicationId) {
      return NextResponse.json({ success: false, error: "Missing application id" }, { status: 400 });
    }

    const body = await req.json();
    const nextStatus = String(body?.status ?? "").trim();
    const note = String(body?.note ?? "").trim();

    if (!isInsuranceApplicationStatus(nextStatus)) {
      return NextResponse.json(
        { success: false, error: "Invalid status. Use submitted, in_review, approved, rejected" },
        { status: 400 },
      );
    }

    const db = getDB();
    const [result] = await db.query(
      `UPDATE insurance_applications
       SET status = ?, status_note = ?, reviewed_at = CASE WHEN ? = 'submitted' THEN NULL ELSE NOW() END
       WHERE application_id = ?`,
      [nextStatus, note || null, nextStatus, applicationId],
    );

    const affected = (result as { affectedRows?: number }).affectedRows ?? 0;
    if (!affected) {
      return NextResponse.json({ success: false, error: "Application not found" }, { status: 404 });
    }

    return NextResponse.json(
      { success: true, data: { applicationId, status: nextStatus, note: note || null } },
      { status: 200 },
    );
  } catch (error) {
    console.error("[PATCH /api/insurance-applications/[id]/status]", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
