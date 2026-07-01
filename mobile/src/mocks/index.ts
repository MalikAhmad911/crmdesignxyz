import type { Conversation } from "@/components/ConversationRow";
import type { Lead } from "@/components/LeadCard";
import type { Job } from "@/components/JobCard";
import type { Appt } from "@/components/AppointmentCard";
import type { Review } from "@/components/ReviewCard";

export const leads: Lead[] = [
  { id: "l1", name: "Priya Rao",     source: "Website form",  score: 92, need: "AC not cooling, needs urgent visit today.", time: "2m ago" },
  { id: "l2", name: "Jordan Pike",   source: "Missed call",   score: 78, need: "Quote request: bathroom repipe.",           time: "12m ago" },
  { id: "l3", name: "Maya Sørensen", source: "Google Ads",    score: 64, need: "Furnace tune-up, flexible schedule.",       time: "1h ago" },
  { id: "l4", name: "Devon Kim",     source: "Referral",      score: 41, need: "Asked about pricing, no timeline yet.",     time: "3h ago" },
];

export const conversations: Conversation[] = [
  { id: "c1", name: "Priya Rao",     channel: "sms",     preview: "Yes, 3pm works — see you then.",     time: "2m",  unread: true },
  { id: "c2", name: "Reyes HVAC",    channel: "webchat", preview: "New lead: AC not cooling.",          time: "8m",  aiHandled: true },
  { id: "c3", name: "Jordan Pike",   channel: "call",    preview: "Missed call · 24s voicemail",       time: "12m" },
  { id: "c4", name: "Maya Sørensen", channel: "email",   preview: "Re: Furnace tune-up quote",         time: "1h",  aiHandled: true },
  { id: "c5", name: "Devon Kim",     channel: "sms",     preview: "Thanks, I'll think it over.",        time: "3h" },
  { id: "c6", name: "Alicia Weber",  channel: "webchat", preview: "Is anyone available tonight?",       time: "5h", unread: true },
];

export const jobs: Job[] = [
  { id: "j1", customer: "Priya Rao",     title: "AC diagnostic + recharge", address: "182 W 5th St, Austin",  when: "Today · 2:00 PM", tech: "Marcus L.",  status: "en-route",   value: "$248" },
  { id: "j2", customer: "Reyes HVAC",    title: "Furnace tune-up",          address: "94 Rainey St",         when: "Today · 4:30 PM", tech: "Marcus L.",  status: "scheduled",  value: "$189" },
  { id: "j3", customer: "Aisha O.",      title: "Water heater install",     address: "701 E 45th St",        when: "Tomorrow · 9 AM", tech: "Diego R.",   status: "scheduled",  value: "$1,450" },
  { id: "j4", customer: "Nina B.",       title: "Duct cleaning",            address: "22 Cesar Chavez",      when: "Yesterday",       tech: "Marcus L.",  status: "complete",   value: "$420" },
];

export const appts: Appt[] = [
  { id: "a1", title: "AC diagnostic",   customer: "Priya Rao",     start: "2:00", end: "3:00 PM", type: "On-site",   status: "confirmed" },
  { id: "a2", title: "Furnace tune-up", customer: "Reyes HVAC",    start: "4:30", end: "5:15 PM", type: "On-site",   status: "confirmed" },
  { id: "a3", title: "Quote call",      customer: "Aisha O.",      start: "6:00", end: "6:20 PM", type: "Phone",     status: "pending" },
];

export const reviews: Review[] = [
  { id: "r1", author: "Priya Rao",     source: "Google",   rating: 5, body: "Fast, professional, and honest. Booked within minutes of my call.", time: "2d",  sentiment: "positive", replied: true },
  { id: "r2", author: "Jordan Pike",   source: "Yelp",     rating: 4, body: "Great work, arrival window was a little wide.",                     time: "5d",  sentiment: "positive" },
  { id: "r3", author: "Devon Kim",     source: "Facebook", rating: 2, body: "Price was higher than the estimate.",                               time: "1w",  sentiment: "negative" },
];

export const activity = [
  { id: "ac1", who: "AI Receptionist", what: "answered call from Priya Rao and booked 2pm today", time: "2m" },
  { id: "ac2", who: "Marcus L.",       what: "marked Furnace tune-up as en-route",                time: "18m" },
  { id: "ac3", who: "AI Employee",     what: "sent review request to Nina B.",                    time: "1h" },
  { id: "ac4", who: "Stripe",          what: "collected $1,450 from Aisha O.",                    time: "3h" },
  { id: "ac5", who: "AI Brain",        what: "created 3 follow-ups for unpaid invoices",          time: "yesterday" },
];

export const invoices = [
  { id: "in1", number: "INV-1042", customer: "Aisha O.",     amount: "$1,450", status: "paid",    due: "Paid Jun 28" },
  { id: "in2", number: "INV-1043", customer: "Reyes HVAC",   amount: "$189",   status: "sent",    due: "Due Jul 5" },
  { id: "in3", number: "INV-1044", customer: "Jordan Pike",  amount: "$980",   status: "overdue", due: "5 days overdue" },
  { id: "in4", number: "INV-1045", customer: "Nina B.",      amount: "$420",   status: "draft",   due: "Draft" },
];

export const quotes = [
  { id: "q1", number: "Q-241", customer: "Aisha O.",    amount: "$1,450", status: "accepted", sent: "Jun 26" },
  { id: "q2", number: "Q-242", customer: "Jordan Pike", amount: "$980",   status: "sent",     sent: "Jun 28" },
  { id: "q3", number: "Q-243", customer: "Alicia W.",   amount: "$2,300", status: "viewed",   sent: "Jun 29" },
];

export const contacts = leads.map(l => ({ id: l.id, name: l.name, phone: "(512) 555-01" + (10 + parseInt(l.id.slice(1))), email: l.name.toLowerCase().replace(" ", ".") + "@mail.com", tag: l.source, score: l.score }));

export const connectors = [
  { name: "Twilio",         description: "SMS + voice routing",       letter: "T", status: "connected"  as const },
  { name: "RingCentral",    description: "Business phone system",     letter: "R", status: "connected"  as const },
  { name: "Stripe",         description: "Payments + payouts",        letter: "S", status: "connected"  as const },
  { name: "QuickBooks",     description: "Accounting sync",           letter: "Q", status: "needs-setup" as const },
  { name: "Google Calendar",description: "2-way appointment sync",    letter: "G", status: "connected"  as const },
  { name: "Gmail / IMAP",   description: "Unified email inbox",       letter: "M", status: "connected"  as const },
  { name: "Meta",           description: "Facebook + Instagram leads",letter: "M", status: "needs-setup" as const },
  { name: "SendGrid",       description: "Transactional email",       letter: "S", status: "error"      as const },
  { name: "Retell AI",      description: "Voice AI receptionist",     letter: "R", status: "connected"  as const },
  { name: "Zoom",           description: "Virtual estimates",         letter: "Z", status: "needs-setup" as const },
];
