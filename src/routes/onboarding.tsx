import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  OnboardingShell, StepHeading, NavRow,
  TextField, SelectField, ChoiceGrid, MultiChoice, SidePoster,
} from "@/components/onboarding/OnboardingShell";
import { getAccount, setAccount } from "@/lib/account-store";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome — Revenue Sol" },
      { name: "description", content: "Set up your Revenue Sol workspace in a few quick steps." },
    ],
  }),
  component: OnboardingPage,
});

const TOTAL = 7;

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [a, setA] = useState(() => ({
    firstName: "", lastName: "", phone: "", smsOk: true,
    company: "", address: "", industry: "", website: "",
    teamSize: "", years: "",
    revenue: "",
    goal: "",
    focusAreas: [] as string[],
    referral: "",
  }));

  useEffect(() => {
    const acc = getAccount();
    if (acc.firstName) setA((s) => ({ ...s, firstName: acc.firstName ?? "", lastName: acc.lastName ?? "" }));
  }, []);

  const back = () => setStep((s) => Math.max(1, s - 1));
  const next = () => setStep((s) => Math.min(TOTAL, s + 1));

  const finish = () => {
    setAccount({
      firstName: a.firstName, lastName: a.lastName, phone: a.phone,
      company: a.company, address: a.address, industry: a.industry, website: a.website,
      teamSize: a.teamSize, yearsInBusiness: a.years, revenue: a.revenue,
      goal: a.goal, focusAreas: a.focusAreas, referralSource: a.referral,
      onboardingComplete: true,
    });
    navigate({ to: "/" });
  };

  const sides = [
    <SidePoster key="1" badge="Powering 12,400+ shops" stat="400k+" statSub="Home‑service pros run on platforms like Revenue Sol" quote="My evenings are mine again. The dispatcher handles the calls I used to chase." author="Irene Z." role="Sunshine Cleaning — Abbotsford, BC" />,
    <SidePoster key="2" badge="Did you know" stat="+37%" statSub="Average revenue lift in the first 12 months" quote="Setting up took ten minutes. By the end of the week I had three new recurring jobs." author="Marcus L." role="Reyes HVAC — Austin, TX" />,
    <SidePoster key="3" badge="Did you know" stat="7 hrs" statSub="Saved every week by owners who automate scheduling" quote="I stopped dropping calls on Saturdays. That alone paid for the year." author="Priya R." role="BrightLeaf Lawn — Raleigh, NC" />,
    <SidePoster key="4" badge="Did you know" stat="4×" statSub="Faster payments with built‑in online invoicing" quote="Clients pay before I'm back at the truck. Cash flow finally feels boring." author="Diego M." role="North Star Plumbing — Denver, CO" />,
    <SidePoster key="5" badge="Tailored for you" stat="< 3s" statSub="Average AI response on inbound calls" quote="It sounds like one of us. Customers don't even realize until we tell them." author="Sam K." role="Bay Area Electric — Oakland, CA" />,
    <SidePoster key="6" badge="Built to fit" stat="92%" statSub="Of after‑hours calls booked without a human touching the phone" quote="The follow‑ups alone brought back $12k in dormant jobs last quarter." author="Hannah W." role="Evergreen Roofing — Seattle, WA" />,
    <SidePoster key="7" badge="Last step" stat="10 min" statSub="From signup to your first booked job" quote="Honestly the most useful software we've adopted in five years." author="Tomás A." role="A1 Garage Doors — Phoenix, AZ" />,
  ];

  return (
    <OnboardingShell step={step} total={TOTAL} side={sides[step - 1]}>
      {step === 1 && (
        <>
          <StepHeading eyebrow="Step 1 · Free trial active" title="Your free trial is now active." sub="We'll use your name and number to set up your workspace and reach you if support is needed." />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="First name" value={a.firstName} onChange={(v) => setA({ ...a, firstName: v })} placeholder="Alex" />
            <TextField label="Last name" value={a.lastName} onChange={(v) => setA({ ...a, lastName: v })} placeholder="Morgan" />
          </div>
          <div className="mt-4">
            <TextField label="Phone number" value={a.phone} onChange={(v) => setA({ ...a, phone: v })} placeholder="(321) 944‑3991" hint="We'll text booking confirmations and missed‑call recoveries to this number." />
          </div>
          <label className="mt-5 flex items-start gap-3 rounded-2xl border border-[color:var(--color-border-soft)] bg-white p-4 text-sm text-[color:var(--color-body)]">
            <input type="checkbox" checked={a.smsOk} onChange={(e) => setA({ ...a, smsOk: e.target.checked })} className="mt-1 h-4 w-4 accent-[color:var(--color-heading)]" />
            <span>I agree to receive automated SMS from Revenue Sol — updates, alerts and offers. Msg & data rates may apply. Reply STOP to cancel.</span>
          </label>
          <NavRow onNext={next} disabled={!a.firstName || !a.phone} />
        </>
      )}

      {step === 2 && (
        <>
          <StepHeading eyebrow="Step 2 · Business" title="Tell us about your business." sub="Your company name, industry and website help us pre‑load reviews, photos and scripts tailored to your shop." />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField label="Company name" value={a.company} onChange={(v) => setA({ ...a, company: v })} placeholder="Reyes HVAC" />
            <TextField label="Company address" value={a.address} onChange={(v) => setA({ ...a, address: v })} placeholder="123 Main St, Austin, TX" />
            <SelectField label="Industry" value={a.industry} onChange={(v) => setA({ ...a, industry: v })} options={["HVAC","Plumbing","Electrical","Cleaning","Lawn & Landscape","Pest Control","Garage Doors","Roofing","Handyman","Other home service"]} />
            <TextField label="Company website" value={a.website} onChange={(v) => setA({ ...a, website: v })} placeholder="https://" />
          </div>
          <NavRow onBack={back} onNext={next} disabled={!a.company || !a.industry} />
        </>
      )}

      {step === 3 && (
        <>
          <StepHeading eyebrow="Step 3 · Team" title="Your shop at a glance." sub="We use this to suggest the right workflows and routing for your crew." />
          <p className="mb-2 mt-2 text-sm font-medium text-[color:var(--color-heading)]">How many people work at your company (including you)?</p>
          <ChoiceGrid columns={3} value={a.teamSize} onChange={(v) => setA({ ...a, teamSize: v })} options={["Just me","2–3","4–10","11–19","20+"]} />
          <p className="mb-2 mt-8 text-sm font-medium text-[color:var(--color-heading)]">How many years have you been in business?</p>
          <ChoiceGrid columns={3} value={a.years} onChange={(v) => setA({ ...a, years: v })} options={["Less than 1","1–2 years","3–5 years","6–10 years","10+ years"]} />
          <NavRow onBack={back} onNext={next} disabled={!a.teamSize || !a.years} />
        </>
      )}

      {step === 4 && (
        <>
          <StepHeading eyebrow="Step 4 · Revenue" title="Let's fine‑tune your experience." sub="We use this to size your dashboards and recommend pricing rules — never shared." />
          <ChoiceGrid columns={3} value={a.revenue} onChange={(v) => setA({ ...a, revenue: v })} options={["$0 – $50K","$50K – $150K","$150K – $500K","$500K – $2M","$2M+","Prefer not to say"]} />
          <NavRow onBack={back} onNext={next} disabled={!a.revenue} />
        </>
      )}

      {step === 5 && (
        <>
          <StepHeading eyebrow={`Step 5 · ${a.firstName || "You"}'s goals`} title={`${a.firstName || "Alex"}, what's top of mind?`} sub="Pick the one that sounds most like you. We'll prioritize features that move that needle first." />
          <ChoiceGrid value={a.goal} onChange={(v) => setA({ ...a, goal: v })} options={[
            "I want my business to look as professional as my work",
            "I want to feel in control, not like my business is running me",
            "I want to win more jobs without the admin time",
            "I'm not sure yet — just exploring",
          ]} />
          <NavRow onBack={back} onNext={next} disabled={!a.goal} />
        </>
      )}

      {step === 6 && (
        <>
          <StepHeading eyebrow="Step 6 · Focus" title="Let's build the professional image you deserve." sub="Select everything you'd like Revenue Sol to handle first — you can change this anytime." />
          <MultiChoice
            values={a.focusAreas}
            onToggle={(v) => setA({ ...a, focusAreas: a.focusAreas.includes(v) ? a.focusAreas.filter(x=>x!==v) : [...a.focusAreas, v] })}
            options={[
              "Answering inbound calls 24/7",
              "Sending professional quotes",
              "Getting approvals and deposits",
              "Invoicing and online payments",
              "Attracting more clients",
              "Improving client organization",
            ]}
          />
          <NavRow onBack={back} onNext={next} disabled={a.focusAreas.length === 0} />
        </>
      )}

      {step === 7 && (
        <>
          <StepHeading eyebrow="Step 7 · Almost there" title="We'd love to know…" sub="How did you hear about Revenue Sol? Your answer helps us reach more shops like yours." />
          <SelectField label="How did you find Revenue Sol?" value={a.referral} onChange={(v) => setA({ ...a, referral: v })}
            options={["Google search","Friend or colleague","Facebook / Instagram","YouTube","Podcast","Trade show / event","Industry forum","Other"]} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Perk title="All in one place" body="Quoting, scheduling, invoicing, payments — one calm cockpit." />
            <Perk title="Customer portal" body="Clients request work, approve quotes, and pay online." />
            <Perk title="Automated texts & emails" body="Reminders and follow‑ups that never miss a beat." />
            <Perk title="Built‑in reporting" body="See exactly where revenue is hiding in your week." />
          </div>
          <NavRow onBack={back} onNext={finish} nextLabel="Get started →" disabled={!a.referral} />
        </>
      )}
    </OnboardingShell>
  );
}

function Perk({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-[color:var(--color-border-soft)] bg-white p-5">
      <p className="font-display text-base font-medium text-[color:var(--color-heading)]">{title}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-body)]">{body}</p>
    </div>
  );
}
