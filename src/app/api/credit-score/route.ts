import { NextRequest, NextResponse } from "next/server";

interface CreditScoreRequest {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string;
  mobile: string;
}

interface CreditScoreResponse {
  success: boolean;
  data?: {
    name: string;
    credit_score: number;
    date: string;
    next_update_in: string;
  };
  error?: string;
}

// Mock CIBIL API function - Replace this with real API call later
function mockCIBILCheck(personalDetails: CreditScoreRequest): {
  name: string;
  credit_score: number;
  date: string;
  next_update_in: string;
} {
  const { firstName, lastName, email, dob } = personalDetails;

  // Calculate age from DOB
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Base score
  let creditScore = 650;

  // Age factor: 25-60 is ideal range
  if (age >= 25 && age <= 60) {
    creditScore += Math.min(50, (age - 25) * 2);
  }

  // Email domain bonus: Corporate email gets +20
  if (email.includes("@") && !email.endsWith("@gmail.com") && !email.endsWith("@yahoo.com")) {
    creditScore += 20;
  }

  // Randomization for realism (±50)
  creditScore += Math.floor(Math.random() * 100) - 50;

  // Clamp score between 300-900
  creditScore = Math.max(300, Math.min(900, creditScore));

  const currentDate = new Date().toISOString();

  return {
    name: `${firstName} ${lastName}`,
    credit_score: creditScore,
    date: currentDate,
    next_update_in: "30 days",
  };
}

// Validation function
function validateInput(data: CreditScoreRequest): { valid: boolean; error?: string } {
  if (!data.firstName?.trim()) return { valid: false, error: "First name is required" };
  if (!data.lastName?.trim()) return { valid: false, error: "Last name is required" };
  if (!data.gender?.trim()) return { valid: false, error: "Gender is required" };
  if (!data.dob?.trim()) return { valid: false, error: "Date of birth is required" };
  if (!data.email?.trim()) return { valid: false, error: "Email is required" };
  if (!data.mobile?.trim()) return { valid: false, error: "Mobile number is required" };

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { valid: false, error: "Invalid email format" };
  }

  // Mobile validation (basic: at least 10 digits)
  const mobileRegex = /^\d{10,}$/;
  if (!mobileRegex.test(data.mobile.replace(/\D/g, ""))) {
    return { valid: false, error: "Mobile number must be at least 10 digits" };
  }

  return { valid: true };
}

export async function POST(req: NextRequest): Promise<NextResponse<CreditScoreResponse>> {
  try {
    const body = await req.json();

    // Validate input
    const validation = validateInput(body);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }

    // Call mock CIBIL API
    const creditScoreData = mockCIBILCheck(body);

    // TODO: In future, store this in database
    // await db.query("INSERT INTO credit_scores (...) VALUES (...)", [...])

    return NextResponse.json(
      {
        success: true,
        data: creditScoreData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[POST /api/credit-score]", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
