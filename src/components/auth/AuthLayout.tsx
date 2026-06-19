import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
  subtitle: string;
  side?: "signin" | "signup";
};

const benefits = [
  { k: "01", t: "Never miss a service call", b: "We pick up, reply, and book jobs onto your calendar — 24/7." },
  { k: "02", t: "Set up in under 10 minutes", b: "Connect your phone, calendar, and inbox. We handle the rest." },
  { k: "03", t: "Loved by 1,200+ shops", b: "HVAC, plumbing, electrical, roofing, and cleaning crews." },
];

export function AuthLayout({ children, title, subtitle, side = "signin" }: Props) {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] flex flex-col lg:grid lg:grid-cols-2">
      {/* LEFT — brand panel */}
      <aside className="relative hidden lg:flex flex-col justify-between bg-[color:var(--color-heading)] text-[color:var(--color-bg)] p-10 xl:p-14 overflow-hidden">
        {/* decorative grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #F4F1EC 1px, transparent 1px), linear-gradient(to bottom, #F4F1EC 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full blur-3xl opacity-30"
          style={{ background: "radial-gradient(circle, #EAE5DA 0%, transparent 60%)" }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
            revenue<span className="opacity-70">.sol</span>
          </Link>
          <span className="text-xs uppercase tracking-[0.22em] opacity-60">Operator OS</span>
        </div>

        <div className="relative z-10 max-w-md">
          <p className="text-xs uppercase tracking-[0.22em] opacity-60 mb-5">Why operators switch</p>
          <h2 className="font-display text-4xl xl:text-5xl leading-[1.05] tracking-tight">
            The quiet edge behind <em className="italic font-normal">busy</em> service shops.
          </h2>
          <ul className="mt-10 space-y-6">
            {benefits.map((b) => (
              <li key={b.k} className="flex gap-4">
                <span className="font-display text-sm opacity-50 pt-1 w-6">{b.k}</span>
                <div>
                  <div className="font-medium">{b.t}</div>
                  <div className="text-sm opacity-70 mt-0.5">{b.b}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur p-5 max-w-md">
          <div className="flex items-center gap-1 text-amber-300 text-sm">
            {"★★★★★".split("").map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
          <p className="mt-3 text-sm opacity-90 leading-relaxed">
            "We booked 40% more jobs the first month. Feels like hiring a dispatcher who never sleeps."
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[color:var(--color-tint)] grid place-items-center text-[color:var(--color-heading)] text-xs font-semibold">
              MR
            </div>
            <div className="text-sm">
              <div className="font-medium">Marcus Reyes</div>
              <div className="opacity-60 text-xs">Owner, Reyes HVAC · Austin, TX</div>
            </div>
          </div>
        </div>
      </aside>

      {/* RIGHT — form */}
      <main className="flex flex-col min-h-screen lg:min-h-0">
        {/* mobile top bar */}
        <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-[color:var(--color-border-soft)]">
          <Link to="/" className="font-display text-lg font-semibold text-[color:var(--color-heading)]">
            revenue<span className="text-[color:var(--color-brand)]">.sol</span>
          </Link>
          <Link
            to={side === "signin" ? "/signup" : "/signin"}
            className="text-sm text-[color:var(--color-body)] hover:text-[color:var(--color-heading)]"
          >
            {side === "signin" ? "Create account" : "Log in"}
          </Link>
        </div>

        {/* desktop top-right switch */}
        <div className="hidden lg:flex justify-end px-10 xl:px-14 pt-8 text-sm">
          <span className="text-[color:var(--color-muted)] mr-2">
            {side === "signin" ? "New to Revenue Sol?" : "Already have an account?"}
          </span>
          <Link
            to={side === "signin" ? "/signup" : "/signin"}
            className="font-medium text-[color:var(--color-heading)] underline underline-offset-4 decoration-1 hover:opacity-70"
          >
            {side === "signin" ? "Create an account" : "Log in"}
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-10 lg:py-14">
          <div className="w-full max-w-md">
            <h1 className="font-display text-3xl sm:text-4xl tracking-tight text-[color:var(--color-heading)]">
              {title}
            </h1>
            <p className="mt-3 text-[color:var(--color-muted)]">{subtitle}</p>

            <div className="mt-8">{children}</div>

            <p className="mt-10 text-xs text-[color:var(--color-muted)] leading-relaxed">
              By continuing you agree to our{" "}
              <a href="#" className="underline underline-offset-2 hover:text-[color:var(--color-heading)]">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="underline underline-offset-2 hover:text-[color:var(--color-heading)]">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>

        <footer className="hidden lg:flex items-center justify-between px-10 xl:px-14 py-6 text-xs text-[color:var(--color-muted)] border-t border-[color:var(--color-border-soft)]">
          <span>© Revenue Sol 2026</span>
          <span>Powered by Infinite Rankers LLC</span>
        </footer>
      </main>
    </div>
  );
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 h-11 rounded-full border border-[color:var(--color-border-soft)] bg-white text-sm font-medium text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)] transition"
      >
        <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
          <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5 17.6 35.5 12.5 30.4 12.5 24S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.8 0 19.5-8.7 19.5-19.5 0-1.3-.1-2.3-.4-3.5z" />
          <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5c-7.5 0-14 4.2-17.7 10.2z" />
          <path fill="#4CAF50" d="M24 43.5c5.1 0 9.7-1.9 13.2-5.1l-6.1-5c-2 1.4-4.5 2.1-7.1 2.1-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.9 39.3 16.4 43.5 24 43.5z" />
          <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.1 5c-.4.4 6.7-4.9 6.7-14.4 0-1.3-.1-2.3-.4-3.5z" />
        </svg>
        Google
      </button>
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 h-11 rounded-full border border-[color:var(--color-border-soft)] bg-white text-sm font-medium text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)] transition"
      >
        <svg width="16" height="18" viewBox="0 0 384 512" aria-hidden fill="currentColor">
          <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM256.6 84.5C283.1 53.1 281.4 24.4 281.4 14c-22.6 1.3-48.8 15.4-63.7 32.7-16.4 18.5-26 41.4-23.9 67 24.5 1.9 47.4-10.7 62.8-29.2z" />
        </svg>
        Apple
      </button>
    </div>
  );
}

export function FieldDivider({ label = "or continue with email" }: { label?: string }) {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="h-px flex-1 bg-[color:var(--color-border-soft)]" />
      <span className="text-xs uppercase tracking-widest text-[color:var(--color-muted)]">{label}</span>
      <div className="h-px flex-1 bg-[color:var(--color-border-soft)]" />
    </div>
  );
}

export function Field({
  label,
  type = "text",
  placeholder,
  autoComplete,
  rightSlot,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  rightSlot?: ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-[color:var(--color-heading)]">{label}</span>
        {rightSlot}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full h-11 rounded-xl border border-[color:var(--color-border-soft)] bg-white px-4 text-[15px] text-[color:var(--color-heading)] placeholder:text-[color:var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-heading)] focus:border-transparent transition"
      />
    </label>
  );
}

export function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="w-full h-11 rounded-full bg-[color:var(--color-brand)] text-white font-medium text-sm hover:bg-[color:var(--color-brand-hover)] transition shadow-[0_8px_24px_-12px_rgba(0,0,0,0.4)]"
    >
      {children}
    </button>
  );
}
