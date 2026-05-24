import { Suspense } from "react";
import { AuthCard } from "@/components/auth/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in to continue to your bookmark workspace."
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
