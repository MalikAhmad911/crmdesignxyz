import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function OnboardingShell({
  step,
  total,
  children,
  side,
}: {
  step: number;
  total: number;
  children: ReactNode;
  side: ReactNode;
}) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="min-h-dvh bg-[color:var(--color-bg)] text-[color:var(--color-heading)] pb-24 lg:pb-0">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-[color:var(--color-border-soft)] bg-[color:var(--color-bg)]/90 backdrop-blur">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-3 px-4 sm:h-14 sm:px-6">
          <Link to="/" className="font-display text-base font-semibold tracking-tight sm:text-lg">
            Revenue<span className="text-[color:var(--color-muted)]">.sol</span>
          </Link>
          <div className="flex min-w-0 flex-1 items-center justify-end gap-3 text-xs text-[color:var(--color-muted)]">
            <span className="hidden sm:inline">Step {step} of {total}</span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[color:var(--color-tint)] sm:w-40">
              <div
                className="h-full rounded-full bg-[color:var(--color-heading)] transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-[11px] font-medium text-[color:var(--color-heading)] sm:hidden">{step}/{total}</span>
            <Link to="/signin" className="hidden text-[color:var(--color-heading)] underline-offset-4 hover:underline sm:inline">
              Save & exit
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 py-4 sm:px-6 sm:py-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-7">
        <div className="min-w-0">{children}</div>
        <aside className="hidden lg:block">
          <div className="sticky top-16">{side}</div>
        </aside>
      </main>
    </div>
  );
}

export function StepHeading({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-6 max-w-xl">
      {eyebrow && (
        <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
          {eyebrow}
        </p>
      )}
      <h1 className="font-display text-[26px] font-medium leading-[1.1] tracking-tight text-[color:var(--color-heading)] sm:text-[30px] md:text-[34px]">
        {title}
      </h1>
      {sub && <p className="mt-2.5 text-[14px] leading-relaxed text-[color:var(--color-body)]">{sub}</p>}
    </div>
  );
}

export function NavRow({
  onBack,
  onNext,
  nextLabel = "Next",
  disabled,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  disabled?: boolean;
}) {
  return (
    <div className="mt-7 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)]"
          >
            ← Back
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[color:var(--color-heading)] px-7 text-sm font-medium text-[color:var(--color-bg)] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-40"
      >
        {nextLabel}
        <span aria-hidden>→</span>
      </button>
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[color:var(--color-heading)]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-[color:var(--color-border-soft)] bg-white px-4 text-[15px] text-[color:var(--color-heading)] placeholder:text-[color:var(--color-muted)] outline-none transition focus:border-[color:var(--color-heading)] focus:ring-4 focus:ring-black/5"
      />
      {hint && <span className="mt-1.5 block text-xs text-[color:var(--color-muted)]">{hint}</span>}
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-[color:var(--color-heading)]">{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-12 w-full appearance-none rounded-2xl border border-[color:var(--color-border-soft)] bg-white px-4 pr-10 text-[15px] text-[color:var(--color-heading)] outline-none focus:border-[color:var(--color-heading)] focus:ring-4 focus:ring-black/5"
        >
          <option value="" disabled>Select one…</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--color-muted)]">▾</span>
      </div>
    </label>
  );
}

export function ChoiceGrid({
  options,
  value,
  onChange,
  columns = 1,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  columns?: 1 | 2 | 3;
}) {
  const cls =
    columns === 3
      ? "grid grid-cols-2 sm:grid-cols-3 gap-3"
      : columns === 2
      ? "grid grid-cols-1 sm:grid-cols-2 gap-3"
      : "grid grid-cols-1 gap-3";
  return (
    <div className={cls}>
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={[
              "group flex items-center justify-between gap-3 rounded-2xl border px-5 py-4 text-left text-[15px] transition",
              selected
                ? "border-[color:var(--color-heading)] bg-[color:var(--color-heading)] text-[color:var(--color-bg)] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)]"
                : "border-[color:var(--color-border-soft)] bg-white text-[color:var(--color-heading)] hover:border-[color:var(--color-heading)]/40 hover:bg-[color:var(--color-tint)]/40",
            ].join(" ")}
          >
            <span className="font-medium">{opt}</span>
            <span
              className={[
                "grid h-5 w-5 shrink-0 place-items-center rounded-full border",
                selected
                  ? "border-[color:var(--color-bg)] bg-[color:var(--color-bg)] text-[color:var(--color-heading)]"
                  : "border-[color:var(--color-border-soft)] text-transparent group-hover:border-[color:var(--color-heading)]/40",
              ].join(" ")}
            >
              ✓
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function MultiChoice({
  options,
  values,
  onToggle,
}: {
  options: string[];
  values: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="grid gap-3">
      {options.map((opt) => {
        const selected = values.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={[
              "flex items-center gap-3 rounded-2xl border px-5 py-4 text-left text-[15px] transition",
              selected
                ? "border-[color:var(--color-heading)] bg-[color:var(--color-heading)] text-[color:var(--color-bg)]"
                : "border-[color:var(--color-border-soft)] bg-white text-[color:var(--color-heading)] hover:bg-[color:var(--color-tint)]/40",
            ].join(" ")}
          >
            <span
              className={[
                "grid h-5 w-5 shrink-0 place-items-center rounded-md border",
                selected
                  ? "border-[color:var(--color-bg)] bg-[color:var(--color-bg)] text-[color:var(--color-heading)]"
                  : "border-[color:var(--color-border-soft)]",
              ].join(" ")}
            >
              {selected ? "✓" : ""}
            </span>
            <span className="font-medium">{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Side panels ---------- */

export function SidePoster({
  badge,
  stat,
  statSub,
  quote,
  author,
  role,
}: {
  badge: string;
  stat: string;
  statSub: string;
  quote: string;
  author: string;
  role: string;
}) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-[color:var(--color-border-soft)] bg-[color:var(--color-tint)] p-7 text-[color:var(--color-heading)]">
      <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-border-soft)] bg-[color:var(--color-bg)] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-muted)]">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {badge}
      </span>
      <div className="mt-6">
        <p className="font-display text-5xl font-medium leading-none tracking-tight text-[color:var(--color-heading)]">{stat}</p>
        <p className="mt-2 text-[13px] text-[color:var(--color-muted)]">{statSub}</p>
      </div>
      <div className="mt-7 rounded-2xl border border-[color:var(--color-border-soft)] bg-[color:var(--color-bg)] p-5">
        <p className="font-display text-[17px] leading-snug text-[color:var(--color-heading)]">“{quote}”</p>
        <div className="mt-4 flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[color:var(--color-tint)] text-sm font-medium text-[color:var(--color-heading)]">
            {author.charAt(0)}
          </div>
          <div className="text-xs">
            <p className="font-medium text-[color:var(--color-heading)]">{author}</p>
            <p className="text-[color:var(--color-muted)]">{role}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-3 text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-muted)]">
        <span>SOC 2 ready</span>
        <span>HIPAA aware</span>
        <span>Made in Austin</span>
      </div>
    </div>
  );
}
