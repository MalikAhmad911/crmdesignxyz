import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { setAccount } from "@/lib/account-store";
import {
  AuthShell, Heading, SocialButtons, Divider, Field, PrimaryButton,
  PasswordStrength, TrustRow,
  MailIcon, LockIcon, UserIcon, BuildingIcon,
} from "@/components/auth/AuthLayout";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Start free trial — Revenue Sol" },
      { name: "description", content: "Create a Revenue Sol account in minutes. No credit card. 14-day free trial for service shops." },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const [password, setPassword] = useState("");
  return (
    <AuthShell side="signup">
      <Heading
        title="Start your 14‑day trial."
        subtitle="No credit card. Set up in under 10 minutes. Cancel anytime."
      />
      <SocialButtons />
      <Divider label="or with email" />
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" placeholder="Alex" autoComplete="given-name" icon={<UserIcon />} />
          <Field label="Last name" placeholder="Morgan" autoComplete="family-name" icon={<UserIcon />} />
        </div>
        <Field label="Business name" placeholder="Reyes HVAC" autoComplete="organization" icon={<BuildingIcon />} />
        <Field label="Work email" type="email" placeholder="you@yourcompany.com" autoComplete="email" icon={<MailIcon />} />
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
    </AuthShell>
  );
}
