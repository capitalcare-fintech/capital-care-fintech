import { PartnerAuthGuard } from "@/components/layout/PartnerAuthGuard";
import { MyProfilePage } from "@/components/profile/MyProfilePage";

export default function MyProfileRoute() {
  return (
    <PartnerAuthGuard>
      <MyProfilePage />
    </PartnerAuthGuard>
  );
}
