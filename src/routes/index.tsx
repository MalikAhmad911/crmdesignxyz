import { createFileRoute } from "@tanstack/react-router";
import {
  Nav, Hero, TrustStrip, Features, VoiceAI, Industries,
  Compare, Testimonials, Pricing, FinalCta, Footer,
} from "@/components/landing/Revenue";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RevenueSol — The AI Operating System for Local Service Businesses" },
      { name: "description", content: "CRM, AI receptionist, unified inbox, reviews, jobs, dispatch, payments and automations — all in one AI-powered platform built for HVAC, plumbing, electrical and roofing companies." },
      { property: "og:title", content: "RevenueSol — Run Your Business. Automate Everything. Grow Without Limits." },
      { property: "og:description", content: "The #1 AI Business Operating System for local service businesses. Replace 5 tools with one platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-white overflow-x-clip">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <Features />
        <VoiceAI />
        <Industries />
        <Compare />
        <Testimonials />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
