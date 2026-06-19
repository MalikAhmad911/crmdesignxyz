import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import { Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, type ReactNode } from "react";

/* ---------- Shared visual chrome ---------- */

export function AuthShell({
  mode,
  onSwitch,
  children,
}: {
  mode: "signin" | "signup";
  onSwitch?: (mode: "signin" | "signup") => void;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] flex flex-col lg:grid lg:grid-cols-[1.05fr_1fr] xl:grid-cols-[1.15fr_1fr]">
      <BrandPanel />
      <FormPanel mode={mode} onSwitch={onSwitch}>{children}</FormPanel>
    </div>
  );
}

export function AuthShellWrapper() { return null; }

/* ---------- LEFT: Architectural light brand panel ---------- */

const SERIF = "'Cormorant Garamond', ui-serif, Georgia, serif";
const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace";

function BrandPanel() {
  return (
    <aside className="relative hidden lg:flex flex-col overflow-hidden bg-[#FDFCF9] p-10 xl:p-14 border-r border-zinc-100">
      {/* subtle grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-zinc-100/60 via-transparent to-transparent" />

      {/* Top row */}
      <div className="relative z-10 flex justify-between items-center">
        <Link to="/" className="text-zinc-900 font-bold text-xl tracking-tight">
          revenue<span className="text-zinc-400">.sol</span>
        </Link>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white/80 backdrop-blur-sm shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-semibold text-zinc-500 tracking-wider uppercase">Systems Active</span>
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-10 mt-16 xl:mt-20 max-w-md">
        <div className="inline-flex px-3 py-1 rounded-full border border-zinc-200 bg-zinc-100/60 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest mb-6">
          The Operator OS for Service Shops
        </div>
        <h1 className="!text-zinc-900 text-[44px] xl:text-[56px] leading-[1.05] mb-6" style={{ fontFamily: SERIF }}>
          Never miss a
          <br />
          <span className="italic text-zinc-500">customer call</span> again.
        </h1>
        <p className="text-zinc-500 text-[15px] leading-relaxed max-w-sm">
          AI answers every ring, texts back in seconds, and books jobs straight to your calendar — while you focus on the work.
        </p>
      </div>

      {/* Stats */}
      <div className="relative z-10 grid grid-cols-3 gap-8 mt-12">
        {[
          { v: "42%", l: "More Bookings" },
          { v: "< 3s", l: "Avg. Response" },
          { v: "24/7", l: "Always On" },
        ].map((s) => (
          <div key={s.l}>
            <div className="text-2xl text-zinc-900 mb-1 font-semibold" style={{ fontFamily: MONO }}>
              {s.v}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold">{s.l}</div>
          </div>
        ))}
      </div>

      {/* Activity card with trend line */}
      <div className="relative z-10 mt-auto pt-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-zinc-200 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-[11px] font-black !text-zinc-900 uppercase tracking-widest mb-1">REVENUE SOL</h4>
              <p className="text-[10px] text-zinc-400 font-medium">Real-time conversion yield</p>
            </div>
            <div className="text-[10px] font-bold text-emerald-600 py-1 px-3 rounded-full bg-emerald-50 border border-emerald-100 flex items-center gap-1.5">
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              12.4%
            </div>
          </div>

          <div className="relative h-24 mb-8">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-[0.06]">
              <div className="w-full border-t border-zinc-900" />
              <div className="w-full border-t border-zinc-900" />
              <div className="w-full border-t border-zinc-900" />
            </div>
            <svg className="w-full h-full overflow-visible" viewBox="0 0 280 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M 0 60 Q 30 55, 60 65 Q 90 75, 120 40 Q 150 5, 180 20 Q 210 35, 240 50 Q 280 45, 280 45 V 80 H 0 Z"
                fill="url(#lineGradient)"
              />
              <path
                d="M 0 60 Q 30 55, 60 65 Q 90 75, 120 40 Q 150 5, 180 20 Q 210 35, 240 50 Q 280 45, 280 45"
                fill="none"
                stroke="#18181b"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx="150" cy="5" r="4" fill="white" stroke="#10b981" strokeWidth="2.5" />
              <circle cx="150" cy="5" r="10" fill="#10b981" fillOpacity="0.1" className="animate-pulse" />
            </svg>
            <div className="absolute -bottom-5 inset-x-0 flex justify-between">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <span key={i} className={`text-[9px] font-bold ${i === 3 ? "text-emerald-500" : "text-zinc-300"}`}>
                  {d}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-zinc-900 flex items-center justify-center text-[9px] font-bold !text-white">
                JP
              </div>
              <div>
                <p className="text-[11px] font-bold !text-zinc-900">
                  Jordan P. <span className="text-zinc-400 font-normal">booked a call</span>
                </p>
                <p className="text-[9px] text-emerald-600 font-bold uppercase tracking-tight">+$450.00 Potential</p>
              </div>
            </div>
            <div className="text-[9px] text-zinc-400" style={{ fontFamily: MONO }}>
              2M AGO
            </div>
          </div>
        </div>
      </div>

      {/* Footer compliance row */}
      <div className="relative z-10 flex items-center justify-between mt-8 text-[10px] text-zinc-400">
        <div className="flex gap-4 uppercase tracking-widest font-semibold">
          <span>SOC 2 Ready</span>
          <span>HIPAA Aware</span>
          <span>Austin, TX</span>
        </div>
        <span>© Revenue Sol 2026</span>
      </div>
    </aside>
  );
}



