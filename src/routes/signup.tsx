import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout, SocialButtons, FieldDivider, Field, PrimaryButton } from "@/components/auth/AuthLayout";

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
  return (
    <AuthLayout
      side="signup"
      title="Start your 14‑day trial."
      subtitle="No credit card required. Cancel anytime. Set up in under 10 minutes."
    >
      <SocialButtons />
      <FieldDivider label="or sign up with email" />
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <Field label="First name" placeholder="Alex" autoComplete="given-name" />
          <Field label="Last name" placeholder="Morgan" autoComplete="family-name" />
        </div>
        <Field label="Business name" placeholder="Reyes HVAC" autoComplete="organization" />
        <Field label="Work email" type="email" placeholder="you@yourcompany.com" autoComplete="email" />
        <Field label="Password" type="password" placeholder="At least 8 characters" autoComplete="new-password" />

        <PrimaryButton>Create my account</PrimaryButton>

        <div className="grid grid-cols-3 gap-3 pt-2 text-center text-[11px] text-[color:var(--color-muted)]">
          <div className="rounded-lg border border-[color:var(--color-border-soft)] py-2">No credit card</div>
          <div className="rounded-lg border border-[color:var(--color-border-soft)] py-2">14‑day trial</div>
          <div className="rounded-lg border border-[color:var(--color-border-soft)] py-2">Cancel anytime</div>
        </div>
      </form>

      <p className="mt-6 text-sm text-[color:var(--color-muted)] lg:hidden">
        Already have an account?{" "}
        <Link to="/signin" className="text-[color:var(--color-heading)] underline underline-offset-4">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}
