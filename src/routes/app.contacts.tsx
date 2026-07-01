import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Card, Btn, Tag, Avatar } from "@/components/app-shell/AppShell";
import { Plus, Search, Filter, Download, Phone, Mail } from "lucide-react";

export const Route = createFileRoute("/app/contacts")({
  head: () => ({ meta: [{ title: "Contacts · Revenue Sol" }] }),
  component: ContactsPage,
});

const CONTACTS = [
  { n: "Priya Rao",     e: "priya.rao@mail.com",     p: "(512) 555-0111", src: "Website form", score: 92, lv: "$2,180", last: "2m ago" },
  { n: "Jordan Pike",   e: "j.pike@mail.com",        p: "(512) 555-0122", src: "Missed call",  score: 78, lv: "$1,240", last: "12m ago" },
  { n: "Maya Sørensen", e: "maya.s@mail.com",        p: "(512) 555-0133", src: "Google Ads",   score: 64, lv: "$680",   last: "1h ago" },
  { n: "Devon Kim",     e: "d.kim@mail.com",         p: "(512) 555-0144", src: "Referral",     score: 41, lv: "$0",     last: "3h ago" },
  { n: "Aisha Osei",    e: "aisha@osei.co",          p: "(512) 555-0155", src: "Repeat",       score: 88, lv: "$4,850", last: "Today" },
  { n: "Nina Berg",     e: "nina@bergco.io",         p: "(512) 555-0166", src: "Repeat",       score: 74, lv: "$1,690", last: "Yesterday" },
  { n: "Alicia Weber",  e: "alicia.weber@mail.com",  p: "(512) 555-0177", src: "Webchat",      score: 82, lv: "$920",   last: "5h ago" },
];

function ContactsPage() {
  return (
    <div className="p-8 max-w-[1440px] w-full">
      <PageHeader
        title="Contacts"
        subtitle="248 people · 12 added this week"
        actions={
          <>
            <Btn variant="secondary" icon={<Download size={13} />}>Export</Btn>
            <Btn icon={<Plus size={14} />}>Add contact</Btn>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[["Total","248"],["Hot leads","34"],["Repeat","96"],["This week","+12"]].map(([l,v]) => (
          <Card key={l}>
            <div className="text-[11px] uppercase tracking-widest font-semibold text-[--color-muted]">{l}</div>
            <div className="text-[24px] font-semibold tracking-tight mt-1">{v}</div>
          </Card>
        ))}
      </div>

      <Card padded={false}>
        <div className="p-4 flex items-center gap-3 border-b border-[--color-hairline]">
          <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[--color-surface-soft] flex-1 max-w-md text-[12px] text-[--color-muted]">
            <Search size={13} /> Search by name, phone, email…
          </div>
          <Btn variant="secondary" size="sm" icon={<Filter size={13} />}>Filter</Btn>
        </div>
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="text-[10px] uppercase tracking-widest text-[--color-muted] border-b border-[--color-hairline]">
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Source</th>
              <th className="px-4 py-3 font-semibold">Score</th>
              <th className="px-4 py-3 font-semibold text-right">Lifetime value</th>
              <th className="px-4 py-3 font-semibold">Last activity</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {CONTACTS.map((c, i) => (
              <tr key={i} className="border-b border-[--color-hairline] last:border-0 hover:bg-[--color-surface-soft]/50 transition">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={c.n} size={32} />
                    <div className="min-w-0">
                      <div className="font-medium">{c.n}</div>
                      <div className="text-[11px] text-[--color-muted]">{c.e}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[--color-body]">{c.src}</td>
                <td className="px-4 py-3">
                  <Tag tone={c.score >= 80 ? "success" : c.score >= 60 ? "warning" : "neutral"}>{c.score}</Tag>
                </td>
                <td className="px-4 py-3 font-medium text-right">{c.lv}</td>
                <td className="px-4 py-3 text-[--color-muted]">{c.last}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1 justify-end">
                    <button className="w-7 h-7 rounded-md grid place-items-center hover:bg-[--color-surface-strong]"><Phone size={13} /></button>
                    <button className="w-7 h-7 rounded-md grid place-items-center hover:bg-[--color-surface-strong]"><Mail size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
