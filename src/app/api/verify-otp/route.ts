import { NextRequest, NextResponse } from "next/server";

const MSG91_VERIFY_URL = "https://control.msg91.com/api/v5/widget/verifyAccessToken";

export async function POST(req: NextRequest) {
  try {
    const { accessToken } = await req.json() as { accessToken?: string };

    if (!accessToken) {
      return NextResponse.json({ error: "accessToken is required" }, { status: 400 });
    }

    const authKey = process.env.MSG91_WIDGET_AUTH_KEY;
    if (!authKey) {
      return NextResponse.json({ error: "OTP verification is not configured" }, { status: 500 });
    }

    const res = await fetch(MSG91_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authkey: authKey, "access-token": accessToken }),
    });

    const data = await res.json() as { type?: string; verified?: boolean; message?: string };
    const ok = res.ok && (data.type === "success" || data.verified === true);

    if (!ok) {
      return NextResponse.json({ error: data.message || "OTP verification failed" }, { status: 401 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
