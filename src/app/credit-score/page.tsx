"use client";

import { useState } from "react";

interface PersonalDetails {
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  email: string;
  mobile: string;
}

interface CreditScoreResult {
  name: string;
  credit_score: number;
  date: string;
  next_update_in: string;
}

export default function CreditScorePage() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [formData, setFormData] = useState<PersonalDetails>({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    mobile: "",
  });

  const [generatedOtp, setGeneratedOtp] = useState("");
  const [enteredOtp, setEnteredOtp] = useState("");
  const [creditScoreResult, setCreditScoreResult] = useState<CreditScoreResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Generate random 4-digit OTP
  const generateOtp = () => {
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    setGeneratedOtp(otp);
    return otp;
  };

  // Validate Phase 1 form
  const validatePhase1 = (): boolean => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.gender) {
      setError("Please select a gender");
      return false;
    }
    if (!formData.dob) {
      setError("Date of birth is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return false;
    }
    if (!formData.mobile.trim()) {
      setError("Mobile number is required");
      return false;
    }
    const mobileRegex = /^\d{10,}$/;
    if (!mobileRegex.test(formData.mobile.replace(/\D/g, ""))) {
      setError("Mobile number must be at least 10 digits");
      return false;
    }
    setError("");
    return true;
  };

  // Handle Phase 1 submission
  const handlePhase1Submit = () => {
    if (validatePhase1()) {
      generateOtp();
      setCurrentPhase(2);
      setEnteredOtp("");
    }
  };

  // Handle OTP verification
  const handleOtpVerify = () => {
    if (!enteredOtp.trim()) {
      setError("Please enter OTP");
      return;
    }
    if (enteredOtp === generatedOtp) {
      setError("");
      fetchCreditScore();
    } else {
      setError("Invalid OTP. Please try again");
    }
  };

  // Fetch credit score from API
  const fetchCreditScore = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/credit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to retrieve credit score");
        return;
      }

      setCreditScoreResult(data.data);
      setCurrentPhase(3);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle reset to Phase 1
  const handleReset = () => {
    setCurrentPhase(1);
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      email: "",
      mobile: "",
    });
    setGeneratedOtp("");
    setEnteredOtp("");
    setCreditScoreResult(null);
    setError("");
  };

  const getScoreStatus = (score: number) => {
    if (score >= 750) return { label: "Excellent", color: "text-green-600 bg-green-50" };
    if (score >= 650) return { label: "Good", color: "text-blue-600 bg-blue-50" };
    if (score >= 550) return { label: "Fair", color: "text-yellow-600 bg-yellow-50" };
    return { label: "Poor", color: "text-red-600 bg-red-50" };
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Check Your Credit Score</h1>
          <p className="text-gray-600">Complete verification in 3 simple steps</p>
        </div>

        {/* Phase Indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((phase) => (
            <div key={phase} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentPhase >= phase
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {phase}
              </div>
              {phase < 3 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    currentPhase > phase ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-600 text-red-700">
              {error}
            </div>
          )}

          {/* Phase 1: Personal Details */}
          {currentPhase === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Aarav"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Sharma"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData({ ...formData, gender: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="9876543210"
                  />
                </div>
              </div>

              <button
                onClick={handlePhase1Submit}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Proceed to OTP Verification
              </button>
            </div>
          )}

          {/* Phase 2: OTP Verification */}
          {currentPhase === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Verify OTP</h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-900">
                  OTP has been sent to <strong>{formData.mobile}</strong>
                </p>
                <p className="text-sm text-blue-700 mt-2">
                  Mock OTP for testing: <strong>{generatedOtp}</strong>
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter 4-Digit OTP
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-3 text-center text-2xl letter-spacing border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0000"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleOtpVerify}
                  className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  Verify OTP
                </button>
                <button
                  onClick={() => {
                    generateOtp();
                    setEnteredOtp("");
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Resend OTP
                </button>
              </div>

              <button
                onClick={() => setCurrentPhase(1)}
                className="w-full mt-4 bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200 transition"
              >
                Back
              </button>
            </div>
          )}

          {/* Phase 3: Credit Score Results */}
          {currentPhase === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Your Credit Score
              </h2>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin">
                    <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-gray-600 mt-4">Calculating your credit score...</p>
                </div>
              ) : creditScoreResult ? (
                <div className="space-y-8">
                  {/* Top Info Bar */}
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {creditScoreResult.name}, your credit score for {new Date(creditScoreResult.date).toLocaleDateString("en-US", { month: "short", year: "2-digit" })}
                    </h3>
                    <span className="text-sm font-medium text-gray-600">
                      {new Date(creditScoreResult.date).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Circular Gauge */}
                  <div className="flex justify-center">
                    <div className="relative w-80 h-80">
                      <svg className="w-full h-full" viewBox="0 0 200 200">
                        {/* Background circle */}
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#e5e7eb" strokeWidth="8" />

                        {/* Gradient Arc */}
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="25%" stopColor="#f97316" />
                            <stop offset="50%" stopColor="#eab308" />
                            <stop offset="75%" stopColor="#84cc16" />
                            <stop offset="100%" stopColor="#22c55e" />
                          </linearGradient>
                        </defs>

                        {/* Score Arc - Calculate percentage (300-900 range) */}
                        {(() => {
                          const minScore = 300;
                          const maxScore = 900;
                          const percentage = ((creditScoreResult.credit_score - minScore) / (maxScore - minScore)) * 100;
                          const radius = 90;
                          const circumference = 2 * Math.PI * radius;
                          const strokeDashoffset = circumference - (percentage / 100) * circumference;

                          return (
                            <circle
                              cx="100"
                              cy="100"
                              r="90"
                              fill="none"
                              stroke="url(#scoreGradient)"
                              strokeWidth="8"
                              strokeDasharray={circumference}
                              strokeDashoffset={strokeDashoffset}
                              strokeLinecap="round"
                              style={{
                                transition: "stroke-dashoffset 0.5s ease-in-out",
                                transform: "rotate(-90deg)",
                                transformOrigin: "100px 100px",
                              }}
                            />
                          );
                        })()}

                        {/* Center content */}
                        <circle cx="100" cy="100" r="60" fill="white" />
                      </svg>

                      {/* Center Text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-sm text-gray-500">Credit Score</p>
                        <h2 className="text-6xl font-bold text-gray-900">
                          {creditScoreResult.credit_score}
                        </h2>
                        <p className={`text-sm font-semibold mt-1 ${getScoreStatus(creditScoreResult.credit_score).color}`}>
                          {getScoreStatus(creditScoreResult.credit_score).label}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Score Range Labels */}
                  <div className="flex justify-between px-4 text-xs font-semibold text-gray-600">
                    <span>300</span>
                    <span>450</span>
                    <span>600</span>
                    <span>750</span>
                    <span>900</span>
                  </div>

                  {/* Report Actions */}
                  <div className="mt-8 flex flex-col items-center gap-3">
                    <button
                      type="button"
                      onClick={() => alert("Report download is mocked for now.")}
                      className="px-8 py-3 rounded-xl border-2 border-indigo-500 text-indigo-700 font-semibold hover:bg-indigo-50 transition duration-200"
                    >
                      Download Report
                    </button>
                    <p className="text-sm text-gray-600">
                      Next report update in {creditScoreResult.next_update_in}
                    </p>
                  </div>


                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleReset}
                      className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
                    >
                      ↻ Check Score Again
                    </button>
                    <button
                      onClick={() => alert("Redirecting to dashboard...")}
                      className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition duration-200 shadow-md"
                    >
                      📊 Go to Dashboard
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>Your information is secure and will only be used for credit score calculation.</p>
        </div>
      </div>
    </div>
  );
}

