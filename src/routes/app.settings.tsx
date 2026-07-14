import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";

import type { LucideIcon } from "lucide-react";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  UserCircle2, KeyRound, Bell, Globe, Info, Sun, Calendar as CalIcon,
  LifeBuoy, Phone, ChevronRight, Camera, LogOut, CreditCard, Users,
  Link2, Bot, Shield, Palette, Building2, Check, Loader2, Sparkles, Trash2,
} from "lucide-react";
import { PageHeader, Btn, Tag } from "@/components/app-shell/AppShell";
import { BUSINESS } from "@/lib/rs-mocks";
import { getAccount, setAccount, useAccount } from "@/lib/account-store";
import { supabase } from "@/integrations/supabase/client";
import {
  getMyPreferences, savePreferences,
  DEFAULT_PREFERENCES, type Preferences,
} from "@/lib/preferences.functions";
import { Switch } from "@/components/ui/switch";

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
      { id: "preferences", label: "App Preferences", icon: Sparkles },
      { id: "about",       label: "About Us",       icon: Info },
      { id: "theme",       label: "Theme",          icon: Sun, meta: "Light" },
      { id: "appointments",label: "Appointments",   icon: CalIcon },
      { id: "appearance",  label: "Appearance",     icon: Palette },
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
        <AvatarUploader initials={initials} avatarUrl={acc.avatarUrl} />

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

function AvatarUploader({ initials, avatarUrl }: { initials: string; avatarUrl?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const onPick = () => inputRef.current?.click();

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setError("Image must be under 3 MB.");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result || "");
      if (url) setAccount({ avatarUrl: url });
    };
    reader.readAsDataURL(file);
  };

  const onRemove = () => {
    setError(null);
    setAccount({ avatarUrl: undefined });
  };

  return (
    <div className="relative shrink-0">
      <div
        className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden grid place-items-center text-white text-[22px] font-bold ring-4 ring-white"
        style={{ background: "var(--color-brand-gradient-2)", boxShadow: "var(--shadow-glow)" }}
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <span>{initials}</span>
        )}
      </div>

      <button
        type="button"
        onClick={onPick}
        aria-label="Change photo"
        className="absolute -bottom-0.5 -right-0.5 w-7 h-7 rounded-full bg-white border border-[--color-hairline] grid place-items-center text-[--color-body] hover:text-[--color-primary-deep] transition"
      >
        <Camera size={13} />
      </button>

      {avatarUrl && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Remove photo"
          className="absolute -top-0.5 -right-0.5 w-6 h-6 rounded-full bg-white border border-[--color-hairline] grid place-items-center text-[--color-error] hover:bg-[--color-error-subtle] transition"
        >
          <Trash2 size={12} />
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFile}
      />

      {error && (
        <div className="absolute left-0 top-full mt-1 whitespace-nowrap text-[11px] text-[--color-error]">
          {error}
        </div>
      )}
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

      {(id === "notifications" || id === "preferences") && <PreferencesPanel focus={id} />}

      {!["profile", "billing", "integrations", "notifications", "preferences"].includes(id) && (
        <div className="py-10 text-center text-[13px] text-[--color-muted]">
          {row.label} settings coming soon.
        </div>
      )}
    </div>
  );
}

/* ---------------- Preferences panel (real toggles, server-persisted) ---------------- */

type Section = "notifications" | "appearance" | "ai";

function PreferencesPanel({ focus }: { focus: string }) {
  const [session, setSession] = useState<{ userId: string } | null | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setSession(data.user ? { userId: data.user.id } : null);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s?.user ? { userId: s.user.id } : null);
    });
    return () => { sub.subscription.unsubscribe(); };
  }, []);

  if (session === undefined) {
    return (
      <div className="py-10 flex items-center justify-center gap-2 text-[13px] text-[--color-muted]">
        <Loader2 size={14} className="animate-spin" /> Loading preferences…
      </div>
    );
  }

  if (session === null) {
    return (
      <div className="rounded-xl border border-dashed border-[--color-hairline] p-6 text-center">
        <div className="text-[14px] font-semibold text-[--color-ink] mb-1">Sign in to sync your preferences</div>
        <p className="text-[12.5px] text-[--color-muted] mb-4 max-w-sm mx-auto">
          Your notification, appearance, and AI toggles are saved to your account so they follow you across devices.
        </p>
        <a href="/signin" className="inline-flex">
          <Btn variant="gradient" size="sm">Sign in</Btn>
        </a>
      </div>
    );
  }

  return <PreferencesForm focus={focus === "preferences" ? "notifications" : "notifications"} />;
}

