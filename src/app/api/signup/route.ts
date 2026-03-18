import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { fullName, phone, password } = await req.json();

    if (!fullName || !phone || !password) {
      return NextResponse.json(
        { error: "fullName, phone, and password are required" },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: "Phone number must be 10 digits" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const db = getDB();

    const [existing] = await db.query(
      "SELECT id FROM users WHERE phone = ?",
      [phone]
    ) as [Array<{ id: number }>, unknown];

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Phone number already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (fullName, phone, password) VALUES (?, ?, ?)",
      [fullName, phone, hashedPassword]
    );

    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/signup]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
