import { AuthGuard } from "@/components/layout/AuthGuard";
import { ViewBillPage } from "@/components/bills/ViewBillPage";

export default function ViewBillRoute() {
  return (
    <AuthGuard>
      <ViewBillPage />
    </AuthGuard>
  );
}
