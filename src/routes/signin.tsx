import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AuthShell, Heading, SocialButtons, Divider, Field, PrimaryButton,
  MailIcon, LockIcon,
} from "@/components/auth/AuthLayout";
import { getAccount } from "@/lib/account-store";

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
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const acc = getAccount();
    if (acc.onboardingComplete) window.location.href = "/";
    else window.location.href = "/onboarding";
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
        <Link to="/signup" className="font-medium text-[color:var(--color-brand)] hover:underline">
          Start free trial
        </Link>
      </p>
    </AuthShell>
  );
}
