import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const {
      fullName, mobile, email, city, loanAmount,
      businessType, annualTurnover, message,
    } = await req.json();

    // Validation
    if (!fullName || !mobile || !email || !city || !loanAmount || !businessType || !annualTurnover) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }
    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json({ error: "Mobile must be 10 digits" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const db = getDB();

    // Auto-create table if missing
    await db.query(`
      CREATE TABLE IF NOT EXISTS business_loans (
        id               INT AUTO_INCREMENT PRIMARY KEY,
        full_name        VARCHAR(255) NOT NULL,
        mobile           VARCHAR(20)  NOT NULL,
        email            VARCHAR(255) NOT NULL,
        city             VARCHAR(100) NOT NULL,
        loan_amount      VARCHAR(50)  NOT NULL,
        business_type    VARCHAR(100) NOT NULL,
        annual_turnover  VARCHAR(50)  NOT NULL,
        message          TEXT,
        created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(
      `INSERT INTO business_loans
        (full_name, mobile, email, city, loan_amount, business_type, annual_turnover, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [fullName, mobile, email, city, loanAmount, businessType, annualTurnover, message ?? ""]
    );

    // Send admin email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"CapitalCare Loans" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL ?? process.env.EMAIL_USER,
      subject: `New Business Loan Application from ${fullName}`,
      html: `
        <div style="font-family:sans-serif;max-width:540px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#38bdf8,#6366f1);padding:24px">
            <h2 style="color:#fff;margin:0">New Business Loan Application</h2>
          </div>
          <div style="padding:24px;background:#f8fafc">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#64748b;width:160px">Full Name</td><td style="padding:8px 0;color:#0f172a;font-weight:600">${fullName}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Mobile</td><td style="padding:8px 0;color:#0f172a">${mobile}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0;color:#0f172a">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">City</td><td style="padding:8px 0;color:#0f172a">${city}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Loan Amount</td><td style="padding:8px 0;color:#0f172a">₹${loanAmount}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Business Type</td><td style="padding:8px 0;color:#0f172a">${businessType}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Annual Turnover</td><td style="padding:8px 0;color:#0f172a">₹${annualTurnover}</td></tr>
              ${message ? `<tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Message</td><td style="padding:8px 0;color:#0f172a">${message.replace(/\n/g, "<br/>")}</td></tr>` : ""}
            </table>
          </div>
          <div style="padding:16px 24px;background:#f1f5f9;font-size:12px;color:#94a3b8">Sent via CapitalCare Business Loan Form</div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Application submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/business-loan]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
