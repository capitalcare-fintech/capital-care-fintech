import { PartnerAuthGuard } from "@/components/layout/PartnerAuthGuard";
import { PayoutPage } from "@/components/payout/PayoutPage";

export default function PayoutDetailsRoute() {
  return (
    <PartnerAuthGuard>
      <PayoutPage />
    </PartnerAuthGuard>
  );
}
