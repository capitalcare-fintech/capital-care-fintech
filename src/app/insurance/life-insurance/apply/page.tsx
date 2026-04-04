import InsuranceApplyForm from "@/components/insurance/InsuranceApplyForm";

export default function LifeInsuranceApplyPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 md:px-8 lg:px-16">
      <InsuranceApplyForm
        insuranceType="life-insurance"
        heading="Apply for Life Insurance"
      />
    </main>
  );
}
