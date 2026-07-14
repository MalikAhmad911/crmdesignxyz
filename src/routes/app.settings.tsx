import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { z } from "zod";
import {
  UserCircle2, KeyRound, Bell, Globe, Info, Sun, Calendar as CalIcon,
  LifeBuoy, Phone, ChevronRight, Camera, LogOut, CreditCard, Users,
  Link2, Bot, Shield, Palette, Building2, Check, Loader2,
} from "lucide-react";
import { PageHeader, Btn, Tag } from "@/components/app-shell/AppShell";
import { BUSINESS } from "@/lib/rs-mocks";
import { getAccount, setAccount, useAccount } from "@/lib/account-store";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

type Row = {
  id: string;
  label: string;
  icon: LucideIcon;
  meta?: string;
  tone?: "default" | "danger";
};
type Group = { title: string; rows: Row[] };

const GROUPS: Group[] = [
  {
    title: "Account",
    rows: [
      { id: "profile",       label: "Manage Profile",     icon: UserCircle2 },
      { id: "security",      label: "Password & Security", icon: KeyRound },
      { id: "notifications", label: "Notifications",       icon: Bell, meta: "On" },
      { id: "language",      label: "Language",            icon: Globe, meta: "English" },
    ],
  },
  {
    title: "Workspace",
    rows: [
      { id: "business",     label: "Business Profile", icon: Building2 },
      { id: "team",         label: "Team & Roles",     icon: Users, meta: "5 members" },
      { id: "billing",      label: "Plan & Billing",   icon: CreditCard, meta: "Pro" },
      { id: "integrations", label: "Integrations",     icon: Link2, meta: "4 connected" },
    ],
  },
  {
    title: "Preferences",
    rows: [
      { id: "about",        label: "About Us",     icon: Info },
      { id: "theme",        label: "Theme",        icon: Sun, meta: "Light" },
      { id: "appointments", label: "Appointments", icon: CalIcon },
      { id: "appearance",   label: "Appearance",   icon: Palette },
    ],
  },
  {
    title: "AI & Automation",
    rows: [
      { id: "ai",       label: "AI Settings",   icon: Bot },
      { id: "privacy",  label: "Data & Privacy", icon: Shield },
    ],
  },
  {
    title: "Support",
    rows: [
      { id: "help",    label: "Help Center", icon: LifeBuoy },
      { id: "contact", label: "Contact Us",  icon: Phone },
      { id: "logout",  label: "Sign Out",    icon: LogOut, tone: "danger" },
    ],
  },
];

function SettingsPage() {
  const [selected, setSelected] = useState<string>("profile");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1200px] mx-auto">
      <PageHeader
        title="Settings"
        subtitle="Manage your account, workspace and preferences"
      />

      {/* Profile hero card */}
      <ProfileCard />

      {/* Two-column on desktop, stacked on mobile */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-5">
        {/* Left: grouped list */}
        <div className="space-y-6">
          {GROUPS.slice(0, 3).map((g) => (
            <GroupList
              key={g.title}
              group={g}
              selected={selected}
              onSelect={setSelected}
            />
          ))}
        </div>

        {/* Right: grouped list continued + detail panel on desktop */}
        <div className="space-y-6">
          {GROUPS.slice(3).map((g) => (
            <GroupList
              key={g.title}
              group={g}
              selected={selected}
              onSelect={setSelected}
            />
          ))}

          {/* Detail preview — desktop only */}
          <div className="hidden lg:block">
            <DetailPanel id={selected} />
          </div>
        </div>
      </div>

      {/* Mobile detail panel appears below list */}
      <div className="lg:hidden mt-6">
        <DetailPanel id={selected} />
      </div>

      <div className="mt-8 text-center text-[11.5px] text-[--color-muted]">
        Revenue Sol · v2.4.1 · © 2026
      </div>
    </div>
  );
}

/* ---------------- Profile hero ---------------- */

