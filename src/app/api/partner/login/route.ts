import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

async function ensureColumn() {
  const db = getDB();
  const dbName = process.env.DB_NAME ?? "railway";

  // Check if column exists via INFORMATION_SCHEMA (works on all MySQL versions)
  const [cols] = await db.query(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'partners' AND COLUMN_NAME = 'is_first_login'`,
    [dbName]
  ) as [Array<{ COLUMN_NAME: string }>, unknown];

  if (cols.length === 0) {
    await db.query(
      "ALTER TABLE partners ADD COLUMN is_first_login TINYINT(1) NOT NULL DEFAULT 1"
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { partnerId, password } = await req.json();

    if (!partnerId || !password) {
      return NextResponse.json({ error: "Partner ID and password are required" }, { status: 400 });
    }

    const db = getDB();

    // Ensure column exists before querying it
    await ensureColumn();

    const [rows] = await db.query(
      "SELECT id, full_name, partner_id, password, is_first_login FROM partners WHERE partner_id = ?",
      [partnerId]
    ) as [Array<{ id: number; full_name: string; partner_id: string; password: string; is_first_login: number }>, unknown];

    if (rows.length === 0) {
      return NextResponse.json({ error: "Invalid Partner ID or password" }, { status: 401 });
    }

    const partner = rows[0];
    const match = await bcrypt.compare(password, partner.password);

    if (!match) {
      return NextResponse.json({ error: "Invalid Partner ID or password" }, { status: 401 });
    }

    if (partner.is_first_login) {
      return NextResponse.json({
        firstLogin: true,
        partnerId: partner.partner_id,
        name: partner.full_name,
      });
    }

    return NextResponse.json({
      firstLogin: false,
      partner: { id: partner.id, name: partner.full_name, partnerId: partner.partner_id },
    });
  } catch (error) {
    console.error("[POST /api/partner/login]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
