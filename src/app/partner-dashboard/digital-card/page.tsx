import { PartnerAuthGuard } from "@/components/layout/PartnerAuthGuard";
import { DigitalCardPage } from "@/components/digital-card/DigitalCardPage";

export default function DigitalCardRoute() {
  return (
    <PartnerAuthGuard>
      <DigitalCardPage />
    </PartnerAuthGuard>
  );
}
