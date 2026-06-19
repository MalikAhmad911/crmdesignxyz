import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AuthShell, Heading, SocialButtons, Divider, Field, PrimaryButton,
  PasswordStrength, TrustRow,
  MailIcon, LockIcon, UserIcon, BuildingIcon,
} from "@/components/auth/AuthLayout";
import { setAccount } from "@/lib/account-store";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create account — Revenue Sol" },
      { name: "description", content: "Start your 14-day Revenue Sol trial. No credit card required." },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
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
    <AuthShell>
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
        <Link to="/signin" className="font-medium text-[color:var(--color-brand)] hover:underline">
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
