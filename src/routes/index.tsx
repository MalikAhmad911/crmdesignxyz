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
      { title: "Revenue Sol — Run your service business with AI" },
      { name: "description", content: "All-in-one AI CRM for HVAC, plumbing, electrical, roofing, and cleaning businesses. Answer every lead, book every job, automatically." },
      { property: "og:title", content: "Revenue Sol — AI CRM for local service businesses" },
      { property: "og:description", content: "Bring AI employees, customer enrichment, and intent signals together — turn every call into a booked job." },
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
          eyebrow="UNIFIED DATA"
          title={<>Every customer touchpoint, <em className="italic font-normal">in one place</em></>}
          bullets={[
            { title: "Enrichments", body: "Pull contact, property, and equipment details from 100+ providers — automatically." },
            { title: "Intent signals", body: "Act when a missed call comes in, a form is filled, or your shop is mentioned online." },
            { title: "AI research", body: "Let an AI employee search public records and gated forms for the data you need." },
          ]}
          stat="2x"
          statLabel="Sample pilot doubled their booked-job rate (illustrative)"
          panelColor="#EAE5DA"
          mock={<InboxMock />}
        />

        <FeatureRow
          reverse
          eyebrow="AI EMPLOYEES"
          title={<>AI that's contextual, consistent, <em className="italic font-normal">and scalable</em></>}
          bullets={[
            { title: "Chat to build", body: "Describe a workflow in plain English and Revenue Sol assembles it for you." },
            { title: "Reusable agents", body: "Build AI receptionists, dispatchers, and follow-up reps once — use them everywhere." },
            { title: "Your context", body: "Connect your CRM, dispatch, and docs so every AI reply knows your business." },
          ]}
          stat="3x"
          statLabel="Sample shop tripled after-hours capture (illustrative)"
          panelColor="#EAE5DA"
          mock={<AgentMock />}
        />

        <FeatureRow
          eyebrow="ORCHESTRATION"
          title={<>Orchestrate and act on your data, <em className="italic font-normal">at scale</em></>}
          bullets={[
            { title: "Sync everywhere", body: "Keep millions of CRM records in sync with signals from 100+ providers." },
            { title: "Dynamic audiences", body: "Combine signals, enrichment, and CRM data to build high-intent segments." },
            { title: "Perfect timing", body: "Alert reps, update your CRM, or launch outreach in our native sequencer." },
          ]}
          stat="3M+"
          statLabel="Sample customers automated monitoring across 3M+ records (illustrative)"
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
