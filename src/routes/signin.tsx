import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AuthShell, Heading, SocialButtons, Divider, Field, PrimaryButton,
  MailIcon, LockIcon,
} from "@/components/auth/AuthLayout";
import { getAccount } from "@/lib/account-store";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Log in — Revenue Sol" },
      { name: "description", content: "Log in to your Revenue Sol account." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) { setError("Enter your email and password."); return; }
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) { setError(err.message); return; }
    const acc = getAccount();
    window.location.href = acc.onboardingComplete ? "/app/dashboard" : "/onboarding";
  };

  return (
    <AuthShell>
      <Heading
        title="Welcome back."
        subtitle="Log in to keep your phones answered and your calendar full."
      />
      <SocialButtons />
      <Divider />
      <form className="space-y-4" onSubmit={submit}>
        <Field
          label="Work email"
          type="email"
          placeholder="you@yourcompany.com"
          autoComplete="email"
          icon={<MailIcon />}
          value={email}
          onChange={setEmail}
        />
        <Field
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          icon={<LockIcon />}
          reveal
          value={password}
          onChange={setPassword}
          rightSlot={
            <a href="#" className="text-[11px] text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)]">
              Forgot password?
            </a>
          }
        />
        {error && (
          <div className="text-[12.5px] font-medium text-red-600">{error}</div>
        )}
        <PrimaryButton disabled={loading}>{loading ? "Signing in…" : "Log in"}</PrimaryButton>
      </form>
      <p className="mt-6 text-center text-sm text-[color:var(--color-body)]">
        Don't have an account?{" "}
        <Link to="/signup" className="font-medium text-[color:var(--color-brand)] hover:underline">
          Start free trial
        </Link>
      </p>
    </AuthShell>
  );
}
