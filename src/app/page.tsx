import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If user is already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 animate-in fade-in-50">
      <div className="w-full max-w-sm space-y-8 md:max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
