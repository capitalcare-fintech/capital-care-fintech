import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
    try {
        const { fullName, email, phone, message } = await req.json();

        // Validation
        if (!fullName || !email || !phone || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
        }
        if (!/^\d{10}$/.test(phone)) {
            return NextResponse.json({ error: "Phone must be 10 digits" }, { status: 400 });
        }
        if (message.trim().length < 10) {
            return NextResponse.json({ error: "Message too short" }, { status: 400 });
        }

        // Save to DB
        const db = getDB();
        await db.query(
            "INSERT INTO contact_messages (fullName, email, phone, message) VALUES (?, ?, ?, ?)",
            [fullName, email, phone, message]
        );

        // Send admin email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"CapitalCare Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL ?? process.env.EMAIL_USER,
            subject: `New Contact Message from ${fullName}`,
            html: `
        <div style="font-family:sans-serif;max-width:520px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
          <div style="background:linear-gradient(135deg,#38bdf8,#6366f1);padding:24px">
            <h2 style="color:#fff;margin:0">New Contact Message</h2>
          </div>
          <div style="padding:24px;background:#f8fafc">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#64748b;width:120px">Name</td><td style="padding:8px 0;color:#0f172a;font-weight:600">${fullName}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0;color:#0f172a">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b">Phone</td><td style="padding:8px 0;color:#0f172a">${phone}</td></tr>
              <tr><td style="padding:8px 0;color:#64748b;vertical-align:top">Message</td><td style="padding:8px 0;color:#0f172a">${message.replace(/\n/g, "<br/>")}</td></tr>
            </table>
          </div>
          <div style="padding:16px 24px;background:#f1f5f9;font-size:12px;color:#94a3b8">
            Sent via CapitalCare Contact Form
          </div>
        </div>
      `,
        });

        return NextResponse.json({ message: "Message sent successfully" }, { status: 201 });
    } catch (error) {
        console.error("[POST /api/contact]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
