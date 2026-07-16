import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Inbox, Users, Star, CreditCard, Megaphone, Phone,
  Brain, Bot, Mic, Wrench, FileText, Calendar, BarChart3, Sparkles,
  Settings, Search, Bell, Plus, ChevronDown, HelpCircle, Home, MoreHorizontal,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BUSINESS, NOTIFICATIONS } from "@/lib/rs-mocks";
import brandLogo from "@/assets/infinite-rankers-logo.jpg.asset.json";

type NavItem = { to: string; label: string; icon: LucideIcon; badge?: string; badgeTone?: "primary" | "new" };

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "Main",
    items: [
      { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/app/inbox",     label: "Inbox",     icon: Inbox, badge: "3", badgeTone: "primary" },
      { to: "/app/contacts",  label: "Contacts",  icon: Users },
    ],
  },
  {
    section: "Engage",
    items: [
      { to: "/app/reviews",   label: "Reviews",   icon: Star },
      { to: "/app/payments",  label: "Payments",  icon: CreditCard },
      { to: "/app/campaigns", label: "Campaigns", icon: Megaphone },
      { to: "/app/calls",     label: "Calls",     icon: Phone },
    ],
  },
  {
    section: "AI",
    items: [
      { to: "/app/ai-brain",    label: "AI Brain",    icon: Brain, badge: "NEW", badgeTone: "new" },
      { to: "/app/ai-employee", label: "AI Employee", icon: Bot },
      { to: "/app/voice-agent", label: "Voice Agent", icon: Mic },
    ],
  },
  {
    section: "Field Service",
    items: [
      { to: "/app/jobs",     label: "Jobs",     icon: Wrench },
      { to: "/app/quotes",   label: "Quotes",   icon: FileText },
      { to: "/app/calendar", label: "Calendar", icon: Calendar },
    ],
  },
  {
    section: "Insights",
    items: [
      { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/app/ai-search", label: "AI Search", icon: Sparkles, badge: "NEW", badgeTone: "new" },
    ],
  },
];

const MOBILE_TABS = [
  { to: "/app/dashboard", label: "Home",    icon: Home },
  { to: "/app/inbox",     label: "Inbox",   icon: Inbox },
  { to: "/app/reviews",   label: "Reviews", icon: Star },
  { to: "/app/payments",  label: "Pay",     icon: CreditCard },
  { to: "/app/settings",  label: "More",    icon: MoreHorizontal },
];