function FormPanel({ mode, onSwitch, children }: { mode: "signin" | "signup"; onSwitch?: (mode: "signin" | "signup") => void; children: ReactNode }) {
  const navigate = useNavigate();
  const switchTo = (m: "signin" | "signup") => {
    if (onSwitch) onSwitch(m);
    else navigate({ to: m === "signin" ? "/signin" : "/signup" });
  };
  return (
    <main className="flex flex-col min-h-screen lg:min-h-0">
      {/* mobile header */}
      <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-[color:var(--color-border-soft)]">
        <Link to="/" className="font-display text-lg font-semibold text-[color:var(--color-heading)]">
          revenue<span className="text-[color:var(--color-brand)]">.sol</span>
        </Link>
        <Link to="/" className="text-xs text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)]">
          ← Back to site
        </Link>
      </div>

      {/* desktop header */}
      <div className="hidden lg:flex items-center justify-between px-10 xl:px-14 pt-8">
        <Link to="/" className="text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)] inline-flex items-center gap-2">
          <span aria-hidden>←</span> Back to site
        </Link>
        <div className="text-sm text-[color:var(--color-muted)]">
          Need help? <a href="mailto:hi@revenue.sol" className="text-[color:var(--color-heading)] underline underline-offset-4">hi@revenue.sol</a>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-5 sm:px-8 py-10 lg:py-12">
        <div className="w-full max-w-[440px]">
          {/* segmented switch */}
          <div className="inline-flex p-1 rounded-full bg-[color:var(--color-tint)] border border-[color:var(--color-border-soft)] mb-8">
            <button
              onClick={() => switchTo("signin")}
              className={`px-5 py-2 text-sm font-medium rounded-full transition ${
                mode === "signin"
                  ? "bg-[color:var(--color-brand)] text-white shadow-sm"
                  : "text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)]"
              }`}
            >
              Log in
            </button>
            <button
              onClick={() => switchTo("signup")}
              className={`px-5 py-2 text-sm font-medium rounded-full transition ${
                mode === "signup"
                  ? "bg-[color:var(--color-brand)] text-white shadow-sm"
                  : "text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)]"
              }`}
            >
              Create account
            </button>
          </div>

          {children}

          <p className="mt-8 text-xs text-[color:var(--color-muted)] leading-relaxed">
            By continuing you agree to our{" "}
            <a href="#" className="underline underline-offset-2 hover:text-[color:var(--color-heading)]">Terms</a>{" "}
            and{" "}
            <a href="#" className="underline underline-offset-2 hover:text-[color:var(--color-heading)]">Privacy Policy</a>.
          </p>
        </div>
      </div>

      <footer className="hidden lg:flex items-center justify-between px-10 xl:px-14 py-6 text-xs text-[color:var(--color-muted)] border-t border-[color:var(--color-border-soft)]">
        <span>© Revenue Sol 2026</span>
        <span>Powered by Infinite Rankers LLC</span>
      </footer>
    </main>
  );
}

/* ---------- Form primitives ---------- */

export function Heading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-7">
      <h1 className="font-display text-[34px] sm:text-[40px] leading-[1.05] tracking-tight text-[color:var(--color-heading)]">
        {title}
      </h1>
      <p className="mt-3 text-[15px] text-[color:var(--color-muted)] leading-relaxed">{subtitle}</p>
    </div>
  );
}

export function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <SocialBtn icon={<GoogleIcon />} label="Google" />
      <SocialBtn icon={<AppleIcon />} label="Apple" />
    </div>
  );
}

function SocialBtn({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className="group inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-[color:var(--color-border-soft)] bg-white text-sm font-medium text-[color:var(--color-heading)] hover:border-[color:var(--color-heading)] hover:-translate-y-px transition"
    >
      {icon} {label}
    </button>
  );
}

