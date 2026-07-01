import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Filter, Plus, Download, Phone, Mail, MessageSquare } from "lucide-react";
import { Card, PageHeader, Btn, Tag, Avatar, DataTable } from "@/components/app-shell/AppShell";
import { CONTACTS } from "@/lib/rs-mocks";

export const Route = createFileRoute("/app/contacts")({ component: ContactsPage });

function ContactsPage() {
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const filtered = CONTACTS.filter(c => (c.name + c.phone + c.email).toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">
      <PageHeader
        title="Contacts"
        subtitle={`${CONTACTS.length} people in your CRM`}
        actions={
          <>
            <Btn variant="secondary" icon={<Download size={14} />}>Export</Btn>
            <Btn variant="gradient" icon={<Plus size={14} />}>Add Contact</Btn>
          </>
        }
      />

      <Card padded={false}>
        <div className="p-4 flex items-center gap-2 flex-wrap border-b border-[--color-hairline]">
          <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-[--color-surface-strong] flex-1 min-w-[200px]">
            <Search size={14} className="text-[--color-muted]" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search contacts..." className="bg-transparent flex-1 text-[13px] focus:outline-none" />
          </div>
          <Btn variant="secondary" size="sm" icon={<Filter size={13} />}>Filters</Btn>
          {selected.size > 0 && (
            <>
              <span className="text-[12px] text-[--color-muted]">{selected.size} selected</span>
              <Btn size="sm" variant="secondary">Message</Btn>
              <Btn size="sm" variant="secondary">Tag</Btn>
            </>
          )}
        </div>

        <DataTable
          headers={["", "Name", "Contact", "Stage", "Tags", "Score", "Activity", ""]}
          rows={filtered.map(c => [
            <input type="checkbox" checked={selected.has(c.id)} onChange={e => {
              const n = new Set(selected);
              e.target.checked ? n.add(c.id) : n.delete(c.id);
              setSelected(n);
            }} />,
            <div className="flex items-center gap-2.5"><Avatar name={c.name} size={32} /><span className="font-semibold">{c.name}</span></div>,
            <div className="text-[12px]"><div>{c.phone}</div><div className="text-[--color-muted]">{c.email}</div></div>,
            <Tag tone={c.stage === "Customer" ? "success" : c.stage === "Lead" ? "primary" : "neutral"}>{c.stage}</Tag>,
            <div className="flex gap-1 flex-wrap">{c.tags.map(t => <Tag key={t} tone="ai">{t}</Tag>)}</div>,
            <div className="flex items-center gap-2">
              <div className="w-14 h-1.5 rounded-full bg-[--color-surface-strong] overflow-hidden">
                <div className="h-full" style={{ width: `${c.score}%`, background: "var(--color-brand-gradient)" }} />
              </div>
              <span className="text-[12px] font-semibold">{c.score}</span>
            </div>,
            <span className="text-[12px] text-[--color-muted]">{c.activity}</span>,
            <div className="flex gap-1">
              <button className="w-7 h-7 rounded-md grid place-items-center hover:bg-[--color-surface-strong] text-[--color-muted]"><MessageSquare size={13} /></button>
              <button className="w-7 h-7 rounded-md grid place-items-center hover:bg-[--color-surface-strong] text-[--color-muted]"><Phone size={13} /></button>
              <button className="w-7 h-7 rounded-md grid place-items-center hover:bg-[--color-surface-strong] text-[--color-muted]"><Mail size={13} /></button>
            </div>,
          ])}
        />
      </Card>
    </div>
  );
}
