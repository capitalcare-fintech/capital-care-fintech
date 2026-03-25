import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Retry a DB query once on ECONNRESET — Railway proxy drops idle connections
async function queryWithRetry(
  db: ReturnType<typeof getDB>,
  sql: string,
  params: unknown[],
  retries = 1,
): Promise<unknown[][]> {
  try {
    return (await db.query(sql, params)) as unknown[][];
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException).code;
    if (retries > 0 && (code === "ECONNRESET" || code === "PROTOCOL_CONNECTION_LOST")) {
      console.warn("[signin] DB connection reset, retrying...");
      return queryWithRetry(db, sql, params, retries - 1);
    }
    throw err;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { phone, password } = await req.json();

    if (!phone || !password) {
      return NextResponse.json(
        { error: "Phone and password are required" },
        { status: 400 }
      );
    }

    const db = getDB();

    const [rows] = (await queryWithRetry(
      db,
      "SELECT id, fullName, phone, password FROM users WHERE phone = ?",
      [phone],
    )) as [Array<{ id: number; fullName: string; phone: string; password: string }>, unknown];

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid phone number or password" },
        { status: 401 }
      );
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid phone number or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Signed in successfully",
      user: { id: user.id, name: user.fullName, phone: user.phone },
    });
  } catch (error) {
    console.error("[POST /api/signin]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
