import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

/** GET /api/test-db — uses shared pool + same SSL/env as signup */
export async function GET() {
  try {
    const pool = getDB();
    const [rows] = (await pool.query("SELECT 1 AS test")) as unknown as [
      RowDataPacket[],
      unknown,
    ];
    return NextResponse.json({ success: true, rows });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const code =
      err instanceof Error && "code" in err
        ? String((err as NodeJS.ErrnoException).code)
        : undefined;
    console.error("[GET /api/test-db]", err);
    return NextResponse.json(
      { success: false, error: message, code },
      { status: 503 },
    );
  }
}
