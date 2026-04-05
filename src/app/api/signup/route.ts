import { getDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const MSG91_VERIFY_ACCESS_TOKEN_URL = "https://control.msg91.com/api/v5/widget/verifyAccessToken";

function signupLog(step: string, details?: unknown) {
  console.log(`[POST /api/signup] ${step}`, details ?? "");
}

function signupError(step: string, details?: unknown) {
  console.error(`[POST /api/signup] ${step}`, details ?? "");
}

export async function POST(req: NextRequest) {
  try {
    const { fullName, phone, password, otpAccessToken } = await req.json();
    signupLog("request-received", {
      hasFullName: Boolean(fullName),
      phone,
      hasPassword: Boolean(password),
      hasOtpAccessToken: Boolean(otpAccessToken),
    });

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

    if (!otpAccessToken) {
      return NextResponse.json(
        { error: "OTP verification is required" },
        { status: 400 }
      );
    }

    const msg91WidgetAuthKey = process.env.MSG91_WIDGET_AUTH_KEY;

    if (!msg91WidgetAuthKey) {
      signupError("missing-msg91-auth-key");
      return NextResponse.json(
        { error: "MSG91 widget auth key is not configured" },
        { status: 500 }
      );
    }

    signupLog("verifying-msg91-access-token", {
      verifyUrl: MSG91_VERIFY_ACCESS_TOKEN_URL,
      hasAuthKey: Boolean(msg91WidgetAuthKey),
    });

    const verificationResponse = await fetch(MSG91_VERIFY_ACCESS_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        authkey: msg91WidgetAuthKey,
        "access-token": otpAccessToken,
      }),
    });

    const verificationData = (await verificationResponse.json()) as {
      type?: string;
      message?: string;
      verified?: boolean;
      code?: number;
    };

    signupLog("msg91-verification-response", {
      ok: verificationResponse.ok,
      status: verificationResponse.status,
      type: verificationData.type,
      verified: verificationData.verified,
      message: verificationData.message,
      code: verificationData.code,
    });

    const otpVerified = verificationResponse.ok && (verificationData.type === "success" || verificationData.verified === true);

    if (!otpVerified) {
      signupError("msg91-verification-failed", verificationData);
      return NextResponse.json(
        { error: verificationData.message || "OTP verification failed" },
        { status: 401 }
      );
    }

    signupLog("msg91-verification-passed");

    const db = getDB();
    signupLog("db-lookup-existing-user", { phone });

    const [existing] = (await db.query(
      "SELECT id FROM users WHERE phone = ?",
      [phone],
    )) as unknown as [Array<{ id: number }>, unknown];

    if (existing.length > 0) {
      signupLog("duplicate-phone-found", { phone });
      return NextResponse.json(
        { error: "Phone number already registered" },
        { status: 409 }
      );
    }

    signupLog("hashing-password-and-inserting-user", { phone });
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = (await db.query(
      "INSERT INTO users (fullName, phone, password) VALUES (?, ?, ?)",
      [fullName, phone, hashedPassword]
    )) as unknown as [{ insertId: number }, unknown];

    signupLog("user-created", { id: result.insertId, phone });

    return NextResponse.json(
      { message: "Account created successfully", id: result.insertId, fullName, phone },
      { status: 201 }
    );
  } catch (error) {
    signupError("unhandled-error", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