function ProfileCard() {
  const acc = useAccount();
  const fullName =
    [acc.firstName, acc.lastName].filter(Boolean).join(" ") || BUSINESS.owner;
  const email = acc.email || "mike@abcplumbing.com";
  const role = acc.role || BUSINESS.role;
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="relative overflow-hidden bg-white rounded-2xl border border-[--color-hairline] p-4 sm:p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ background: "var(--color-brand-gradient-2)" }}
      />
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <div
            className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full grid place-items-center text-white text-[22px] font-bold ring-4 ring-white"
            style={{ background: "var(--color-brand-gradient-2)", boxShadow: "var(--shadow-glow)" }}
          >
            {initials}
          </div>
          <button
            aria-label="Change photo"
            className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-white border border-[--color-hairline] grid place-items-center text-[--color-body] hover:text-[--color-primary-deep] transition"
          >
            <Camera size={13} />
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-[16px] sm:text-[18px] font-semibold text-[--color-ink] truncate">
              {fullName}
            </h2>
            <Tag tone="primary">{role}</Tag>
          </div>
          <div className="text-[12.5px] text-[--color-muted] truncate mt-0.5">
            {email} · {acc.company || BUSINESS.name}
          </div>
        </div>
      </div>
    </div>
  );
}


/* ---------------- Grouped list ---------------- */