type ToggleRow = { key: keyof Preferences; label: string; hint: string };
const SECTIONS: Record<Section, { title: string; rows: ToggleRow[] }> = {
  notifications: {
    title: "Notifications",
    rows: [
      { key: "email_notifications", label: "Email notifications", hint: "New leads, replies, invoices" },
      { key: "push_notifications",  label: "Push notifications",  hint: "Live call & job updates on your devices" },
      { key: "sms_alerts",          label: "SMS alerts",          hint: "Only for urgent AI escalations" },
      { key: "weekly_digest",       label: "Weekly digest",       hint: "Every Monday, 8am" },
      { key: "marketing_emails",    label: "Product & marketing", hint: "Occasional product news" },
    ],
  },
  appearance: {
    title: "Appearance",
    rows: [
      { key: "compact_mode",  label: "Compact mode",  hint: "Tighter spacing across the app" },
      { key: "sound_effects", label: "Sound effects", hint: "Play sounds for new messages" },
    ],
  },
  ai: {
    title: "AI & Automation",
    rows: [
      { key: "auto_reply_enabled", label: "Auto-reply", hint: "Let AI respond to first-touch messages" },
      { key: "ai_suggestions",     label: "AI suggestions", hint: "Show AI-drafted replies in the inbox" },
    ],
  },
};

function PreferencesForm({ focus: _focus }: { focus: Section }) {
  const qc = useQueryClient();
  const getFn = useServerFn(getMyPreferences);
  const saveFn = useServerFn(savePreferences);

  const { data, isLoading, error } = useQuery({
    queryKey: ["preferences"],
    queryFn: () => getFn(),
  });

  const mutation = useMutation({
    mutationFn: (patch: Partial<Preferences>) => saveFn({ data: patch }),
    onMutate: async (patch) => {
      await qc.cancelQueries({ queryKey: ["preferences"] });
      const prev = qc.getQueryData<Preferences>(["preferences"]);
      if (prev) qc.setQueryData<Preferences>(["preferences"], { ...prev, ...patch });
      return { prev };
    },
    onError: (_err, _patch, ctx) => {
      if (ctx?.prev) qc.setQueryData(["preferences"], ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["preferences"] });
    },
  });

  if (isLoading) {
    return (
      <div className="py-10 flex items-center justify-center gap-2 text-[13px] text-[--color-muted]">
        <Loader2 size={14} className="animate-spin" /> Loading preferences…
      </div>
    );
  }
  if (error) {
    return <div className="py-4 text-[13px] text-[--color-error]">Couldn't load preferences. Try again.</div>;
  }

  const prefs: Preferences = data ?? DEFAULT_PREFERENCES;

  return (
    <div className="space-y-6">
      {(Object.keys(SECTIONS) as Section[]).map((sec) => (
        <section key={sec}>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[--color-muted] mb-2">
            {SECTIONS[sec].title}
          </div>
          <div className="rounded-xl border border-[--color-hairline] overflow-hidden">
            {SECTIONS[sec].rows.map((r, i) => (
              <div
                key={r.key}
                className={`flex items-center justify-between gap-3 px-4 py-3 ${
                  i > 0 ? "border-t border-[--color-hairline-soft]" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="text-[13.5px] font-semibold text-[--color-ink]">{r.label}</div>
                  <div className="text-[12px] text-[--color-muted] truncate">{r.hint}</div>
                </div>
                <Switch
                  checked={Boolean(prefs[r.key])}
                  onCheckedChange={(v) => mutation.mutate({ [r.key]: v } as Partial<Preferences>)}
                  aria-label={r.label}
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Theme + language selects */}
      <section>
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[--color-muted] mb-2">
          Display
        </div>
        <div className="rounded-xl border border-[--color-hairline] overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <div>
              <div className="text-[13.5px] font-semibold text-[--color-ink]">Theme</div>
              <div className="text-[12px] text-[--color-muted]">Match your system or pick manually</div>
            </div>
            <select
              value={prefs.theme}
              onChange={(e) => mutation.mutate({ theme: e.target.value as Preferences["theme"] })}
              className="h-9 px-2.5 rounded-lg border border-[--color-hairline] bg-white text-[13px] text-[--color-ink] focus:outline-none focus:border-[--color-primary]"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-[--color-hairline-soft]">
            <div>
              <div className="text-[13.5px] font-semibold text-[--color-ink]">Language</div>
              <div className="text-[12px] text-[--color-muted]">Interface language</div>
            </div>
            <select
              value={prefs.language}
              onChange={(e) => mutation.mutate({ language: e.target.value })}
              className="h-9 px-2.5 rounded-lg border border-[--color-hairline] bg-white text-[13px] text-[--color-ink] focus:outline-none focus:border-[--color-primary]"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="pt">Português</option>
            </select>
          </div>
        </div>
      </section>

      <div className="flex items-center gap-2 text-[12px] text-[--color-muted]">
        {mutation.isPending ? (
          <><Loader2 size={12} className="animate-spin" /> Saving…</>
        ) : mutation.isSuccess ? (
          <><Check size={12} className="text-[--color-success]" /> All changes saved</>
        ) : mutation.isError ? (
          <span className="text-[--color-error]">Failed to save — try again.</span>
        ) : (
          <>Changes save automatically to your account.</>
        )}
      </div>
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