function pageTitle(path: string) {
  const map: Record<string, string> = {
    "/app/dashboard": "Dashboard",
    "/app/inbox": "Inbox",
    "/app/contacts": "Contacts",
    "/app/reviews": "Reviews",
    "/app/payments": "Payments",
    "/app/campaigns": "Campaigns",
    "/app/calls": "Calls",
    "/app/ai-brain": "AI Brain",
    "/app/ai-employee": "AI Employee",
    "/app/voice-agent": "Voice Agent",
    "/app/jobs": "Jobs",
    "/app/quotes": "Quotes",
    "/app/calendar": "Calendar",
    "/app/analytics": "Analytics",
    "/app/ai-search": "AI Search",
    "/app/settings": "Settings",
  };
  return map[path] ?? "Revenue Sol";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [notifOpen, setNotifOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const expanded = hovered;
  const RAIL_W = 68;
  const FULL_W = 240;
  const sidebarW = expanded ? FULL_W : RAIL_W;
  const collapsed = !expanded;

  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) {
        setNotifOpen(false); setNewOpen(false); setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <div className="app-scope min-h-[100dvh] bg-[--color-canvas] text-[--color-ink]">
      <div className="flex">
        {/* Sidebar — auto-expands on hover */}
        <aside
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col border-r border-[--color-sidebar-border] transition-[width] duration-200 ease-out"
          style={{
            background: "var(--color-sidebar-bg)",
            color: "var(--color-body)",
            width: sidebarW,
            boxShadow: expanded ? "0 20px 48px -12px rgba(15,15,45,0.18)" : undefined,
          }}
        >
          <div className={`h-[60px] flex items-center gap-2.5 shrink-0 border-b border-[--color-sidebar-border] ${collapsed ? "px-0 justify-center" : "px-4"}`}>
            <div className="w-9 h-9 rounded-xl overflow-hidden ring-1 ring-[--color-hairline] bg-white shrink-0 grid place-items-center" style={{ boxShadow: "0 4px 14px -4px rgba(119,56,212,0.35)" }}>
              <img src={brandLogo.url} alt="Infinite Rankers" className="w-full h-full object-cover" />
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1 overflow-hidden">
                <div className="text-[15px] font-bold text-[--color-ink] truncate leading-tight" style={{ fontFamily: "var(--font-display)" }}>Infinite Rankers</div>
                <div className="text-[11px] text-[--color-muted] truncate">{BUSINESS.name}</div>
              </div>
            )}
          </div>


          <nav className="flex-1 overflow-y-auto py-3">
            {NAV.map(sec => (
              <div key={sec.section} className="mb-4">
                {!collapsed && (
                  <div className="px-4 pb-1.5 text-[10px] font-semibold uppercase tracking-widest text-[--color-muted-soft]">
                    {sec.section}
                  </div>
                )}
                {sec.items.map(it => {
                  const active = pathname === it.to || pathname.startsWith(it.to + "/");
                  const I = it.icon;
                  return (
                    <Link
                      key={it.to}
                      to={it.to}
                      title={collapsed ? it.label : undefined}
                      aria-label={it.label}
                      className={`relative my-[1px] rounded-lg text-[13px] font-medium transition-all duration-150 flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary]/40 ${
                        collapsed ? "mx-2 h-10 w-10 justify-center" : "mx-2 h-[38px] px-2.5 gap-2.5"
                      } ${
                        active
                          ? "font-semibold"
                          : "text-[--color-body] hover:bg-[--color-surface-strong] hover:text-[--color-ink]"
                      }`}
                      style={active ? { background: "var(--color-sidebar-active)", color: "var(--color-sidebar-active-text)" } : undefined}
                    >
                      {active && !collapsed && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full" style={{ background: "var(--color-brand-gradient-2)" }} />
                      )}
                      <I size={17} className="shrink-0" />
                      {!collapsed && <span className="flex-1 truncate">{it.label}</span>}
                      {it.badge && !collapsed && (
                        <span
                          className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                            it.badgeTone === "new"
                              ? "bg-emerald-500 text-white shadow-[0_0_0_2px_rgba(16,185,129,0.15)]"
                              : active ? "bg-[--color-primary] text-white" : "bg-[--color-primary-subdued] text-[--color-primary-deep]"
                          }`}
                        >
                          {it.badge}
                        </span>
                      )}
                      {it.badge && collapsed && (
                        <span
                          className={`absolute top-1 right-1 min-w-[8px] h-[8px] rounded-full ${
                            it.badgeTone === "new" ? "bg-emerald-500" : "bg-[--color-primary]"
                          }`}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          <div className={`border-t border-[--color-sidebar-border] shrink-0 ${collapsed ? "py-3 px-2" : "px-3 py-3"}`}>
            <Link
              to="/app/settings"
              title={collapsed ? "Settings" : undefined}
              className={`rounded-lg text-[13px] font-medium text-[--color-body] hover:bg-[--color-surface-strong] hover:text-[--color-ink] mb-2 flex items-center ${
                collapsed ? "h-10 w-10 mx-auto justify-center" : "h-[38px] px-2.5 gap-2.5"
              }`}
            >
              <Settings size={17} /> {!collapsed && "Settings"}
            </Link>

            <div className={`flex items-center ${collapsed ? "justify-center" : "gap-2.5 px-2"}`}>
              <div className="w-8 h-8 rounded-full grid place-items-center text-white text-[12px] font-bold shrink-0" style={{ background: "var(--color-brand-gradient-2)" }} title={collapsed ? BUSINESS.owner : undefined}>
                MW
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-medium text-[--color-ink] truncate leading-tight">{BUSINESS.owner}</div>
                  <div className="text-[11px] text-[--color-muted] truncate">{BUSINESS.role}</div>
                </div>
              )}
            </div>

            {!collapsed && (
              <div className="mt-3 rounded-lg px-3 py-2 flex items-center justify-between gap-2 border border-amber-200" style={{ background: "#FFFBEB" }}>
                <div className="text-[11px] font-semibold text-amber-700">{BUSINESS.trialDaysLeft} days left</div>
                <button className="text-[11px] font-semibold text-amber-800 hover:text-amber-900">Upgrade</button>
              </div>
            )}
          </div>
        </aside>

        {/* Main column */}
        <div
          ref={wrap}
          className="flex-1 min-w-0 flex flex-col transition-[padding] duration-200 ease-out lg:pl-[var(--rs-sbw)]"
          style={{ ["--rs-sbw" as string]: `${sidebarW}px` }}
        >
          {/* Topbar */}
          <header className="h-14 border-b border-[--color-hairline] bg-white sticky top-0 z-30 flex items-center gap-2 sm:gap-3 px-3 sm:px-6">
            <div className="lg:hidden w-8 h-8 rounded-lg grid place-items-center text-white text-[13px] font-bold shrink-0" style={{ background: "var(--color-brand-gradient-2)" }}>
              ⚡
            </div>
            <div className="text-[16px] sm:text-[18px] font-semibold text-[--color-ink] truncate">
              {pageTitle(pathname)}
            </div>

            <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg bg-[--color-surface-strong] flex-1 max-w-[360px] mx-auto text-[13px] text-[--color-muted]">
              <Search size={14} />
              <span className="flex-1 truncate">Search anything...</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white border border-[--color-hairline]">⌘K</span>
            </div>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2 relative">
              {/* + New */}
              <div className="relative">
                <button
                  onClick={() => { setNewOpen(v => !v); setNotifOpen(false); setUserOpen(false); }}
                  className="h-9 px-3 rounded-lg text-[13px] font-medium text-white flex items-center gap-1.5 transition hover:opacity-90 active:scale-[0.97]"
                  style={{ background: "var(--color-brand-gradient-2)" }}
                >
                  <Plus size={14} /> New <ChevronDown size={12} />
                </button>
                {newOpen && (
                  <div className="absolute right-0 top-11 w-56 bg-white border border-[--color-hairline] rounded-xl shadow-xl py-1.5 z-40">
                    {[
                      "New Conversation", "New Contact", "Request Payment",
                      "Send Review Request", "Create Campaign", "Create Job",
                    ].map(l => (
                      <button key={l} className="w-full text-left px-3 py-2 text-[13px] text-[--color-ink] hover:bg-[--color-surface-strong] transition">
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Bell */}
              <div className="relative">
                <button
                  onClick={() => { setNotifOpen(v => !v); setNewOpen(false); setUserOpen(false); }}
                  className="w-9 h-9 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] relative text-[--color-body]"
                >
                  <Bell size={16} />
                  {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[--color-error]" />}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-11 w-[340px] max-w-[92vw] bg-white border border-[--color-hairline] rounded-xl shadow-xl overflow-hidden z-40">
                    <div className="px-4 py-3 border-b border-[--color-hairline] flex items-center justify-between">
                      <div className="text-[13px] font-semibold text-[--color-ink]">Notifications</div>
                      <button className="text-[11px] font-semibold text-[--color-primary]">Mark all read</button>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {NOTIFICATIONS.map(n => (
                        <div key={n.id} className={`px-4 py-2.5 flex gap-3 items-start border-b border-[--color-hairline-soft] last:border-0 ${n.unread ? "bg-[--color-primary-subdued]/40" : ""}`}>
                          <div className="w-8 h-8 rounded-lg grid place-items-center bg-[--color-primary-subdued] text-[--color-primary-deep] text-[13px] shrink-0">
                            {n.icon === "message" ? "💬" : n.icon === "star" ? "⭐" : n.icon === "pay" ? "💰" : n.icon === "call" ? "📞" : n.icon === "ai" ? "🤖" : "🔧"}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-[12.5px] text-[--color-ink] leading-snug">{n.text}</div>
                            <div className="text-[11px] text-[--color-muted] mt-0.5">{n.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className="hidden sm:grid w-9 h-9 rounded-lg place-items-center hover:bg-[--color-surface-strong] text-[--color-body]">
                <HelpCircle size={16} />
              </button>

              {/* Avatar */}
              <div className="relative">
                <button
                  onClick={() => { setUserOpen(v => !v); setNotifOpen(false); setNewOpen(false); }}
                  className="w-9 h-9 rounded-full grid place-items-center text-white text-[12px] font-bold"
                  style={{ background: "var(--color-brand-gradient-2)" }}
                >
                  MW
                </button>
                {userOpen && (
                  <div className="absolute right-0 top-11 w-52 bg-white border border-[--color-hairline] rounded-xl shadow-xl py-1.5 z-40">
                    <div className="px-3 py-2 border-b border-[--color-hairline]">
                      <div className="text-[13px] font-semibold text-[--color-ink]">{BUSINESS.owner}</div>
                      <div className="text-[11px] text-[--color-muted]">mike@abcplumbing.com</div>
                    </div>
                    {[
                      { l: "Profile", href: "/app/settings" },
                      { l: "Settings", href: "/app/settings" },
                      { l: "Billing", href: "/app/settings" },
                      { l: "Help", href: "#" },
                    ].map(({ l, href }) => (
                      <a key={l} href={href} className="block w-full text-left px-3 py-2 text-[13px] text-[--color-ink] hover:bg-[--color-surface-strong] transition">
                        {l}
                      </a>
                    ))}
                    <button
                      onClick={async () => {
                        const { supabase } = await import("@/integrations/supabase/client");
                        await supabase.auth.signOut();
                        window.location.href = "/signin";
                      }}
                      className="w-full text-left px-3 py-2 text-[13px] text-[--color-error] hover:bg-[--color-error-subtle] transition border-t border-[--color-hairline] mt-1"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="min-w-0 pb-24 lg:pb-0">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile bottom tabs */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-white/95 backdrop-blur-md border-t border-[--color-hairline] grid grid-cols-5" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        {MOBILE_TABS.map(t => {
          const active = pathname === t.to || pathname.startsWith(t.to + "/");
          const I = t.icon;
          return (
            <Link key={t.to} to={t.to} className={`relative flex flex-col items-center justify-center gap-0.5 text-[10px] font-semibold transition-colors ${active ? "text-[--color-primary-deep]" : "text-[--color-muted]"}`}>
              {active && <span className="absolute top-0 h-[3px] w-8 rounded-b-full" style={{ background: "var(--color-brand-gradient-2)" }} />}
              <I size={20} strokeWidth={active ? 2.4 : 2} />
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

/* ============================================================
   Shared UI Primitives
============================================================ */
export function PageHeader({
  title, subtitle, actions, eyebrow,
}: { title: string; subtitle?: string; actions?: React.ReactNode; eyebrow?: string }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6 sm:mb-7 flex-wrap animate-in fade-in slide-in-from-bottom-1 duration-300">
      <div className="min-w-0">
        {eyebrow && (
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[--color-primary-deep] mb-1.5">
            {eyebrow}
          </div>
        )}
        <h1 className="text-[24px] sm:text-[28px] font-semibold tracking-tight text-[--color-ink] leading-[1.15]">{title}</h1>
        {subtitle && <p className="text-[13.5px] text-[--color-muted] mt-1.5 max-w-2xl">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0 flex-wrap">{actions}</div>}
    </div>
  );
}

export function Card({
  children, className = "", padded = true, interactive = false, onClick,
}: { children: React.ReactNode; className?: string; padded?: boolean; interactive?: boolean; onClick?: () => void }) {
  const isInteractive = interactive || !!onClick;
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-[--color-hairline] transition-all duration-200 ${
        isInteractive ? "cursor-pointer hover:-translate-y-[2px] hover:border-[--color-primary]/30 hover:shadow-[var(--shadow-elev)]" : ""
      } ${padded ? "p-5" : ""} ${className}`}
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {children}
    </div>
  );
}


export function Tag({
  children, tone = "neutral",
}: { children: React.ReactNode; tone?: "primary" | "success" | "warning" | "danger" | "neutral" | "info" | "ai" }) {
  const tones: Record<string, string> = {
    primary: "bg-[--color-primary-subdued] text-[--color-primary-deep] ring-1 ring-inset ring-[--color-primary]/10",
    success: "bg-[--color-success-subtle] text-[--color-success] ring-1 ring-inset ring-[--color-success]/15",
    warning: "bg-[--color-warning-subtle] text-[--color-warning] ring-1 ring-inset ring-[--color-warning]/15",
    danger:  "bg-[--color-error-subtle] text-[--color-error] ring-1 ring-inset ring-[--color-error]/15",
    info:    "bg-[--color-info-subtle] text-[--color-info] ring-1 ring-inset ring-[--color-info]/15",
    ai:      "bg-[--color-ai-subtle] text-[--color-ai] ring-1 ring-inset ring-[--color-ai]/15",
    neutral: "bg-[--color-surface-strong] text-[--color-body] ring-1 ring-inset ring-[--color-hairline]",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function Btn({
  children, variant = "primary", size = "md", icon,
  onClick, className = "", type = "button", disabled,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "gradient";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) {
  const v: Record<string, string> = {
    primary: "text-white shadow-sm hover:brightness-110",
    gradient: "text-white hover:brightness-110",
    secondary: "bg-white border border-[--color-hairline] text-[--color-ink] hover:bg-[--color-surface-strong] hover:border-[--color-primary]/30",
    ghost: "text-[--color-body] hover:bg-[--color-surface-strong] hover:text-[--color-ink]",
    danger: "text-white hover:brightness-110 shadow-sm",
  };
  const s = size === "sm" ? "h-8 px-3 text-[12px]" : size === "lg" ? "h-11 px-5 text-[14px]" : "h-9 px-4 text-[13px]";
  const style = variant === "gradient"
    ? { background: "var(--color-brand-gradient-2)", boxShadow: "var(--shadow-glow)" }
    : variant === "primary"
    ? { background: "var(--color-primary)" }
    : variant === "danger"
    ? { background: "var(--color-error)" }
    : undefined;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`inline-flex items-center justify-center gap-1.5 font-medium rounded-lg transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-primary]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[--color-canvas] disabled:opacity-50 disabled:pointer-events-none ${v[variant]} ${s} ${className}`}
    >
      {icon}
      {children}
    </button>
  );
}

export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  const init = name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  const palette = ["#EEF2FF", "#F5F3FF", "#EFF6FF", "#F0FDF4", "#FFFBEB"];
  const fg = ["#4F46E5", "#7C3AED", "#2563EB", "#059669", "#B45309"];
  const idx = name.charCodeAt(0) % palette.length;
  return (
    <div
      className="rounded-full grid place-items-center font-semibold shrink-0 ring-1 ring-inset ring-black/[0.04]"
      style={{ width: size, height: size, background: palette[idx], color: fg[idx], fontSize: size * 0.38 }}
    >
      {init}
    </div>
  );
}

export function StatCard({
  label, value, trend, trendTone = "success", icon, iconTone = "primary",
}: {
  label: string; value: string; trend?: string;
  trendTone?: "success" | "warning" | "danger" | "neutral";
  icon?: React.ReactNode;
  iconTone?: "primary" | "success" | "warning" | "danger" | "ai" | "info";
}) {
  const toneColor: Record<string, string> = {
    success: "text-[--color-success]", warning: "text-[--color-warning]",
    danger: "text-[--color-error]", neutral: "text-[--color-muted]",
  };
  const iconBg: Record<string, string> = {
    primary: "bg-[--color-primary-subdued] text-[--color-primary-deep]",
    success: "bg-[--color-success-subtle] text-[--color-success]",
    warning: "bg-[--color-warning-subtle] text-[--color-warning]",
    danger:  "bg-[--color-error-subtle] text-[--color-error]",
    info:    "bg-[--color-info-subtle] text-[--color-info]",
    ai:      "bg-[--color-ai-subtle] text-[--color-ai]",
  };
  return (
    <div
      className="relative bg-white rounded-2xl border border-[--color-hairline] p-5 overflow-hidden transition-all duration-200 hover:-translate-y-[2px] hover:border-[--color-primary]/30 hover:shadow-[var(--shadow-elev)] group"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "var(--color-brand-gradient-2)" }} />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.12em] font-bold text-[--color-muted]">{label}</div>
          <div className="text-[24px] sm:text-[28px] font-semibold tracking-tight mt-1.5 text-[--color-ink] tabular-nums leading-none">{value}</div>
          {trend && <div className={`text-[12px] font-semibold mt-2 ${toneColor[trendTone]}`}>{trend}</div>}
        </div>
        {icon && (
          <div className={`w-10 h-10 rounded-xl grid place-items-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${iconBg[iconTone]}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

export function DataTable({
  headers, rows,
}: { headers: React.ReactNode[]; rows: React.ReactNode[][] }) {
  return (
    <div className="overflow-x-auto -mx-5 sm:mx-0">
      <table className="w-full text-[13px]">
        <thead className="bg-[--color-surface-strong]/40">
          <tr className="border-b border-[--color-hairline]">
            {headers.map((h, i) => (
              <th key={i} className="text-left px-5 py-3 text-[11px] uppercase tracking-[0.12em] font-bold text-[--color-muted] whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-[--color-hairline-soft] hover:bg-[--color-primary-subdued]/25 transition-colors">
              {r.map((c, j) => <td key={j} className="px-5 py-3.5 text-[--color-ink] align-middle">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
