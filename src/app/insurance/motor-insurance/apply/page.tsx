import InsuranceApplyForm from "@/components/insurance/InsuranceApplyForm";

export default function MotorInsuranceApplyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-8 lg:px-16">
      <InsuranceApplyForm
        insuranceType="motor-insurance"
        heading="Apply for Motor Insurance"
      />
    </main>
  );
}