export function Divider({ label = "or with email" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="h-px flex-1 bg-[color:var(--color-border-soft)]" />
      <span className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--color-muted)]">{label}</span>
      <div className="h-px flex-1 bg-[color:var(--color-border-soft)]" />
    </div>
  );
}

export function Field({
  label,
  type = "text",
  placeholder,
  autoComplete,
  icon,
  value,
  onChange,
  rightSlot,
  reveal,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (v: string) => void;
  rightSlot?: ReactNode;
  reveal?: boolean;
}) {
  const [show, setShow] = useState(false);
  const actualType = reveal ? (show ? "text" : "password") : type;
  return (
    <label className="block">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] font-medium text-[color:var(--color-heading)]">{label}</span>
        {rightSlot}
      </div>
      <div className="group relative flex items-center rounded-xl border border-[color:var(--color-border-soft)] bg-white focus-within:border-[color:var(--color-heading)] focus-within:ring-4 focus-within:ring-[color:var(--color-heading)]/5 transition">
        {icon && (
          <span className="pl-3.5 text-[color:var(--color-muted)] group-focus-within:text-[color:var(--color-heading)]">
            {icon}
          </span>
        )}
        <input
          type={actualType}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full h-11 bg-transparent px-3.5 text-[15px] text-[color:var(--color-heading)] placeholder:text-[color:var(--color-muted)]/70 focus:outline-none"
        />
        {reveal && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="px-3.5 text-xs text-[color:var(--color-muted)] hover:text-[color:var(--color-heading)]"
          >
            {show ? "Hide" : "Show"}
          </button>
        )}
      </div>
    </label>
  );
}

export function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="submit"
      className="group w-full h-12 rounded-xl bg-[color:var(--color-brand)] text-white font-medium text-sm hover:bg-[color:var(--color-brand-hover)] active:translate-y-px transition shadow-[0_12px_30px_-12px_rgba(0,0,0,0.5)] inline-flex items-center justify-center gap-2"
    >
      {children}
      <span className="transition-transform group-hover:translate-x-0.5">→</span>
    </button>
  );
}

export function PasswordStrength({ value }: { value: string }) {
  const score = useMemo(() => {
    let s = 0;
    if (value.length >= 8) s++;
    if (/[A-Z]/.test(value)) s++;
    if (/\d/.test(value)) s++;
    if (/[^A-Za-z0-9]/.test(value)) s++;
    return s; // 0..4
  }, [value]);
  const labels = ["Too short", "Weak", "Okay", "Good", "Strong"];
  const colors = ["bg-stone-300", "bg-red-400", "bg-amber-400", "bg-lime-500", "bg-emerald-500"];
  return (
    <div className="mt-2">
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${i < score ? colors[score] : "bg-[color:var(--color-border-soft)]"}`}
          />
        ))}
      </div>
      <div className="mt-1.5 text-[11px] text-[color:var(--color-muted)]">
        Password strength: <span className="text-[color:var(--color-heading)] font-medium">{labels[score]}</span>
      </div>
    </div>
  );
}

export function TrustRow() {
  return (
    <div className="mt-5 grid grid-cols-3 gap-2 text-center">
      {[
        { t: "No credit card", s: "to start" },
        { t: "14-day trial", s: "full access" },
        { t: "Cancel anytime", s: "1 click" },
      ].map((b) => (
        <div key={b.t} className="rounded-xl border border-[color:var(--color-border-soft)] bg-white/60 py-2.5">
          <div className="text-[12px] font-semibold text-[color:var(--color-heading)]">{b.t}</div>
          <div className="text-[10px] text-[color:var(--color-muted)] uppercase tracking-wider">{b.s}</div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Icons ---------- */

function Check() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
export function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
export function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
export function UserIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}
export function BuildingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
    </svg>
  );
}
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5 17.6 35.5 12.5 30.4 12.5 24S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5c10.8 0 19.5-8.7 19.5-19.5 0-1.3-.1-2.3-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 12.5 24 12.5c2.9 0 5.6 1.1 7.7 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5c-7.5 0-14 4.2-17.7 10.2z" />
      <path fill="#4CAF50" d="M24 43.5c5.1 0 9.7-1.9 13.2-5.1l-6.1-5c-2 1.4-4.5 2.1-7.1 2.1-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.9 39.3 16.4 43.5 24 43.5z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.4l6.1 5c-.4.4 6.7-4.9 6.7-14.4 0-1.3-.1-2.3-.4-3.5z" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg width="16" height="18" viewBox="0 0 384 512" aria-hidden fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM256.6 84.5C283.1 53.1 281.4 24.4 281.4 14c-22.6 1.3-48.8 15.4-63.7 32.7-16.4 18.5-26 41.4-23.9 67 24.5 1.9 47.4-10.7 62.8-29.2z" />
    </svg>
  );
}
