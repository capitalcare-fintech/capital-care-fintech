import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { partnerId, newPassword } = await req.json();

    if (!partnerId || !newPassword) {
      return NextResponse.json({ error: "Partner ID and new password are required" }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const db = getDB();

    const [rows] = await db.query(
      "SELECT id, full_name FROM partners WHERE partner_id = ?",
      [partnerId]
    ) as [Array<{ id: number; full_name: string }>, unknown];

    if (rows.length === 0) {
      return NextResponse.json({ error: "Partner not found" }, { status: 404 });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await db.query(
      "UPDATE partners SET password = ?, is_first_login = 0 WHERE partner_id = ?",
      [hashed, partnerId]
    );

    return NextResponse.json({
      message: "Password updated successfully",
      partner: { name: rows[0].full_name, partnerId },
    });
  } catch (error) {
    console.error("[POST /api/partner/set-password]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
