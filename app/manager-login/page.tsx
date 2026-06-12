import { Suspense } from "react";
import { LoginForm } from "@/components/manager/LoginForm";

export const metadata = {
  title: "Manager Portal | AAMDAR Fitness Club",
  description: "Authorized staff access for gym management and administration.",
};

export default function ManagerLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050505]" />}>
      <LoginForm />
    </Suspense>
  );
}
