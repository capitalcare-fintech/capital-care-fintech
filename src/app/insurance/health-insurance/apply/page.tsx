import InsuranceApplyForm from "@/components/insurance/InsuranceApplyForm";

export default function HealthInsuranceApplyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-8 lg:px-16">
      <InsuranceApplyForm
        insuranceType="health-insurance"
        heading="Apply for Health Insurance"
      />
    </main>
  );
}
