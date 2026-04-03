import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

const MAX_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("avatar");
    const phone = (form.get("phone") as string | null)?.trim();

    if (!phone || !/^\d{10}$/.test(phone)) {
      return NextResponse.json({ error: "Valid phone is required" }, { status: 400 });
    }
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Only JPG, PNG, or WebP images are allowed" },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    if (buffer.byteLength > MAX_SIZE) {
      return NextResponse.json({ error: "File size must be under 2 MB" }, { status: 400 });
    }

    const ext = file.type.split("/")[1].replace("jpeg", "jpg");
    const filename = `${randomUUID()}.${ext}`;
    const uploadDir = join(process.cwd(), "public", "uploads");
    await writeFile(join(uploadDir, filename), buffer);

    const imageUrl = `/uploads/${filename}`;

    // Upsert profile_image in DB
    const db = getDB();
    await db.query(
      `INSERT INTO profiles (phone, profile_image)
       VALUES (?, ?)
       ON DUPLICATE KEY UPDATE profile_image = VALUES(profile_image), updated_at = CURRENT_TIMESTAMP`,
      [phone, imageUrl],
    );

    return NextResponse.json({ imageUrl });
  } catch (err) {
    console.error("[POST /api/profile/upload-avatar]", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
