// Inline SVG / DOM "UI mockups" used inside colored feature panels.
// Pure CSS/markup — no external images, palette-safe.

export function InboxMock() {
  const rows = [
    { name: "Maria H.", channel: "SMS", msg: "Can someone come tomorrow for AC?", time: "2m" },
    { name: "James P.", channel: "Call", msg: "Voicemail · Leaking pipe", time: "8m" },
    { name: "Olivia R.", channel: "Form", msg: "Quote request — roof inspection", time: "14m" },
    { name: "Dan W.", channel: "Review", msg: "★★★★★ Great service", time: "1h" },
  ];
  return (
    <div className="rounded-2xl bg-white shadow-[0_20px_60px_-20px_rgba(10,37,64,0.25)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[color:var(--color-border-soft)] flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--color-border-soft)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--color-border-soft)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[color:var(--color-border-soft)]" />
        <span className="ml-3 text-xs text-[color:var(--color-muted)]">Everything in one inbox</span>
      </div>
      <div className="divide-y divide-[color:var(--color-border-soft)]">
        {rows.map((r) => (
          <div key={r.name} className="px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[color:var(--color-tint)] grid place-items-center text-xs font-semibold text-[color:var(--color-brand)]">
              {r.name.split(" ").map(s=>s[0]).join("")}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[color:var(--color-heading)] truncate">{r.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[color:var(--color-tint)] text-[color:var(--color-brand)]">{r.channel}</span>
              </div>
              <p className="text-xs text-[color:var(--color-muted)] truncate">{r.msg}</p>
            </div>
            <span className="text-[10px] text-[color:var(--color-muted)]">{r.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AgentMock() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-white p-4 shadow-[0_20px_60px_-20px_rgba(10,37,64,0.25)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-[color:var(--color-brand)] grid place-items-center text-white text-xs font-bold">AI</div>
          <span className="text-xs text-[color:var(--color-muted)]">Picks up your phone</span>
        </div>
        <p className="text-sm text-[color:var(--color-heading)]">"Hi! I can get someone out tomorrow at 10am or 2pm — which works better for you?"</p>
      </div>
      <div className="ml-10 rounded-2xl bg-[color:var(--color-tint)] p-4">
        <p className="text-sm text-[color:var(--color-heading)]">10am, please.</p>
      </div>
      <div className="rounded-2xl bg-white p-4 shadow-[0_20px_60px_-20px_rgba(10,37,64,0.25)] flex items-center gap-3">
        <span className="w-8 h-8 grid place-items-center rounded-full bg-[color:var(--color-tint)] text-[color:var(--color-heading)] text-sm">✓</span>
        <div>
          <p className="text-sm font-semibold text-[color:var(--color-heading)]">Booked · Tuesday at 10:00 AM</p>
          <p className="text-xs text-[color:var(--color-muted)]">On the schedule · Confirmation text sent</p>
        </div>
      </div>
    </div>
  );
}

export function AudienceMock() {
  const segs = [
    { label: "Missed calls today", n: 12, color: "var(--color-brand)" },
    { label: "Asked for a quote, never heard back", n: 38, color: "var(--color-violet)" },
    { label: "Loved you 5★ — ask for a referral", n: 64, color: "var(--color-cyan)" },
    { label: "Due for their next tune-up", n: 117, color: "var(--color-sky)" },
  ];
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_20px_60px_-20px_rgba(10,37,64,0.25)]">
      <p className="text-xs text-[color:var(--color-muted)] mb-4">Customer lists that update themselves</p>
      <div className="space-y-3">
        {segs.map((s) => (
          <div key={s.label} className="flex items-center gap-3 p-3 rounded-xl border border-[color:var(--color-border-soft)]">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
            <span className="text-sm text-[color:var(--color-heading)] flex-1">{s.label}</span>
            <span className="text-sm font-semibold text-[color:var(--color-heading)]">{s.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FormattingMock() {
  const rows = [
    ["NETFLIX INC.", "Netflix"],
    ["walmart stores", "Walmart"],
    ["Microsoft Inc.", "Microsoft"],
    ["Walt Disney Studios", "Walt Disney"],
    ["APPLE", "Apple"],
  ];
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_20px_60px_-20px_rgba(10,37,64,0.25)]">
      <div className="grid grid-cols-2 text-xs text-[color:var(--color-muted)] pb-2 border-b border-[color:var(--color-border-soft)]">
        <span>How it came in</span><span>Cleaned up</span>
      </div>
      {rows.map((r) => (
        <div key={r[0]} className="grid grid-cols-2 py-2.5 text-sm border-b border-[color:var(--color-border-soft)] last:border-0">
          <span className="text-[color:var(--color-muted)] truncate">{r[0]}</span>
          <span className="text-[color:var(--color-heading)] font-medium truncate">{r[1]}</span>
        </div>
      ))}
    </div>
  );
}

export function ConditionalMock() {
  const rows = [
    ["maria@hvac…", "Owner", "Send quote"],
    ["—", "Tech",  "Skip"],
    ["yuki@cool…", "Manager", "Send quote"],
  ];
  return (
    <div className="space-y-3">
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[color:var(--color-tint)] text-xs text-[color:var(--color-brand)] font-mono">
        {`!{{Email}} && {{Role}}?.includes("manager")`}
      </div>
      <div className="rounded-2xl bg-white p-5 shadow-[0_20px_60px_-20px_rgba(10,37,64,0.25)]">
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-3 py-2.5 text-sm border-b border-[color:var(--color-border-soft)] last:border-0">
            <span className="text-[color:var(--color-muted)] truncate">{r[0]}</span>
            <span className="text-[color:var(--color-heading)] truncate">{r[1]}</span>
            <span className="text-[color:var(--color-brand)] font-medium truncate">{r[2]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DestinationsMock() {
  const acts = [
    "Add new customer to HubSpot",
    "Send invoice to QuickBooks",
    "Text the customer via Twilio",
    "Schedule the job in ServiceTitan",
    "Add them to your Mailchimp list",
    "Kick off a Zap to do anything else",
  ];
  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_20px_60px_-20px_rgba(10,37,64,0.25)] space-y-2">
      {acts.map((a) => (
        <div key={a} className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-[color:var(--color-border-soft)]">
          <span className="w-7 h-7 rounded-md bg-[color:var(--color-tint)] grid place-items-center text-[color:var(--color-brand)] text-xs">→</span>
          <span className="text-sm text-[color:var(--color-heading)]">{a}</span>
        </div>
      ))}
    </div>
  );
}
