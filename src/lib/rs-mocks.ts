// Dummy data for the Revenue Sol app shell — no backend.

export const BUSINESS = {
  name: "ABC Plumbing",
  owner: "Mike Walker",
  role: "Owner",
  plan: "Pro",
  trialDaysLeft: 11,
};

export type Channel = "sms" | "email" | "fb" | "ig" | "call";

export const CONTACTS = [
  { id: "c1", name: "John Smith", phone: "+1 214-555-0123", email: "john@example.com", stage: "Customer", tags: ["VIP", "Hot Lead"], score: 94, activity: "2h ago" },
  { id: "c2", name: "Sarah Kim", phone: "+1 469-555-0198", email: "sarah@example.com", stage: "Lead", tags: ["Follow-up"], score: 67, activity: "1d ago" },
  { id: "c3", name: "Mike Johnson", phone: "+1 972-555-0142", email: "mike.j@example.com", stage: "Customer", tags: [], score: 82, activity: "3h ago" },
  { id: "c4", name: "Jane Doe", phone: "+1 214-555-0177", email: "jane@example.com", stage: "Prospect", tags: ["Cold"], score: 41, activity: "2d ago" },
  { id: "c5", name: "James Rivera", phone: "+1 469-555-0134", email: "james@example.com", stage: "Customer", tags: ["VIP"], score: 88, activity: "5h ago" },
  { id: "c6", name: "Alicia Weber", phone: "+1 972-555-0189", email: "alicia@example.com", stage: "Lead", tags: [], score: 55, activity: "4d ago" },
  { id: "c7", name: "Devon Kim", phone: "+1 214-555-0166", email: "devon@example.com", stage: "Prospect", tags: [], score: 33, activity: "1w ago" },
  { id: "c8", name: "Priya Reddy", phone: "+1 469-555-0121", email: "priya@example.com", stage: "Customer", tags: ["Hot Lead"], score: 91, activity: "6h ago" },
];

export const THREADS = [
  { id: "t1", contactId: "c1", channel: "sms" as Channel, preview: "Is someone available for AC repair today?", time: "2m", unread: 3, status: "Open" },
  { id: "t2", contactId: "c2", channel: "sms" as Channel, preview: "When can you come out for the estimate?", time: "15m", unread: 0, status: "Open" },
  { id: "t3", contactId: "c3", channel: "email" as Channel, preview: "Thanks for the quote — a couple questions...", time: "1h", unread: 0, status: "Pending" },
  { id: "t4", contactId: "c4", channel: "fb" as Channel, preview: "Do you service the 75201 area?", time: "3h", unread: 1, status: "Open" },
  { id: "t5", contactId: "c5", channel: "sms" as Channel, preview: "Perfect, see you at 2pm 👍", time: "4h", unread: 0, status: "Closed" },
  { id: "t6", contactId: "c6", channel: "ig" as Channel, preview: "Loved the work on our upstairs unit!", time: "6h", unread: 0, status: "Closed" },
  { id: "t7", contactId: "c7", channel: "sms" as Channel, preview: "Can you send an invoice for last week?", time: "8h", unread: 0, status: "Open" },
  { id: "t8", contactId: "c8", channel: "email" as Channel, preview: "Following up on the water heater install", time: "1d", unread: 2, status: "Open" },
];

export const MESSAGES = [
  { id: "m1", threadId: "t1", from: "them", text: "Hi, is anyone available for AC repair today?", time: "10:23 AM", ai: false },
  { id: "m2", threadId: "t1", from: "us", text: "Hi John! Yes, we have availability today. What time works for you?", time: "10:24 AM", ai: true },
  { id: "m3", threadId: "t1", from: "them", text: "2pm would be great", time: "10:26 AM", ai: false },
  { id: "m4", threadId: "t1", from: "us", text: "Perfect! Booked for 2pm. You'll get a confirmation SMS.", time: "10:26 AM", ai: true },
  { id: "m5", threadId: "t1", from: "note", text: "Internal: check parts availability before the visit", time: "10:27 AM", ai: false },
];

export const REVIEWS = [
  { id: "r1", name: "John Smith", rating: 5, text: "Absolutely amazing service! They came within 2 hours and fixed our AC perfectly.", source: "Google", time: "2 hours ago", replied: true },
  { id: "r2", name: "Sarah Kim", rating: 5, text: "Prompt, tidy, and honest pricing. Booked through their text link — so easy.", source: "Google", time: "1 day ago", replied: false },
  { id: "r3", name: "Mike Johnson", rating: 4, text: "Solid work on the water heater. Would use again.", source: "Facebook", time: "3 days ago", replied: false },
  { id: "r4", name: "Jane Doe", rating: 5, text: "Rescheduled twice on my end and they were super flexible.", source: "Yelp", time: "5 days ago", replied: true },
  { id: "r5", name: "James Rivera", rating: 5, text: "The AI receptionist answered my late-night call. Booked next morning. 10/10.", source: "Google", time: "1 week ago", replied: true },
];

