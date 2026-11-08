import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/account");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-cream px-5 py-12">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 shadow-soft sm:p-10">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 font-bold text-forest"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime">
            <Sparkles size={21} />
          </span>
          Ghar Saathi
        </Link>

        <p className="eyebrow mb-3 text-forest">WELCOME HOME</p>

        <h1 className="text-3xl font-bold tracking-tight text-ink">
          Your home, your account.
        </h1>

        <p className="mt-3 leading-7 text-muted">
          Sign in to book household services, manage your profile
          and keep track of your bookings.
        </p>

        <div className="my-8">
          <GoogleSignInButton />
        </div>

        <div className="flex items-start gap-3 rounded-2xl bg-cream p-4">
          <ShieldCheck className="mt-1 shrink-0 text-forest" size={20} />

          <p className="text-sm leading-6 text-muted">
            Your Google account helps us verify your email.
            We never ask you to create another password.
          </p>
        </div>

        <p className="mt-8 text-center text-xs leading-5 text-muted">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="font-semibold text-forest">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="font-semibold text-forest">
            Privacy Policy
          </Link>.
        </p>

        <Link
          href="/"
          className="mt-6 block text-center text-sm font-semibold text-forest"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}