import { createFileRoute } from "@tanstack/react-router";
import { Nav, Hero, IntegrationsStrip } from "@/components/landing/Header";
import { FeatureRow, SectionBreak } from "@/components/landing/FeatureRow";
import { InboxMock, AgentMock, AudienceMock } from "@/components/landing/mocks";
import {
  StackedFeatures,
  PullQuote,
  UseCases,
  CentralPlatform,
  CapabilityRow,
  QuoteCarousel,
  FinalCta,
  Footer,
} from "@/components/landing/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Revenue Sol — Never miss a service call again" },
      { name: "description", content: "We pick up calls, reply to texts and forms, and book jobs onto your calendar. Made for HVAC, plumbing, electrical, roofing, and cleaning shops." },
      { property: "og:title", content: "Revenue Sol — Never miss a service call again" },
      { property: "og:description", content: "We pick up calls, reply to texts and forms, and book jobs onto your calendar — so you can stop chasing the phone." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)]">
      <Nav />
      <main>
        <Hero />
        <IntegrationsStrip />

        <FeatureRow
          eyebrow="ALL YOUR CUSTOMER INFO"
          title={<>Everything about a customer, <em className="italic font-normal">in one place</em></>}
          bullets={[
            { title: "We fill in the blanks", body: "Pull in the customer's address, property details, and past jobs — so you're not asking the same questions twice." },
            { title: "Catch every chance to win work", body: "Know the second someone misses your call, fills out a form, or talks about you online." },
            { title: "We do the digging for you", body: "Our AI looks up public records and forms in the background so you don't have to." },
          ]}
          stat="2x"
          statLabel="Owners we work with book about twice as many jobs (early results)"
          panelColor="#EAE5DA"
          mock={<InboxMock />}
        />

        <FeatureRow
          reverse
          eyebrow="AI THAT ACTS LIKE STAFF"
          title={<>An extra hand that never <em className="italic font-normal">clocks out</em></>}
          bullets={[
            { title: "Tell it what to do, in plain English", body: "Describe how you handle a call or a quote, and Revenue Sol sets it up for you." },
            { title: "One setup, many helpers", body: "Build a receptionist, a dispatcher, or a follow-up rep once — then use them across every channel." },
            { title: "It knows your shop", body: "Hook up your CRM, dispatch tool, and price list so every reply sounds like you wrote it." },
          ]}
          stat="3x"
          statLabel="Shops booked roughly 3x more after-hours jobs in the first month"
          panelColor="#EAE5DA"
          mock={<AgentMock />}
        />

        <FeatureRow
          eyebrow="GET YOUR DATA WORKING"
          title={<>Keep every tool in sync, <em className="italic font-normal">without thinking about it</em></>}
          bullets={[
            { title: "Connects to what you already use", body: "Keep your CRM, dispatch, and accounting tools talking to each other — no copy-pasting." },
            { title: "Build simple customer lists", body: "Group people by what they need: missed calls, due for a tune-up, ready for a review — and reach out at the right time." },
            { title: "Right reminder, right moment", body: "Ping a tech, update a job, or send a follow-up text the moment something changes." },
          ]}
          stat="3M+"
          statLabel="Customer records kept up to date across our shops"
          panelColor="#EAE5DA"
          mock={<AudienceMock />}
        />

        <SectionBreak />
        <StackedFeatures />
        <PullQuote />
        <UseCases />
        <CentralPlatform />
        <CapabilityRow />
        <QuoteCarousel />
        <FinalCta />
        <Footer />
      </main>
    </div>
  );
}