export const PAYMENTS = [
  { id: "p1", contact: "John Smith", amount: 450, description: "AC Repair", status: "Paid", sent: "Jul 1", paid: "Jul 1" },
  { id: "p2", contact: "Sarah Kim", amount: 289, description: "Plumbing Fix", status: "Pending", sent: "Jul 2", paid: "—" },
  { id: "p3", contact: "Mike Johnson", amount: 1200, description: "HVAC Install", status: "Paid", sent: "Jun 30", paid: "Jun 30" },
  { id: "p4", contact: "Jane Doe", amount: 175, description: "Drain Cleaning", status: "Pending", sent: "Jul 2", paid: "—" },
  { id: "p5", contact: "James Rivera", amount: 620, description: "Furnace Tune-up", status: "Paid", sent: "Jun 29", paid: "Jun 29" },
  { id: "p6", contact: "Alicia Weber", amount: 95, description: "Diagnostic Fee", status: "Expired", sent: "Jun 20", paid: "—" },
  { id: "p7", contact: "Devon Kim", amount: 340, description: "Faucet Replace", status: "Refunded", sent: "Jun 18", paid: "Jun 19" },
  { id: "p8", contact: "Priya Reddy", amount: 2100, description: "Water Heater Install", status: "Paid", sent: "Jun 15", paid: "Jun 16" },
];

export const JOBS = {
  Scheduled: [
    { id: "j1", title: "AC Repair", customer: "John Smith", address: "123 Main St, Dallas", time: "2:00 PM", tech: "Mike T." },
    { id: "j2", title: "Faucet Replace", customer: "Devon Kim", address: "890 Elm St", time: "3:30 PM", tech: "Ana R." },
  ],
  "En Route": [
    { id: "j3", title: "Furnace Tune-up", customer: "Alicia Weber", address: "45 Oak Ln", time: "ETA 12 min", tech: "Chris L." },
  ],
  "In Progress": [
    { id: "j4", title: "Plumbing Fix", customer: "Sarah Kim", address: "456 Oak Ave", time: "Since 10:30 AM", tech: "Mike T." },
    { id: "j5", title: "Water Heater Install", customer: "Priya Reddy", address: "77 Cedar Rd", time: "Since 9:00 AM", tech: "Ana R." },
  ],
  Completed: [
    { id: "j6", title: "HVAC Install", customer: "James Rivera", address: "912 Pine Blvd", time: "Completed 3:45 PM", tech: "Chris L." },
    { id: "j7", title: "Drain Cleaning", customer: "Jane Doe", address: "220 Birch Ct", time: "Completed 1:15 PM", tech: "Mike T." },
  ],
  Invoiced: [
    { id: "j8", title: "AC Repair", customer: "Mike Johnson", address: "34 Poplar St", time: "Invoiced Jun 30", tech: "Ana R." },
  ],
};

export const CALLS = [
  { id: "ca1", time: "Today 2:14pm", caller: "+1 214-555-0189", duration: "3:24", outcome: "Booked" },
  { id: "ca2", time: "Today 11:32am", caller: "John Smith", duration: "5:12", outcome: "Handled" },
  { id: "ca3", time: "Today 9:04am", caller: "+1 469-555-0121", duration: "1:48", outcome: "Handled" },
  { id: "ca4", time: "Yesterday 6:41pm", caller: "+1 469-555-0155", duration: "0:42", outcome: "Missed" },
  { id: "ca5", time: "Yesterday 3:12pm", caller: "Sarah Kim", duration: "4:07", outcome: "Escalated" },
  { id: "ca6", time: "Yesterday 1:20pm", caller: "+1 214-555-0166", duration: "2:15", outcome: "Booked" },
  { id: "ca7", time: "Jun 30", caller: "Devon Kim", duration: "3:55", outcome: "Handled" },
];

export const ACTIVITY = [
  { id: "a1", icon: "message", text: "John Smith sent a message", time: "2m ago", action: "Reply" },
  { id: "a2", icon: "star", text: "5-star review from Sarah K", time: "1h ago", action: "Reply" },
  { id: "a3", icon: "pay", text: "$350 payment from Mike T", time: "2h ago", action: "View" },
  { id: "a4", icon: "call", text: "Missed call +1 214-555-0189", time: "3h ago", action: "Call Back" },
  { id: "a5", icon: "ai", text: "AI replied to 5 leads", time: "4h ago", action: "View" },
  { id: "a6", icon: "message", text: "Jane Doe replied to campaign", time: "5h ago", action: "Reply" },
  { id: "a7", icon: "star", text: "New Google review from James R", time: "6h ago", action: "Reply" },
  { id: "a8", icon: "pay", text: "$620 payment from James R", time: "6h ago", action: "View" },
  { id: "a9", icon: "ai", text: "AI booked 2 appointments", time: "8h ago", action: "View" },
  { id: "a10", icon: "call", text: "Voice AI handled 4 calls", time: "1d ago", action: "View" },
];

export const NOTIFICATIONS = [
  { id: "n1", icon: "message", text: "New message from John Smith", time: "2m ago", unread: true },
  { id: "n2", icon: "star", text: "New 5-star review from Sarah K.", time: "1h ago", unread: true },
  { id: "n3", icon: "pay", text: "Payment received: $350 from Mike T.", time: "2h ago", unread: true },
  { id: "n4", icon: "call", text: "Missed call from +1 214-555-0189", time: "3h ago", unread: false },
  { id: "n5", icon: "ai", text: "AI Employee handled 12 conversations", time: "5h ago", unread: false },
  { id: "n6", icon: "job", text: "Job completed: HVAC Install for James R.", time: "6h ago", unread: false },
  { id: "n7", icon: "star", text: "Review request sent to 4 customers", time: "1d ago", unread: false },
  { id: "n8", icon: "pay", text: "Invoice #INV-1042 paid by Priya R.", time: "1d ago", unread: false },
];
