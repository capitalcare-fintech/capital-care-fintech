import { AuthGuard } from "@/components/layout/AuthGuard";
import { MyProfilePage } from "@/components/profile/MyProfilePage";

export default function MyProfileRoute() {
  return (
    <AuthGuard>
      <MyProfilePage />
    </AuthGuard>
  );
}
