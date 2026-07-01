import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Bell, CreditCard, Users, Shield, Link2, Bot, Palette } from "lucide-react";
import { Card, PageHeader, Btn, Tag } from "@/components/app-shell/AppShell";

export const Route = createFileRoute("/app/settings")({ component: SettingsPage });

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "business", label: "Business", icon: Palette },
  { id: "team", label: "Team", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Link2 },
  { id: "ai", label: "AI Settings", icon: Bot },
  { id: "security", label: "Security", icon: Shield },
];

function SettingsPage() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1200px] mx-auto">
      <PageHeader title="Settings" subtitle="Manage your workspace, team & integrations" />

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-5">
        <Card className="!p-2 h-fit">
          {TABS.map(t => {
            const I = t.icon;
            const active = tab === t.id;
            return (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-2.5 h-9 px-3 rounded-lg text-[13px] font-medium transition ${
                  active ? "bg-[--color-primary-subdued] text-[--color-primary-deep]" : "text-[--color-body] hover:bg-[--color-surface-strong]"
                }`}>
                <I size={15} /> {t.label}
              </button>
            );
          })}
        </Card>

        <Card>
          {tab === "profile" && (
            <div className="space-y-4 max-w-lg">
              <h3 className="text-[15px] font-semibold text-[--color-ink]">Profile</h3>
              <Field label="Full Name" defaultValue="Mike Walker" />
              <Field label="Email" defaultValue="mike@abcplumbing.com" />
              <Field label="Phone" defaultValue="+1 214-555-0100" />
              <Field label="Role" defaultValue="Owner" />
              <div className="flex gap-2 pt-2"><Btn variant="gradient">Save Changes</Btn><Btn variant="ghost">Cancel</Btn></div>
            </div>
          )}
          {tab === "billing" && (
            <div className="space-y-4">
              <h3 className="text-[15px] font-semibold text-[--color-ink]">Plan & Billing</h3>
              <div className="p-4 rounded-xl border border-[--color-primary] bg-[--color-primary-subdued]/40 flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="flex items-center gap-2"><span className="text-[16px] font-semibold text-[--color-ink]">Pro Plan</span><Tag tone="primary">Current</Tag></div>
                  <div className="text-[12px] text-[--color-muted]">$99/mo · Renews Aug 15</div>
                </div>
                <Btn variant="gradient">Upgrade</Btn>
              </div>
              <div className="text-[12px] text-[--color-muted]">Next invoice: <span className="font-semibold text-[--color-ink]">$99.00</span> on Aug 15</div>
            </div>
          )}
          {tab === "integrations" && (
            <div>
              <h3 className="text-[15px] font-semibold text-[--color-ink] mb-4">Integrations</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "Google Business", connected: true },
                  { name: "Stripe", connected: true },
                  { name: "Twilio", connected: true },
                  { name: "QuickBooks", connected: false },
                  { name: "HubSpot", connected: false },
                  { name: "Zapier", connected: true },
                ].map(i => (
                  <div key={i.name} className="flex items-center justify-between p-3 rounded-xl border border-[--color-hairline]">
                    <div className="text-[13px] font-semibold text-[--color-ink]">{i.name}</div>
                    {i.connected ? <Tag tone="success">Connected</Tag> : <Btn size="sm" variant="secondary">Connect</Btn>}
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab !== "profile" && tab !== "billing" && tab !== "integrations" && (
            <div className="py-16 text-center text-[13px] text-[--color-muted]">
              {TABS.find(t => t.id === tab)?.label} settings coming soon.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue?: string }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[--color-body] mb-1.5">{label}</label>
      <input defaultValue={defaultValue} className="w-full h-10 px-3 rounded-lg border border-[--color-hairline] text-[13px] focus:outline-none focus:border-[--color-primary]" />
    </div>
  );
}
