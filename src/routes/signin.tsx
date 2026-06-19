import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, SocialButtons, FieldDivider, Field, PrimaryButton } from "@/components/auth/AuthLayout";

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
  return (
    <AuthLayout
      side="signin"
      title="Welcome back."
      subtitle="Log in to keep your phones answered and your calendar full."
    >
      <SocialButtons />
      <FieldDivider />
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="Work email" type="email" placeholder="you@yourcompany.com" autoComplete="email" />
        <Field
          label="Password"
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
          rightSlot={
            <a href="#" className="text-xs text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)]">
              Forgot password?
            </a>
          }
        />
        <label className="flex items-center gap-2 text-sm text-[color:var(--color-body)]">
          <input type="checkbox" className="h-4 w-4 rounded border-[color:var(--color-border-soft)] accent-[color:var(--color-brand)]" />
          Keep me signed in on this device
        </label>
        <PrimaryButton>Log in to dashboard</PrimaryButton>
      </form>

      <p className="mt-6 text-sm text-[color:var(--color-muted)] lg:hidden">
        New here?{" "}
        <Link to="/signup" className="text-[color:var(--color-heading)] underline underline-offset-4">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}
