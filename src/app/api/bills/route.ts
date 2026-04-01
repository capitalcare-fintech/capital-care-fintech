import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

async function ensureTable() {
  const db = getDB();
  await db.query(`
    CREATE TABLE IF NOT EXISTS bills (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      partner_name  VARCHAR(255) NOT NULL DEFAULT '',
      document_name VARCHAR(255) NOT NULL DEFAULT '',
      amount        DECIMAL(12,2) NOT NULL DEFAULT 0,
      status        ENUM('Paid','Pending','Rejected') NOT NULL DEFAULT 'Pending',
      bill_date     DATE NOT NULL,
      created_at    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function GET(req: NextRequest) {
  try {
    await ensureTable();
    const { searchParams } = req.nextUrl;
    const status = searchParams.get("status") ?? "";
    const search = searchParams.get("search") ?? "";

    const db = getDB();
    let sql = "SELECT * FROM bills WHERE 1=1";
    const params: unknown[] = [];

    if (status && status !== "All") {
      sql += " AND status = ?";
      params.push(status);
    }
    if (search.trim()) {
      sql += " AND (partner_name LIKE ? OR document_name LIKE ?)";
      params.push(`%${search.trim()}%`, `%${search.trim()}%`);
    }
    sql += " ORDER BY created_at DESC";

    const [rows] = (await db.query(sql, params)) as [Array<Record<string, unknown>>, unknown];
    return NextResponse.json({ bills: rows });
  } catch (err) {
    console.error("[GET /api/bills]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await ensureTable();
    const { partnerName, documentName, amount, status, billDate } = await req.json();

    if (!partnerName?.trim() || !documentName?.trim() || !billDate) {
      return NextResponse.json({ error: "partnerName, documentName and billDate are required" }, { status: 400 });
    }

    const db = getDB();
    await db.query(
      "INSERT INTO bills (partner_name, document_name, amount, status, bill_date) VALUES (?, ?, ?, ?, ?)",
      [partnerName.trim(), documentName.trim(), amount ?? 0, status ?? "Pending", billDate],
    );
    return NextResponse.json({ message: "Bill added" }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/bills]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
