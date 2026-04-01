import { AuthGuard } from "@/components/layout/AuthGuard";
import { PayoutPage } from "@/components/payout/PayoutPage";

export default function PayoutDetailsRoute() {
  return (
    <AuthGuard>
      <PayoutPage />
    </AuthGuard>
  );
}
