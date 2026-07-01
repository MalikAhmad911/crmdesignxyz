import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Inbox, Users, Calendar, Wrench,
  Sparkles, Wallet, Settings, Search, Bell, Plus, ChevronsLeft,
} from "lucide-react";
import { useState } from "react";
import Logo from "@/assets/infinite-rankers-logo.jpg.asset.json";

type NavItem = { to: string; label: string; icon: LucideIcon; badge?: string };

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "Workspace",
    items: [
      { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/app/inbox",     label: "Inbox",     icon: Inbox, badge: "3" },
      { to: "/app/contacts",  label: "Contacts",  icon: Users },
      { to: "/app/calendar",  label: "Calendar",  icon: Calendar },
      { to: "/app/jobs",      label: "Jobs",      icon: Wrench },
    ],
  },
  {
    section: "Automations",
    items: [
      { to: "/app/ai",    label: "AI surfaces", icon: Sparkles },
      { to: "/app/money", label: "Money",       icon: Wallet },
    ],
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[--color-canvas] text-[--color-ink]">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${collapsed ? "w-[72px]" : "w-[248px]"} shrink-0 border-r border-[--color-hairline] bg-[--color-surface-soft] min-h-screen sticky top-0 flex flex-col transition-[width] duration-200`}
        >
          <div className="h-14 flex items-center gap-2 px-4 border-b border-[--color-hairline]">
            <img src={Logo} alt="Revenue Sol" className="w-8 h-8 rounded-md object-cover" />
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-[13px] font-semibold leading-tight truncate">Reyes HVAC</div>
                <div className="text-[11px] text-[--color-muted] truncate">Pro plan</div>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="ml-auto w-7 h-7 rounded-md grid place-items-center text-[--color-muted] hover:bg-[--color-surface-strong]"
            >
              <ChevronsLeft size={15} className={`transition-transform ${collapsed ? "rotate-180" : ""}`} />
            </button>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
            {NAV.map(sec => (
              <div key={sec.section}>
                {!collapsed && (
                  <div className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-[--color-muted-soft]">
                    {sec.section}
                  </div>
                )}
                <div className="space-y-0.5">
                  {sec.items.map(it => {
                    const active = pathname === it.to || pathname.startsWith(it.to + "/");
                    const I = it.icon;
                    return (
                      <Link
                        key={it.to}
                        to={it.to}
                        className={`flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13px] font-medium transition ${
                          active
                            ? "bg-[--color-ink] text-white"
                            : "text-[--color-body] hover:bg-[--color-surface-strong]"
                        }`}
                      >
                        <I size={16} className="shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="flex-1 truncate">{it.label}</span>
                            {it.badge && (
                              <span
                                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                                  active ? "bg-white/20 text-white" : "bg-[--color-ink] text-white"
                                }`}
                              >
                                {it.badge}
                              </span>
                            )}
                          </>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          <div className="p-3 border-t border-[--color-hairline]">
            <Link
              to="/app/dashboard"
              className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-[13px] text-[--color-body] hover:bg-[--color-surface-strong]"
            >
              <Settings size={16} />
              {!collapsed && <span>Settings</span>}
            </Link>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Topbar */}
          <header className="h-14 border-b border-[--color-hairline] bg-[--color-canvas] sticky top-0 z-20 flex items-center gap-3 px-6">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[--color-surface-soft] border border-[--color-hairline] flex-1 text-[13px] text-[--color-muted]">
                <Search size={14} />
                <span>Search customers, jobs, invoices…</span>
                <span className="ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[--color-hairline]">⌘K</span>
              </div>
            </div>
            <button className="h-9 px-3 rounded-lg text-[13px] font-medium bg-[--color-ink] text-white hover:opacity-90 flex items-center gap-1.5">
              <Plus size={14} /> New
            </button>
            <button className="w-9 h-9 rounded-lg grid place-items-center hover:bg-[--color-surface-soft] relative">
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[--color-brand-lavender] grid place-items-center text-[12px] font-bold text-[--color-ink]">
              MR
            </div>
          </header>

          {children}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Shared UI Primitives (SaaS look, brand palette)
============================================================ */
export function PageHeader({
  title, subtitle, actions,
}: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6 mb-8">
      <div className="min-w-0">
        <h1 className="text-[26px] font-semibold tracking-tight text-[--color-ink]">{title}</h1>
        {subtitle && <p className="text-[13px] text-[--color-muted] mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
    </div>
  );
}

export function Card({
  children, className = "", padded = true,
}: { children: React.ReactNode; className?: string; padded?: boolean }) {
  return (
    <div
      className={`bg-white rounded-2xl border border-[--color-hairline] ${padded ? "p-5" : ""} ${className}`}
      style={{ boxShadow: "0 1px 2px rgba(10,10,10,0.03)" }}
    >
      {children}
    </div>
  );
}

export function Tag({
  children, tone = "neutral",
}: { children: React.ReactNode; tone?: "primary" | "success" | "warning" | "danger" | "neutral" | "info" }) {
  const tones: Record<string, string> = {
    primary: "bg-[--color-brand-lavender]/25 text-[--color-ink]",
    success: "bg-emerald-100 text-emerald-800",
    warning: "bg-amber-100 text-amber-800",
    danger:  "bg-red-100 text-red-800",
    info:    "bg-blue-100 text-blue-800",
    neutral: "bg-[--color-surface-strong] text-[--color-body]",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Btn({
  children, variant = "primary", size = "md", icon,
  onClick, className = "",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const v: Record<string, string> = {
    primary: "bg-[--color-ink] text-white hover:opacity-90",
    secondary: "bg-white border border-[--color-hairline] text-[--color-ink] hover:bg-[--color-surface-soft]",
    ghost: "text-[--color-body] hover:bg-[--color-surface-soft]",
  };
  const s = size === "sm" ? "h-8 px-3 text-[12px]" : "h-9 px-4 text-[13px]";
  return (
    <button onClick={onClick} className={`inline-flex items-center justify-center gap-1.5 font-medium rounded-lg transition ${v[variant]} ${s} ${className}`}>
      {icon}
      {children}
    </button>
  );
}

export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const init = name.split(" ").map(n => n[0]).slice(0, 2).join("");
  const palette = ["#b8a4ed", "#ffb084", "#a4d4c5", "#ff6b5a", "#e8b94a"];
  const bg = palette[name.charCodeAt(0) % palette.length];
  return (
    <div
      className="rounded-full grid place-items-center font-semibold shrink-0 text-[--color-ink]"
      style={{ width: size, height: size, background: bg, fontSize: size * 0.38 }}
    >
      {init}
    </div>
  );
}

export function StatCard({
  label, value, trend, trendTone = "success",
}: { label: string; value: string; trend?: string; trendTone?: "success" | "warning" | "danger" | "neutral" }) {
  const toneColor: Record<string, string> = {
    success: "text-emerald-600", warning: "text-amber-600", danger: "text-red-600", neutral: "text-[--color-muted]",
  };
  return (
    <Card>
      <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted]">{label}</div>
      <div className="text-[28px] font-semibold tracking-tight mt-1 text-[--color-ink]">{value}</div>
      {trend && <div className={`text-[12px] font-medium mt-1 ${toneColor[trendTone]}`}>{trend}</div>}
    </Card>
  );
}
