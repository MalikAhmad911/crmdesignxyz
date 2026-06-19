import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  AuthShell, Heading, SocialButtons, Divider, Field, PrimaryButton,
  MailIcon, LockIcon,
} from "@/components/auth/AuthLayout";
import { getAccount } from "@/lib/account-store";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Log in — Revenue Sol" },
      { name: "description", content: "Log in to Revenue Sol to manage calls, messages, and bookings for your service shop." },
    ],
  }),
  component: SignInPage,
});

function SignInPage() {
  const navigate = useNavigate();
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const acc = getAccount();
    navigate({ to: acc.onboardingComplete ? "/dashboard" : "/onboarding" });
  };
  return (
    <AuthShell side="signin">
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
        <PrimaryButton>Log in to dashboard</PrimaryButton>
      </form>
    </AuthShell>
  );
}