function GroupList({
  group,
  selected,
  onSelect,
}: {
  group: Group;
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <section>
      <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[--color-muted] px-1 mb-2">
        {group.title}
      </div>

      <div
        className="bg-white rounded-2xl border border-[--color-hairline] overflow-hidden"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {group.rows.map((r, idx) => {
          const I = r.icon;
          const active = selected === r.id;
          const danger = r.tone === "danger";
          return (
            <button
              key={r.id}
              onClick={() => onSelect(r.id)}
              className={`group w-full flex items-center gap-3 px-4 h-[52px] text-left transition-colors ${
                idx > 0 ? "border-t border-[--color-hairline-soft]" : ""
              } ${
                active
                  ? "bg-[--color-primary-subdued]/50"
                  : "hover:bg-[--color-surface-strong]/60"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-lg grid place-items-center shrink-0 transition ${
                  danger
                    ? "bg-[--color-error-subtle] text-[--color-error]"
                    : active
                    ? "bg-white text-[--color-primary-deep] ring-1 ring-[--color-primary]/20"
                    : "bg-[--color-surface-strong] text-[--color-body] group-hover:text-[--color-primary-deep]"
                }`}
              >
                <I size={16} />
              </span>

              <span
                className={`flex-1 min-w-0 text-[13.5px] font-medium truncate ${
                  danger ? "text-[--color-error]" : "text-[--color-ink]"
                }`}
              >
                {r.label}
              </span>

              {r.meta && (
                <span className="text-[12px] text-[--color-muted] font-medium shrink-0">
                  {r.meta}
                </span>
              )}

              <ChevronRight
                size={16}
                className={`shrink-0 transition-transform ${
                  danger ? "text-[--color-error]/70" : "text-[--color-muted-soft] group-hover:translate-x-0.5 group-hover:text-[--color-primary-deep]"
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- Detail panel ---------------- */

function DetailPanel({ id }: { id: string }) {
  const row =
    GROUPS.flatMap((g) => g.rows).find((r) => r.id === id) ??
    GROUPS[0].rows[0];

  return (
    <div
      className="bg-white rounded-2xl border border-[--color-hairline] p-5"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-center gap-2 mb-4">
        <row.icon size={16} className="text-[--color-primary-deep]" />
        <h3 className="text-[15px] font-semibold text-[--color-ink]">{row.label}</h3>
      </div>

      {id === "profile" && <ProfileForm />}


      {id === "billing" && (
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-[--color-primary]/40 bg-[--color-primary-subdued]/40 flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-semibold text-[--color-ink]">Pro Plan</span>
                <Tag tone="primary">Current</Tag>
              </div>
              <div className="text-[12px] text-[--color-muted] mt-0.5">$99/mo · Renews Aug 15</div>
            </div>
            <Btn variant="gradient" size="sm">Upgrade</Btn>
          </div>
          <div className="text-[12px] text-[--color-muted]">
            Next invoice: <span className="font-semibold text-[--color-ink]">$99.00</span> on Aug 15
          </div>
        </div>
      )}

      {id === "integrations" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { name: "Google Business", connected: true },
            { name: "Stripe", connected: true },
            { name: "Twilio", connected: true },
            { name: "QuickBooks", connected: false },
            { name: "HubSpot", connected: false },
            { name: "Zapier", connected: true },
          ].map((i) => (
            <div key={i.name} className="flex items-center justify-between p-3 rounded-xl border border-[--color-hairline]">
              <div className="text-[13px] font-semibold text-[--color-ink]">{i.name}</div>
              {i.connected ? <Tag tone="success">Connected</Tag> : <Btn size="sm" variant="secondary">Connect</Btn>}
            </div>
          ))}
        </div>
      )}

      {id === "notifications" && (
        <div className="space-y-2.5">
          {[
            { l: "Email notifications", d: "New leads, replies, invoices", on: true },
            { l: "Push notifications", d: "Live call & job updates", on: true },
            { l: "SMS alerts", d: "Only for urgent AI escalations", on: false },
            { l: "Weekly digest", d: "Every Monday, 8am", on: true },
          ].map((n) => (
            <label key={n.l} className="flex items-center justify-between gap-3 p-3 rounded-xl border border-[--color-hairline] hover:bg-[--color-surface-strong]/50 transition cursor-pointer">
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-[--color-ink]">{n.l}</div>
                <div className="text-[12px] text-[--color-muted] truncate">{n.d}</div>
              </div>
              <Toggle defaultOn={n.on} />
            </label>
          ))}
        </div>
      )}

      {!["profile", "billing", "integrations", "notifications"].includes(id) && (
        <div className="py-10 text-center text-[13px] text-[--color-muted]">
          {row.label} settings coming soon.
        </div>
      )}
    </div>
  );
}

/* ---------------- Profile form (editable + validated + persisted) ---------------- */

const profileSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50, "Max 50 characters"),
  lastName: z.string().trim().max(50, "Max 50 characters").optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email address").max(255, "Max 255 characters"),
  phone: z
    .string()
    .trim()
    .max(30, "Max 30 characters")
    .regex(/^[+()\-.\s\d]*$/, "Only digits, spaces, and + ( ) - .")
    .optional()
    .or(z.literal("")),
  role: z.string().trim().max(50, "Max 50 characters").optional().or(z.literal("")),
  company: z.string().trim().max(100, "Max 100 characters").optional().or(z.literal("")),
});

type ProfileValues = z.infer<typeof profileSchema>;
type ProfileErrors = Partial<Record<keyof ProfileValues, string>>;

function defaultsFromAccount(): ProfileValues {
  const acc = getAccount();
  return {
    firstName: acc.firstName ?? "Mike",
    lastName: acc.lastName ?? "Walker",
    email: acc.email ?? "mike@abcplumbing.com",
    phone: acc.phone ?? "+1 214-555-0100",
    role: acc.role ?? BUSINESS.role,
    company: acc.company ?? BUSINESS.name,
  };
}

function ProfileForm() {
  const [values, setValues] = useState<ProfileValues>(() => defaultsFromAccount());
  const [initial, setInitial] = useState<ProfileValues>(values);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const dirty = useMemo(
    () => JSON.stringify(values) !== JSON.stringify(initial),
    [values, initial],
  );

  useEffect(() => {
    if (status !== "saved") return;
    const t = setTimeout(() => setStatus("idle"), 2200);
    return () => clearTimeout(t);
  }, [status]);

  const set = <K extends keyof ProfileValues>(key: K, v: ProfileValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSave = () => {
    const parsed = profileSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: ProfileErrors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof ProfileValues;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      return;
    }
    setStatus("saving");
    // Simulate a save round-trip while persisting locally.
    setTimeout(() => {
      setAccount({
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName || undefined,
        email: parsed.data.email,
        phone: parsed.data.phone || undefined,
        role: parsed.data.role || undefined,
        company: parsed.data.company || undefined,
      });
      setInitial(values);
      setErrors({});
      setStatus("saved");
    }, 450);
  };

  const onReset = () => {
    setValues(initial);
    setErrors({});
    setStatus("idle");
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave(); }}
      className="space-y-4 max-w-xl"
      noValidate
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Field
          label="First Name"
          value={values.firstName}
          onChange={(v) => set("firstName", v)}
          error={errors.firstName}
          autoComplete="given-name"
          maxLength={50}
          required
        />
        <Field
          label="Last Name"
          value={values.lastName ?? ""}
          onChange={(v) => set("lastName", v)}
          error={errors.lastName}
          autoComplete="family-name"
          maxLength={50}
        />
      </div>

      <Field
        label="Email"
        type="email"
        value={values.email}
        onChange={(v) => set("email", v)}
        error={errors.email}
        autoComplete="email"
        maxLength={255}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <Field
          label="Phone"
          type="tel"
          value={values.phone ?? ""}
          onChange={(v) => set("phone", v)}
          error={errors.phone}
          autoComplete="tel"
          maxLength={30}
          placeholder="+1 555 555 0100"
        />
        <Field
          label="Role"
          value={values.role ?? ""}
          onChange={(v) => set("role", v)}
          error={errors.role}
          maxLength={50}
          placeholder="Owner"
        />
      </div>

      <Field
        label="Company"
        value={values.company ?? ""}
        onChange={(v) => set("company", v)}
        error={errors.company}
        maxLength={100}
      />

      <div className="flex items-center gap-2 pt-1 flex-wrap">
        <Btn
          type="submit"
          variant="gradient"
          disabled={!dirty || status === "saving"}
          icon={status === "saving" ? <Loader2 size={14} className="animate-spin" /> : undefined}
        >
          {status === "saving" ? "Saving…" : "Save Changes"}
        </Btn>
        <Btn variant="ghost" onClick={onReset} disabled={!dirty || status === "saving"}>
          Cancel
        </Btn>

        {status === "saved" && (
          <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[--color-success]">
            <Check size={14} /> Changes saved
          </span>
        )}
        {status === "error" && (
          <span className="text-[12.5px] font-semibold text-[--color-error]">
            Please fix the highlighted fields
          </span>
        )}
      </div>
    </form>
  );
}

function Field({
  label, value, onChange, error, type = "text",
  autoComplete, maxLength, placeholder, required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: "text" | "email" | "tel";
  autoComplete?: string;
  maxLength?: number;
  placeholder?: string;
  required?: boolean;
}) {
  const invalid = !!error;
  return (
    <div>
      <label className="flex items-center justify-between text-[12px] font-semibold text-[--color-body-strong] mb-1.5">
        <span>
          {label}
          {required && <span className="text-[--color-error] ml-0.5">*</span>}
        </span>
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={invalid}
        className={`w-full h-10 px-3 rounded-lg bg-white border text-[13.5px] text-[--color-ink] transition focus:outline-none ${
          invalid
            ? "border-[--color-error] focus:border-[--color-error] focus:ring-2 focus:ring-[--color-error]/20"
            : "border-[--color-hairline] focus:border-[--color-primary]"
        }`}
      />
      {invalid && (
        <div className="text-[11.5px] text-[--color-error] mt-1 font-medium">{error}</div>
      )}
    </div>
  );
}


function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={(e) => { e.preventDefault(); setOn((v) => !v); }}
      className={`w-10 h-6 rounded-full relative transition-colors shrink-0 ${on ? "bg-[--color-primary]" : "bg-[--color-surface-strong] border border-[--color-hairline]"}`}
      aria-pressed={on}
    >
      <span
        className={`absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow-sm transition-transform ${on ? "translate-x-[20px]" : "translate-x-[2px]"}`}
      />
    </button>
  );
}
