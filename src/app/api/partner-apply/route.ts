import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

function generatePartnerId(fullName: string): string {
  const namePart = fullName.trim().split(" ")[0].toLowerCase().replace(/[^a-z]/g, "");
  const digits = Math.floor(10000000 + Math.random() * 90000000).toString();
  return `Capital@${namePart}.agent${digits}`;
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, mobile, email, city, businessName, experience, reason } = await req.json();

    if (!fullName || !mobile || !email || !city || !reason) {
      return NextResponse.json({ error: "Full name, mobile, email, city and reason are required" }, { status: 400 });
    }
    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json({ error: "Mobile must be 10 digits" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const db = getDB();

    // Auto-create table
    await db.query(`
      CREATE TABLE IF NOT EXISTS partners (
        id            INT AUTO_INCREMENT PRIMARY KEY,
        full_name     VARCHAR(255) NOT NULL,
        mobile        VARCHAR(20)  NOT NULL,
        email         VARCHAR(255) NOT NULL,
        city          VARCHAR(100) NOT NULL,
        business_name VARCHAR(255),
        experience    VARCHAR(100),
        reason        TEXT         NOT NULL,
        partner_id    VARCHAR(100) UNIQUE NOT NULL,
        password      VARCHAR(255) NOT NULL,
        created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Check duplicate mobile
    const [existing] = await db.query("SELECT id FROM partners WHERE mobile = ?", [mobile]) as [Array<{ id: number }>, unknown];
    if (existing.length > 0) {
      return NextResponse.json({ error: "A partner with this mobile number already exists" }, { status: 409 });
    }

    // Generate unique partner ID and default password
    let partnerId = generatePartnerId(fullName);
    // Ensure uniqueness (retry if collision)
    let attempts = 0;
    while (attempts < 5) {
      const [clash] = await db.query("SELECT id FROM partners WHERE partner_id = ?", [partnerId]) as [Array<{ id: number }>, unknown];
      if (clash.length === 0) break;
      partnerId = generatePartnerId(fullName);
      attempts++;
    }

    // Default password = mobile number (hashed) — partner must change on first login
    const hashedPassword = await bcrypt.hash(mobile, 10);

    await db.query(
      `INSERT INTO partners (full_name, mobile, email, city, business_name, experience, reason, partner_id, password)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullName, mobile, email, city, businessName ?? "", experience ?? "", reason, partnerId, hashedPassword]
    );

    // Send credentials email to partner
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"CapitalCare Partners" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to CapitalCare Partner Program!",
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#38bdf8,#6366f1);padding:24px">
            <h2 style="color:#fff;margin:0">Welcome, ${fullName}!</h2>
            <p style="color:#e0f2fe;margin:8px 0 0">Your CapitalCare Partner Account is Ready</p>
          </div>
          <div style="padding:24px;background:#f8fafc">
            <p style="color:#334155;font-size:14px">Here are your login credentials for the Partner Dashboard:</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:16px">
              <tr><td style="padding:10px 0;color:#64748b;width:140px">Partner ID</td><td style="padding:10px 0;color:#0f172a;font-weight:700;font-family:monospace">${partnerId}</td></tr>
              <tr><td style="padding:10px 0;color:#64748b">Default Password</td><td style="padding:10px 0;color:#0f172a;font-family:monospace">${mobile}</td></tr>
            </table>
            <div style="margin-top:20px;padding:12px;background:#fef3c7;border-radius:8px;font-size:13px;color:#92400e">
              ⚠️ Please change your password after first login for security.
            </div>
          </div>
          <div style="padding:16px 24px;background:#f1f5f9;font-size:12px;color:#94a3b8">
            CapitalCare Partner Program
          </div>
        </div>
      `,
    });

    // Notify admin
    await transporter.sendMail({
      from: `"CapitalCare Partners" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL ?? process.env.EMAIL_USER,
      subject: `New Partner Application: ${fullName}`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#38bdf8,#6366f1);padding:24px">
            <h2 style="color:#fff;margin:0">New Partner Application</h2>
          </div>
          <div style="padding:24px;background:#f8fafc">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#64748b;width:140px">Name</td><td style="padding:8px 0;color:#0f172a;font-weight:600">${fullName}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Mobile</td><td style="padding:8px 0;color:#0f172a">${mobile}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0;color:#0f172a">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">City</td><td style="padding:8px 0;color:#0f172a">${city}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Partner ID</td><td style="padding:8px 0;color:#0f172a;font-family:monospace">${partnerId}</td></tr>
              ${businessName ? `<tr><td style="padding:8px 0;color:#64748b">Business</td><td style="padding:8px 0;color:#0f172a">${businessName}</td></tr>` : ""}
              ${experience ? `<tr><td style="padding:8px 0;color:#64748b">Experience</td><td style="padding:8px 0;color:#0f172a">${experience}</td></tr>` : ""}
              <tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Reason</td><td style="padding:8px 0;color:#0f172a">${reason}</td></tr>
            </table>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Application submitted", partnerId }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/partner-apply]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
