import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, Card, Btn, Tag, Avatar } from "@/components/app-shell/AppShell";
import { Sparkles, PhoneCall, MessageSquare, CalendarCheck, Star, Send, CheckCircle2, Bot, Radio } from "lucide-react";

export const Route = createFileRoute("/app/ai")({
  head: () => ({ meta: [{ title: "AI surfaces · Revenue Sol" }] }),
  component: AIPage,
});

type Tab = "employee" | "brain" | "voice";

function AIPage() {
  const [tab, setTab] = useState<Tab>("employee");
  return (
    <div className="p-8 max-w-[1440px] w-full">
      <PageHeader
        title="AI surfaces"
        subtitle="Your always-on operations team"
        actions={<Btn variant="secondary">View activity log</Btn>}
      />

      <div className="flex gap-1 border-b border-[--color-hairline] mb-6">
        {([
          { k: "employee", l: "AI Employee", i: Bot },
          { k: "brain",    l: "AI Brain",    i: Sparkles },
          { k: "voice",    l: "Voice AI",    i: Radio },
        ] as const).map(t => {
          const I = t.i;
          const on = tab === t.k;
          return (
            <button key={t.k} onClick={() => setTab(t.k)}
              className={`flex items-center gap-2 px-4 py-2.5 text-[13px] font-semibold border-b-2 -mb-px transition ${
                on ? "border-[--color-ink] text-[--color-ink]" : "border-transparent text-[--color-muted] hover:text-[--color-body]"
              }`}
            >
              <I size={14} /> {t.l}
            </button>
          );
        })}
      </div>

      {tab === "employee" && <Employee />}
      {tab === "brain"    && <Brain />}
      {tab === "voice"    && <Voice />}
    </div>
  );
}

