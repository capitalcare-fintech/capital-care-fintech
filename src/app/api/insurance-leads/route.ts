import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const INSURANCE_TYPES = ["Life Insurance", "Health Insurance", "Motor Insurance"] as const;

async function ensureTable() {
  const db = getDB();
  await db.query(`
    CREATE TABLE IF NOT EXISTS insurance_leads (
      id             INT AUTO_INCREMENT PRIMARY KEY,
      full_name      VARCHAR(100) NOT NULL,
      mobile         VARCHAR(15)  NOT NULL,
      email          VARCHAR(100) NOT NULL,
      insurance_type VARCHAR(50)  NOT NULL,
      city           VARCHAR(100) NOT NULL,
      message        TEXT,
      created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { fullName, mobile, email, insuranceType, city, message } = body;

    if (!fullName?.trim() || !mobile?.trim() || !email?.trim() ||
        !insuranceType?.trim() || !city?.trim()) {
      return NextResponse.json(
        { error: "fullName, mobile, email, insuranceType and city are required" },
        { status: 400 },
      );
    }
    if (!/^\d{10}$/.test(mobile.trim())) {
      return NextResponse.json({ error: "Mobile must be 10 digits" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }
    if (!INSURANCE_TYPES.includes(insuranceType.trim() as typeof INSURANCE_TYPES[number])) {
      return NextResponse.json({ error: "Invalid insurance type" }, { status: 400 });
    }

    await ensureTable();
    const db = getDB();
    await db.query(
      `INSERT INTO insurance_leads (full_name, mobile, email, insurance_type, city, message)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [fullName.trim(), mobile.trim(), email.trim(),
       insuranceType.trim(), city.trim(), (message ?? "").trim()],
    );

    // Send admin email (non-fatal)
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
      });
      await transporter.sendMail({
        from: `"CapitalCare Insurance" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL ?? process.env.EMAIL_USER,
        subject: `New ${insuranceType} Lead from ${fullName}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
            <div style="background:linear-gradient(135deg,#10b981,#0d9488);padding:24px">
              <h2 style="color:#fff;margin:0">New Insurance Lead — ${insuranceType}</h2>
            </div>
            <div style="padding:24px;background:#f8fafc">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:8px 0;color:#64748b;width:140px">Name</td><td style="padding:8px 0;color:#0f172a;font-weight:600">${fullName}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">Mobile</td><td style="padding:8px 0;color:#0f172a">${mobile}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0;color:#0f172a">${email}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">Insurance Type</td><td style="padding:8px 0;color:#0f172a">${insuranceType}</td></tr>
                <tr><td style="padding:8px 0;color:#64748b">City</td><td style="padding:8px 0;color:#0f172a">${city}</td></tr>
                ${message ? `<tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Message</td><td style="padding:8px 0;color:#0f172a">${String(message).replace(/\n/g, "<br/>")}</td></tr>` : ""}
              </table>
            </div>
            <div style="padding:16px 24px;background:#f1f5f9;font-size:12px;color:#94a3b8">Sent via CapitalCare Insurance Lead Form</div>
          </div>`,
      });
    } catch {
      // email failure is non-fatal
    }

    return NextResponse.json(
      { success: true, message: "Insurance lead submitted successfully" },
      { status: 201 },
    );
  } catch (err) {
    console.error("[POST /api/insurance-leads]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
