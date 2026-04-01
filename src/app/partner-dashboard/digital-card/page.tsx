import { AuthGuard } from "@/components/layout/AuthGuard";
import { DigitalCardPage } from "@/components/digital-card/DigitalCardPage";

export default function DigitalCardRoute() {
  return (
    <AuthGuard>
      <DigitalCardPage />
    </AuthGuard>
  );
}
