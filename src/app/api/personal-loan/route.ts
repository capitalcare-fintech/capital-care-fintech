import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const DOC_FIELDS = [
  "aadhaar_card",
  "pan_card",
  "photo",
  "electricity_bill",
  "office_id",
  "salary_slip",
  "bank_statement",
  "form16",
  "existing_loan_doc",
  "itr",
  "office_proof",
];

export async function POST(req: NextRequest) {
  try {
    // ── Parse multipart/form-data ──────────────────────────────────────────
    const formData = await req.formData();

    const fullName       = formData.get("full_name")?.toString()       ?? "";
    const mobile         = formData.get("mobile")?.toString()          ?? "";
    const email          = formData.get("email")?.toString()           ?? "";
    const city           = formData.get("city")?.toString()            ?? "";
    const loanAmount     = formData.get("loan_amount")?.toString()     ?? "";
    const employmentType = formData.get("employment_type")?.toString() ?? "";
    const monthlyIncome  = formData.get("monthly_income")?.toString()  ?? "";
    const companyName    = formData.get("company_name")?.toString()    ?? "";
    const workExperience = formData.get("work_experience")?.toString() ?? "";
    const existingEmi    = formData.get("existing_emi")?.toString()    ?? "";
    const panNumber      = formData.get("pan_number")?.toString()      ?? "";
    const aadhaarNumber  = formData.get("aadhaar_number")?.toString()  ?? "";
    const loanPurpose    = formData.get("loan_purpose")?.toString()    ?? "";

    // ── Validation ─────────────────────────────────────────────────────────
    if (!fullName || !mobile || !email || !city || !loanAmount || !employmentType) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }
    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json({ error: "Mobile must be 10 digits" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // ── Save TEXT fields to DB (NO file data) ──────────────────────────────
    const db = getDB();

    await db.query(`
      CREATE TABLE IF NOT EXISTS personal_loans (
        id               INT AUTO_INCREMENT PRIMARY KEY,
        full_name        VARCHAR(255) NOT NULL,
        mobile           VARCHAR(20)  NOT NULL,
        email            VARCHAR(255) NOT NULL,
        city             VARCHAR(100) NOT NULL,
        loan_amount      VARCHAR(50)  NOT NULL,
        employment_type  VARCHAR(100) NOT NULL,
        monthly_income   VARCHAR(50),
        company_name     VARCHAR(255),
        work_experience  VARCHAR(100),
        existing_emi     VARCHAR(50),
        pan_number       VARCHAR(20),
        aadhaar_number   VARCHAR(20),
        loan_purpose     VARCHAR(100),
        created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.query(
      `INSERT INTO personal_loans
         (full_name, mobile, email, city, loan_amount, employment_type,
          monthly_income, company_name, work_experience, existing_emi,
          pan_number, aadhaar_number, loan_purpose)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName, mobile, email, city, loanAmount, employmentType,
        monthlyIncome, companyName, workExperience, existingEmi,
        panNumber, aadhaarNumber, loanPurpose,
      ]
    );

    // ── Collect uploaded files as email attachments (NOT stored anywhere) ──
    const attachments: { filename: string; content: Buffer; contentType: string }[] = [];

    for (const field of DOC_FIELDS) {
      const entry = formData.get(field);
      if (entry instanceof File && entry.size > 0) {
        const buffer = Buffer.from(await entry.arrayBuffer());
        attachments.push({
          filename: `${field}__${entry.name}`,
          content: buffer,
          contentType: entry.type || "application/octet-stream",
        });
      }
    }

    // ── Send email with documents attached ─────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"CapitalCare Loans" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL ?? process.env.EMAIL_USER,
      subject: `Personal Loan Application — ${fullName} (${mobile})`,
      attachments,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#818cf8,#a78bfa);padding:24px">
            <h2 style="color:#fff;margin:0">New Personal Loan Application</h2>
            <p style="color:#ede9fe;margin:6px 0 0;font-size:13px">${attachments.length} document(s) attached</p>
          </div>
          <div style="padding:24px;background:#f8fafc">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#64748b;width:160px">Full Name</td><td style="padding:8px 0;color:#0f172a;font-weight:600">${fullName}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Mobile</td><td style="padding:8px 0;color:#0f172a">${mobile}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0;color:#0f172a">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">City</td><td style="padding:8px 0;color:#0f172a">${city}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Loan Amount</td><td style="padding:8px 0;color:#0f172a">₹${loanAmount}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Employment</td><td style="padding:8px 0;color:#0f172a">${employmentType}</td></tr>
              ${monthlyIncome ? `<tr><td style="padding:8px 0;color:#64748b">Monthly Income</td><td style="padding:8px 0;color:#0f172a">₹${monthlyIncome}</td></tr>` : ""}
              ${companyName ? `<tr><td style="padding:8px 0;color:#64748b">Company</td><td style="padding:8px 0;color:#0f172a">${companyName}</td></tr>` : ""}
              ${workExperience ? `<tr><td style="padding:8px 0;color:#64748b">Experience</td><td style="padding:8px 0;color:#0f172a">${workExperience}</td></tr>` : ""}
              ${existingEmi ? `<tr><td style="padding:8px 0;color:#64748b">Existing EMI</td><td style="padding:8px 0;color:#0f172a">₹${existingEmi}</td></tr>` : ""}
              ${panNumber ? `<tr><td style="padding:8px 0;color:#64748b">PAN</td><td style="padding:8px 0;color:#0f172a">${panNumber}</td></tr>` : ""}
              ${aadhaarNumber ? `<tr><td style="padding:8px 0;color:#64748b">Aadhaar</td><td style="padding:8px 0;color:#0f172a">${aadhaarNumber}</td></tr>` : ""}
              ${loanPurpose ? `<tr><td style="padding:8px 0;color:#64748b">Purpose</td><td style="padding:8px 0;color:#0f172a">${loanPurpose}</td></tr>` : ""}
            </table>
            ${attachments.length > 0 ? `
            <div style="margin-top:16px;padding:12px;background:#f1f5f9;border-radius:8px">
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#475569">Attached Documents:</p>
              <ul style="margin:0;padding-left:16px;font-size:13px;color:#64748b">
                ${attachments.map(a => `<li>${a.filename}</li>`).join("")}
              </ul>
            </div>` : ""}
          </div>
          <div style="padding:16px 24px;background:#f1f5f9;font-size:12px;color:#94a3b8">
            Sent via CapitalCare Personal Loan Form
          </div>
        </div>
      `,
    });

    return NextResponse.json({ message: "Application submitted successfully" }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/personal-loan]", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
