import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  AuthShell, Heading, SocialButtons, Divider, Field, PrimaryButton,
  PasswordStrength, TrustRow,
  MailIcon, LockIcon, UserIcon, BuildingIcon,
} from "@/components/auth/AuthLayout";
import { getAccount, setAccount } from "@/lib/account-store";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Log in or sign up — Revenue Sol" },
      { name: "description", content: "Log in or create a Revenue Sol account. Free 14-day trial for service shops." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");

  return (
    <AuthShell mode={mode} onSwitch={setMode}>
      {mode === "signin" ? <SignInForm onSwitch={() => setMode("signup")} /> : <SignUpForm onSwitch={() => setMode("signin")} />}
    </AuthShell>
  );
}

function SignInForm({ onSwitch }: { onSwitch: () => void }) {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const acc = getAccount();
    // In real app you'd validate and log in. For now we just show the flow.
    if (acc.onboardingComplete) {
      window.location.href = "/";
    } else {
      window.location.href = "/onboarding";
    }
  };

  return (
    <>
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
        />
        <Field
          label="Password"
          autoComplete="current-password"
          placeholder="Enter your password"
          icon={<LockIcon />}
          reveal
          rightSlot={
            <a href="#" className="text-[11px] text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)]">
              Forgot password?
            </a>
          }
        />
        <label className="flex items-center gap-2 text-[13px] text-[color:var(--color-body)]">
          <input
            type="checkbox"
            defaultChecked
            className="h-4 w-4 rounded border-[color:var(--color-border-soft)] accent-[color:var(--color-brand)]"
          />
          Keep me signed in on this device
        </label>
        <PrimaryButton>Log in</PrimaryButton>
      </form>
      <p className="mt-6 text-center text-sm text-[color:var(--color-body)]">
        Don't have an account?{" "}
        <button onClick={onSwitch} className="font-medium text-[color:var(--color-brand)] hover:underline">
          Start free trial
        </button>
      </p>
    </>
  );
}

function SignUpForm({ onSwitch }: { onSwitch: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !email || password.length < 8) return;
    setAccount({ firstName, lastName, company, plan: "trial", trialDaysLeft: 14 });
    window.location.href = "/onboarding";
  };

  return (
    <>
      <Heading
        title="Start your 14‑day trial."
        subtitle="No credit card. Set up in under 10 minutes. Cancel anytime."
      />
      <SocialButtons />
      <Divider label="or with email" />
      <form className="space-y-4" onSubmit={submit}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" placeholder="Alex" autoComplete="given-name" icon={<UserIcon />} value={firstName} onChange={setFirstName} />
          <Field label="Last name" placeholder="Morgan" autoComplete="family-name" icon={<UserIcon />} value={lastName} onChange={setLastName} />
        </div>
        <Field label="Business name" placeholder="Reyes HVAC" autoComplete="organization" icon={<BuildingIcon />} value={company} onChange={setCompany} />
        <Field label="Work email" type="email" placeholder="you@yourcompany.com" autoComplete="email" icon={<MailIcon />} value={email} onChange={setEmail} />
        <div>
          <Field
            label="Create password"
            autoComplete="new-password"
            placeholder="At least 8 characters"
            icon={<LockIcon />}
            reveal
            value={password}
            onChange={setPassword}
          />
          <PasswordStrength value={password} />
        </div>
        <PrimaryButton>Create my account</PrimaryButton>
        <TrustRow />
      </form>
      <p className="mt-6 text-center text-sm text-[color:var(--color-body)]">
        Already have an account?{" "}
        <button onClick={onSwitch} className="font-medium text-[color:var(--color-brand)] hover:underline">
          Log in
        </button>
      </p>
    </>
  );
}
