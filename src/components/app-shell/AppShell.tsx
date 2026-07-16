import { Link, useRouterState } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard, Inbox, Users, Building2, Wrench, Calendar,
  Mic, Zap, Megaphone, CreditCard, FileText, Star, Sparkles,
  BarChart3, LineChart, Plug, UsersRound, Settings, Search, Bell,
  Plus, ChevronDown, Home, MoreHorizontal, CheckSquare,
  PanelLeftClose, PanelLeftOpen, Moon, Sun, ChevronsUpDown, Command,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NOTIFICATIONS } from "@/lib/rs-mocks";

type NavItem = { to: string; label: string; icon: LucideIcon; badge?: string; badgeTone?: "primary" | "new" | "count" };

const NAV: { section: string; items: NavItem[] }[] = [
  {
    section: "Workspace",
    items: [
      { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/app/inbox",     label: "Inbox",     icon: Inbox, badge: "3", badgeTone: "count" },
      { to: "/app/contacts",  label: "Contacts",  icon: Users },
      { to: "/app/contacts",  label: "Companies", icon: Building2 },
    ],
  },
  {
    section: "Operations",
    items: [
      { to: "/app/jobs",     label: "Jobs",     icon: Wrench },
      { to: "/app/calendar", label: "Calendar", icon: Calendar },
      { to: "/app/quotes",   label: "Invoices", icon: FileText },
      { to: "/app/payments", label: "Payments", icon: CreditCard },
    ],
  },
  {
    section: "AI",
    items: [
      { to: "/app/voice-agent", label: "Voice AI",     icon: Mic, badge: "LIVE", badgeTone: "new" },
      { to: "/app/ai-employee", label: "Automations", icon: Zap },
      { to: "/app/campaigns",   label: "Campaigns",   icon: Megaphone },
      { to: "/app/ai-search",   label: "AI Search",   icon: Sparkles, badge: "NEW", badgeTone: "new" },
    ],
  },
  {
    section: "Growth",
    items: [
      { to: "/app/reviews",   label: "Reviews",   icon: Star },
      { to: "/app/campaigns", label: "Marketing", icon: Megaphone },
      { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/app/analytics", label: "Reports",   icon: LineChart },
    ],
  },
  {
    section: "Setup",
    items: [
      { to: "/app/settings", label: "Integrations", icon: Plug },
      { to: "/app/settings", label: "Team",         icon: UsersRound },
      { to: "/app/settings", label: "Settings",     icon: Settings },
    ],
  },
];

const MOBILE_TABS = [
  { to: "/app/dashboard", label: "Home",    icon: Home },
  { to: "/app/inbox",     label: "Inbox",   icon: Inbox },
  { to: "/app/voice-agent", label: "Voice", icon: Mic },
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
    "/app/ai-employee": "Automations",
    "/app/voice-agent": "Voice AI",
    "/app/jobs": "Jobs",
    "/app/quotes": "Invoices",
    "/app/calendar": "Calendar",
    "/app/analytics": "Analytics",
    "/app/ai-search": "AI Search",
    "/app/settings": "Settings",
  };
  return map[path] ?? "RevenueSol";
}

/* Brand mark — RevenueSol gradient wordmark logo (no external asset) */
function BrandMark({ size = 36 }: { size?: number }) {
  return (
    <div
      className="grid shrink-0 place-items-center rounded-xl text-white font-bold"
      style={{
        width: size, height: size,
        background: "var(--color-brand-gradient-2)",
        boxShadow: "0 6px 18px -6px rgba(99,91,255,0.55)",
        fontFamily: "var(--font-display)",
        fontSize: size * 0.44,
        letterSpacing: "-0.03em",
      }}
    >
      R
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: s => s.location.pathname });
  const [notifOpen, setNotifOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [wsOpen, setWsOpen] = useState(false);
  const [tasksOpen, setTasksOpen] = useState(false);
  const [pinned, setPinned] = useState(true);      // explicit collapse toggle
  const [hovered, setHovered] = useState(false);
  const [dark, setDark] = useState(false);

  const expanded = pinned || hovered;
  const RAIL_W = 68;
  const FULL_W = 248;
  const sidebarW = expanded ? FULL_W : RAIL_W;
  const collapsed = !expanded;

  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) {
        setNotifOpen(false); setNewOpen(false); setUserOpen(false); setWsOpen(false); setTasksOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <div className="app-scope min-h-[100dvh] bg-[--color-canvas] text-[--color-ink]">
      <div className="flex">
        {/* Sidebar */}
        <aside
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="hidden lg:flex fixed inset-y-0 left-0 z-40 flex-col border-r border-[--color-sidebar-border] transition-[width] duration-200 ease-out"
          style={{
            background: "var(--color-sidebar-bg)",
            color: "var(--color-body)",
            width: sidebarW,
            boxShadow: expanded && !pinned ? "0 20px 48px -12px rgba(10,37,64,0.14)" : undefined,
          }}
        >
          {/* Workspace switcher */}
          <div className={`h-[60px] flex items-center gap-2.5 shrink-0 border-b border-[--color-sidebar-border] ${collapsed ? "px-0 justify-center" : "px-3"}`}>
            {collapsed ? (
              <BrandMark size={36} />
            ) : (
              <button
                onClick={() => setWsOpen(v => !v)}
                className="flex-1 min-w-0 flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-[--color-surface-strong] transition"
              >
                <BrandMark size={32} />
                <div className="min-w-0 flex-1 text-left">
                  <div className="text-[13.5px] font-bold text-[--color-ink] truncate leading-tight" style={{ fontFamily: "var(--font-display)" }}>
                    RevenueSol
                  </div>
                  <div className="text-[11px] text-[--color-muted] truncate">Malik's Workshop</div>
                </div>
                <ChevronsUpDown size={14} className="text-[--color-muted-soft] shrink-0" />
              </button>
            )}
          </div>

          {/* Nav */}
          <nav className="flex-1 overflow-y-auto py-3">
            {NAV.map(sec => (
              <div key={sec.section} className="mb-4">
                {!collapsed && (
                  <div className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[--color-muted-soft]">
                    {sec.section}
                  </div>
                )}
                {sec.items.map(it => {
                  const active = pathname === it.to;
                  const I = it.icon;
                  return (
                    <Link
                      key={sec.section + it.label}
                      to={it.to}
                      title={collapsed ? it.label : undefined}
                      aria-label={it.label}
                      data-nav-item
                      data-active={active ? "true" : "false"}
                      className={`relative my-[1px] rounded-lg text-[13px] font-medium flex items-center ${
                        collapsed ? "mx-2 h-10 w-10 justify-center" : "mx-2 h-9 px-2.5 gap-2.5"
                      } ${active ? "" : "text-[--color-body]"}`}
                    >
                      {active && !collapsed && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full" style={{ background: "var(--color-brand-gradient-2)" }} />
                      )}
                      <I size={16.5} className="shrink-0" strokeWidth={active ? 2.25 : 1.85} />
                      {!collapsed && <span className="flex-1 truncate">{it.label}</span>}
                      {it.badge && !collapsed && (
                        <span
                          className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded-full ${
                            it.badgeTone === "new"
                              ? "text-white"
                              : "bg-[--color-primary-subdued] text-[--color-primary-deep]"
                          }`}
                          style={it.badgeTone === "new" ? { background: "var(--color-brand-gradient-2)" } : undefined}
                        >
                          {it.badge}
                        </span>
                      )}
                      {it.badge && collapsed && (
                        <span className="absolute top-1 right-1 min-w-[7px] h-[7px] rounded-full" style={{ background: "var(--color-brand-gradient-2)" }} />
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </nav>

          {/* Collapse toggle + user */}
          <div className={`border-t border-[--color-sidebar-border] shrink-0 ${collapsed ? "py-3 px-2" : "px-3 py-3"}`}>
            <button
              onClick={() => setPinned(v => !v)}
              title={pinned ? "Collapse sidebar" : "Expand sidebar"}
              className={`rounded-lg text-[13px] font-medium text-[--color-body] hover:bg-[--color-surface-strong] hover:text-[--color-ink] mb-2 flex items-center ${
                collapsed ? "h-9 w-9 mx-auto justify-center" : "h-9 px-2.5 gap-2.5 w-full"
              }`}
            >
              {pinned ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
              {!collapsed && <span className="flex-1 text-left">Collapse</span>}
              {!collapsed && <span className="text-[10px] font-mono text-[--color-muted-soft]">⌘\</span>}
            </button>

            <div className={`flex items-center rounded-lg ${collapsed ? "justify-center" : "gap-2.5 px-2 py-1.5 hover:bg-[--color-surface-strong] cursor-pointer transition"}`}>
              <div className="w-8 h-8 rounded-full grid place-items-center text-white text-[12px] font-bold shrink-0" style={{ background: "var(--color-brand-gradient-2)" }}>
                MA
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <div className="text-[12.5px] font-semibold text-[--color-ink] truncate leading-tight">Malik Ahmad</div>
                  <div className="text-[11px] text-[--color-muted] truncate">malik@revenuesol.com</div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div
          ref={wrap}
          className="flex-1 min-w-0 flex flex-col transition-[padding] duration-200 ease-out lg:pl-[var(--rs-sbw)]"
          style={{ ["--rs-sbw" as string]: `${sidebarW}px` }}
        >
          {/* Command bar */}
          <header className="h-14 border-b border-[--color-hairline] bg-white/85 backdrop-blur-xl sticky top-0 z-30 flex items-center gap-2 sm:gap-3 px-3 sm:px-6">
            <div className="lg:hidden">
              <BrandMark size={30} />
            </div>
            <div className="text-[15px] sm:text-[16px] font-semibold text-[--color-ink] truncate" style={{ fontFamily: "var(--font-display)" }}>
              {pageTitle(pathname)}
            </div>

            {/* Command palette pill (⌘K) */}
            <button className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg bg-[--color-surface-strong] border border-transparent hover:border-[--color-hairline] flex-1 max-w-[420px] mx-auto text-[13px] text-[--color-muted] transition">
              <Search size={14} />
              <span className="flex-1 text-left truncate">Search jobs, contacts, invoices…</span>
              <span className="flex items-center gap-0.5 text-[10.5px] font-mono px-1.5 py-0.5 rounded bg-white border border-[--color-hairline] text-[--color-body]">
                <Command size={10} /> K
              </span>
            </button>

            <div className="ml-auto flex items-center gap-1 sm:gap-1.5 relative">
              {/* Quick Add */}
              <div className="relative">
                <button
                  onClick={() => { setNewOpen(v => !v); setNotifOpen(false); setUserOpen(false); setTasksOpen(false); }}
                  className="h-9 px-3 rounded-lg text-[13px] font-semibold text-white flex items-center gap-1.5 transition hover:brightness-110"
                  style={{ background: "var(--color-brand-gradient-2)", boxShadow: "0 4px 14px -4px rgba(99,91,255,0.55)" }}
                >
                  <Plus size={14} /> <span className="hidden sm:inline">Quick add</span>
                  <ChevronDown size={12} className="opacity-70" />
                </button>
                {newOpen && (
                  <div className="absolute right-0 top-11 w-64 bg-white border border-[--color-hairline] rounded-xl shadow-xl py-1.5 z-40 animate-scale-in">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[--color-muted-soft]">Create</div>
                    {[
                      { l: "New Contact", k: "C" },
                      { l: "Book Appointment", k: "A" },
                      { l: "Generate Invoice", k: "I" },
                      { l: "Start Campaign", k: "M" },
                      { l: "Create AI Agent", k: "G" },
                      { l: "Send SMS", k: "S" },
                      { l: "Make Call", k: "P" },
                    ].map(({ l, k }) => (
                      <button key={l} className="w-full flex items-center justify-between px-3 py-2 text-[13px] text-[--color-ink] hover:bg-[--color-surface-strong] transition">
                        <span>{l}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[--color-surface-strong] text-[--color-muted]">⌘{k}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* AI Assistant */}
              <button
                aria-label="AI assistant"
                className="hidden sm:grid w-9 h-9 rounded-lg place-items-center hover:bg-[--color-surface-strong] text-[--color-primary-deep] relative"
              >
                <Sparkles size={16} />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-brand-gradient-2)" }} />
              </button>

              {/* Tasks */}
              <div className="relative">
                <button
                  onClick={() => { setTasksOpen(v => !v); setNotifOpen(false); setNewOpen(false); setUserOpen(false); }}
                  aria-label="Tasks"
                  className="hidden sm:grid w-9 h-9 rounded-lg place-items-center hover:bg-[--color-surface-strong] text-[--color-body] relative"
                >
                  <CheckSquare size={16} />
                  <span className="absolute top-1.5 right-1.5 text-[8.5px] font-bold px-1 py-px rounded bg-[--color-primary] text-white leading-none">4</span>
                </button>
                {tasksOpen && (
                  <div className="absolute right-0 top-11 w-[320px] bg-white border border-[--color-hairline] rounded-xl shadow-xl overflow-hidden z-40">
                    <div className="px-4 py-3 border-b border-[--color-hairline] text-[13px] font-semibold text-[--color-ink]">Today's tasks</div>
                    {[
                      "Call Sarah Jenkins re: HVAC quote",
                      "Approve AI-drafted invoice #1042",
                      "Review Voice AI transcript · Mike T.",
                      "Send follow-up SMS to 3 hot leads",
                    ].map((t, i) => (
                      <label key={i} className="flex items-start gap-2.5 px-4 py-2.5 border-b border-[--color-hairline-soft] last:border-0 cursor-pointer hover:bg-[--color-surface-strong] transition">
                        <input type="checkbox" className="mt-0.5 accent-[--color-primary-deep]" />
                        <span className="text-[12.5px] text-[--color-ink] leading-snug">{t}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => { setNotifOpen(v => !v); setNewOpen(false); setUserOpen(false); setTasksOpen(false); }}
                  aria-label="Notifications"
                  className="w-9 h-9 rounded-lg grid place-items-center hover:bg-[--color-surface-strong] relative text-[--color-body]"
                >
                  <Bell size={16} />
                  {unreadCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[--color-error]" />}
                </button>
                {notifOpen && (
                  <div className="absolute right-0 top-11 w-[340px] max-w-[92vw] bg-white border border-[--color-hairline] rounded-xl shadow-xl overflow-hidden z-40">
                    <div className="px-4 py-3 border-b border-[--color-hairline] flex items-center justify-between">
                      <div className="text-[13px] font-semibold text-[--color-ink]">Notifications</div>
                      <button className="text-[11px] font-semibold text-[--color-primary-deep]">Mark all read</button>
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

              {/* Dark / light */}
              <button
                onClick={() => setDark(v => !v)}
                aria-label="Toggle theme"
                className="hidden sm:grid w-9 h-9 rounded-lg place-items-center hover:bg-[--color-surface-strong] text-[--color-body]"
              >
                {dark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Avatar */}
              <div className="relative">
                <button
                  onClick={() => { setUserOpen(v => !v); setNotifOpen(false); setNewOpen(false); setTasksOpen(false); }}
                  className="w-9 h-9 rounded-full grid place-items-center text-white text-[12px] font-bold ring-2 ring-white"
                  style={{ background: "var(--color-brand-gradient-2)" }}
                >
                  MA
                </button>
                {userOpen && (
                  <div className="absolute right-0 top-11 w-56 bg-white border border-[--color-hairline] rounded-xl shadow-xl py-1.5 z-40">
                    <div className="px-3 py-2.5 border-b border-[--color-hairline]">
                      <div className="text-[13px] font-semibold text-[--color-ink]">Malik Ahmad</div>
                      <div className="text-[11px] text-[--color-muted]">malik@revenuesol.com</div>
                    </div>
                    {[
                      { l: "Profile", href: "/app/settings" },
                      { l: "Workspace settings", href: "/app/settings" },
                      { l: "Billing", href: "/app/settings" },
                      { l: "Keyboard shortcuts", href: "#" },
                      { l: "Help & docs", href: "#" },
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
          const active = pathname === t.to;
          const I = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex flex-col items-center justify-center gap-0.5 text-[10.5px] font-medium ${
                active ? "text-[--color-primary-deep]" : "text-[--color-muted]"
              }`}
            >
              <I size={19} strokeWidth={active ? 2.4 : 1.9} />
              {t.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
