import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED  = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];

export async function POST(req: NextRequest) {
  try {
    const form       = await req.formData();
    const file       = form.get("file");
    const fileName   = (form.get("fileName") as string | null)?.trim();
    const status     = (form.get("status")   as string | null)?.trim() ?? "Pending";

    if (!fileName) {
      return NextResponse.json({ error: "File name is required" }, { status: 400 });
    }
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Only PDF, JPG, or PNG files are allowed" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.byteLength > MAX_SIZE) {
      return NextResponse.json({ error: "File must be under 5 MB" }, { status: 400 });
    }

    const ext      = file.type === "application/pdf" ? "pdf" : file.type.split("/")[1].replace("jpeg", "jpg");
    const stored   = `${randomUUID()}.${ext}`;
    const uploadDir = join(process.cwd(), "public", "uploads");
    await writeFile(join(uploadDir, stored), buffer);

    const fileUrl = `/uploads/${stored}`;
    const today   = new Date().toISOString().slice(0, 10);

    const db = getDB();
    await db.query(
      `INSERT INTO bills (partner_name, document_name, amount, status, bill_date)
       VALUES (?, ?, ?, ?, ?)`,
      ["—", fileName, 0, status, today],
    );

    return NextResponse.json({ message: "Bill uploaded successfully", fileUrl });
  } catch (err) {
    console.error("[POST /api/bills/upload]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
