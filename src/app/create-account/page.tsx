import { CreateAccountForm } from "@/components/create-account-form";
import { Logo } from "@/components/logo";

export default function CreateAccountPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 animate-in fade-in-50">
      <div className="w-full max-w-sm space-y-8 md:max-w-md">
        <div className="flex justify-center">
          <Logo />
        </div>
        <CreateAccountForm />
      </div>
    </main>
  );
}
