import { NextRequest, NextResponse } from "next/server";

// Stub payout data — replace with DB query when payout table exists
const STUB: Record<string, Array<{ slab: string; loanAmount: string; payout: string; remarks?: string }>> = {
  "Personal Loan": [
    { slab: "Slab 1", loanAmount: "₹50,000 – ₹1,00,000",  payout: "1.00%", remarks: "Standard" },
    { slab: "Slab 2", loanAmount: "₹1,00,001 – ₹3,00,000", payout: "1.25%", remarks: "Standard" },
    { slab: "Slab 3", loanAmount: "₹3,00,001 – ₹5,00,000", payout: "1.50%", remarks: "Bumper Offer" },
    { slab: "Slab 4", loanAmount: "₹5,00,001 – ₹10,00,000",payout: "1.75%", remarks: "Bumper Offer" },
    { slab: "Slab 5", loanAmount: "Above ₹10,00,000",       payout: "2.00%", remarks: "Premium" },
  ],
  "Business Loan": [
    { slab: "Slab 1", loanAmount: "₹1,00,000 – ₹5,00,000",  payout: "1.50%" },
    { slab: "Slab 2", loanAmount: "₹5,00,001 – ₹20,00,000", payout: "1.75%", remarks: "Bumper Offer" },
    { slab: "Slab 3", loanAmount: "Above ₹20,00,000",        payout: "2.00%", remarks: "Premium" },
  ],
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const product = searchParams.get("product") ?? "Personal Loan";
  // month & year reserved for future DB filtering
  const rows = STUB[product] ?? [];
  return NextResponse.json({ rows });
}
