import type { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

/**
 * GET /api/db-health — verifies pool + Railway MySQL with a cheap query.
 * Optional: set DB_HEALTH_SECRET in env and send header x-db-health-secret to call in production.
 */
export async function GET(req: Request) {
  const secret = process.env.DB_HEALTH_SECRET;
  if (secret) {
    const sent = req.headers.get("x-db-health-secret");
    if (sent !== secret) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const pool = getDB();
    const [rows] = (await pool.query("SELECT 1 AS ok")) as unknown as [
      RowDataPacket[],
      unknown,
    ];
    const ok = Array.isArray(rows) && rows.length > 0 && Number(rows[0]?.ok) === 1;
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: "Unexpected query result" },
        { status: 500 },
      );
    }
    return NextResponse.json({ ok: true, message: "Database connection successful" });
  } catch (err) {
    console.error("[GET /api/db-health]", err);

    const message =
      err instanceof Error ? err.message : "Database connection failed";
    const code = err instanceof Error && "code" in err ? String((err as NodeJS.ErrnoException).code) : undefined;

    return NextResponse.json(
      {
        ok: false,
        error: "Database unavailable",
        ...(process.env.NODE_ENV === "development"
          ? { detail: message, code }
          : {}),
      },
      { status: 503 },
    );
  }
}
