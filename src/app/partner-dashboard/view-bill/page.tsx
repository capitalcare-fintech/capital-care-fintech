import { PartnerAuthGuard } from "@/components/layout/PartnerAuthGuard";
import { ViewBillPage } from "@/components/bills/ViewBillPage";

export default function ViewBillRoute() {
  return (
    <PartnerAuthGuard>
      <ViewBillPage />
    </PartnerAuthGuard>
  );
}