function Employee() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2 bg-[--color-surface-dark] border-transparent text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl grid place-items-center bg-white/10">
            <Sparkles size={22} />
          </div>
          <div>
            <div className="text-[16px] font-semibold">All systems normal</div>
            <div className="text-[12px] text-white/60">42 tasks handled today · 7 waiting for approval</div>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-emerald-300 font-semibold">LIVE</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {[[MessageSquare,"28","Replies"],[PhoneCall,"12","Calls"],[CalendarCheck,"9","Bookings"],[Star,"4","Reviews"]].map(([I,v,l]:any,i) => (
            <div key={i} className="rounded-xl p-3 bg-white/5">
              <I size={14} className="text-white/60" />
              <div className="text-[20px] font-semibold mt-1">{v}</div>
              <div className="text-[10px] text-white/50">{l}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="text-[13px] font-semibold mb-3">Knowledge base</div>
        <div className="space-y-2.5 text-[12px]">
          {[["Website pages","42"],["FAQs","128"],["Service prices","34"],["Last refresh","Today 8:14 AM"]].map(([k,v]) => (
            <div key={k} className="flex justify-between">
              <span className="text-[--color-muted]">{k}</span>
              <span className="font-medium">{v}</span>
            </div>
          ))}
        </div>
        <Btn variant="secondary" size="sm" className="w-full mt-4">Manage sources</Btn>
      </Card>

      <Card className="lg:col-span-2">
        <div className="text-[13px] font-semibold mb-4">Auto-reply settings</div>
        <div className="divide-y divide-[--color-hairline]">
          {[
            ["Answer inbound calls", "24/7 AI receptionist", true],
            ["Reply to missed calls", "SMS in <60 seconds", true],
            ["Reply to webchat", "Book jobs directly", true],
            ["Ask for reviews after job", "After 'complete' status", false],
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <div className="flex-1">
                <div className="text-[13px] font-medium">{t[0]}</div>
                <div className="text-[11px] text-[--color-muted]">{t[1]}</div>
              </div>
              <div className={`w-10 h-6 rounded-full p-0.5 transition ${t[2] ? "bg-[--color-ink]" : "bg-[--color-hairline]"}`}>
                <div className={`w-5 h-5 rounded-full bg-white transition ${t[2] ? "ml-4" : ""}`} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="text-[13px] font-semibold mb-3">Approval queue</div>
        <div className="space-y-3">
          {[
            { t: "Reply to Priya Rao", d: "3pm confirmation" },
            { t: "Quote for Jordan Pike", d: "$980 repipe" },
          ].map((q, i) => (
            <div key={i} className="rounded-xl p-3 border border-[--color-brand-lavender]/40 bg-[--color-brand-lavender]/10">
              <div className="text-[12px] font-semibold">{q.t}</div>
              <div className="text-[11px] text-[--color-muted] mb-2">{q.d}</div>
              <div className="flex gap-1.5">
                <Btn size="sm">Approve</Btn>
                <Btn size="sm" variant="ghost">Skip</Btn>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Brain() {
  const examples = [
    "Text every unpaid invoice from last week a friendly reminder.",
    "Book Priya at 3pm and confirm by SMS.",
    "Draft review replies for anything ≥4 stars from Google this week.",
    "Follow up with all leads that haven't heard from us in 48 hours.",
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg grid place-items-center bg-[--color-ink] text-white">
            <Sparkles size={14} />
          </div>
          <div>
            <div className="text-[15px] font-semibold">Command center</div>
            <div className="text-[11px] text-[--color-muted]">Give AI any task in plain English</div>
          </div>
        </div>
        <div className="rounded-xl border border-[--color-hairline] bg-[--color-surface-soft]/50 p-4">
          <textarea
            placeholder="Ask AI to do anything — draft, book, send, follow up…"
            className="w-full h-28 bg-transparent text-[14px] resize-none focus:outline-none placeholder:text-[--color-muted]"
            defaultValue=""
          />
          <div className="flex items-center justify-between mt-2">
            <div className="text-[11px] text-[--color-muted]">AI will show a plan before it acts</div>
            <Btn icon={<Send size={13} />}>Plan it</Btn>
          </div>
        </div>

        <div className="mt-6">
          <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted] mb-2">Plan preview</div>
          <div className="rounded-xl border border-[--color-hairline] p-4 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <Tag tone="warning">Approval required</Tag>
              <span className="text-[11px] text-[--color-muted]">Affects ~12 customers</span>
            </div>
            {[
              "Find invoices marked 'sent' or 'overdue' in the last 7 days",
              "Compose personalized SMS using customer name and amount",
              "Skip anyone who paid in the last 24 hours",
              "Send via Twilio at 10:00 AM local time",
            ].map((s, i) => (
              <div key={i} className="flex items-start gap-2 text-[12px]">
                <CheckCircle2 size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                <span>{s}</span>
              </div>
            ))}
            <div className="flex gap-2 pt-3">
              <Btn>Approve & run</Btn>
              <Btn variant="secondary">Edit</Btn>
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-[13px] font-semibold mb-3">Try an example</div>
        <div className="space-y-2">
          {examples.map(e => (
            <button key={e} className="w-full text-left p-3 rounded-lg bg-[--color-surface-soft] text-[12px] font-medium hover:bg-[--color-surface-strong] transition">
              {e}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Voice() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl grid place-items-center bg-emerald-100 text-emerald-700">
            <PhoneCall size={22} />
          </div>
          <div>
            <div className="text-[16px] font-semibold">Live</div>
            <div className="text-[11px] text-[--color-muted]">(512) 555-0199</div>
          </div>
          <Tag tone="success">98%</Tag>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[--color-hairline]">
          {[["12","Answered"],["9","Booked"],["2","Voicemail"]].map(([v,l]) => (
            <div key={l}>
              <div className="text-[20px] font-semibold">{v}</div>
              <div className="text-[10px] text-[--color-muted]">{l}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="lg:col-span-2">
        <div className="text-[13px] font-semibold mb-3">Recent AI calls</div>
        <div className="divide-y divide-[--color-hairline]">
          {[
            { n: "Priya Rao",    d: "1:42", s: "Booked 3pm AC diagnostic.",                t: "12m" },
            { n: "Unknown",      d: "0:34", s: "Voicemail — wants estimate for repipe.",   t: "42m" },
            { n: "Jordan Pike",  d: "2:11", s: "Rescheduled to Wed 4pm.",                  t: "2h" },
            { n: "Alicia Weber", d: "0:58", s: "Transferred to on-call.",                   t: "yday" },
          ].map((c, i) => (
            <div key={i} className="flex items-center gap-3 py-3">
              <Avatar name={c.n} size={34} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="text-[13px] font-semibold">{c.n}</div>
                  <div className="text-[11px] text-[--color-muted]">{c.t}</div>
                </div>
                <div className="text-[12px] text-[--color-body] truncate">{c.s}</div>
                <div className="text-[10px] text-[--color-muted] mt-0.5">Duration {c.d}</div>
              </div>
              <Btn variant="ghost" size="sm">Transcript</Btn>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
