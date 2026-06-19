/**
 * Stripe-style animated gradient mesh background for the hero.
 * Layered conic/radial gradients + soft animated blobs + subtle grid.
 * Pure CSS — no canvas, GPU friendly.
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #F6F9FC 0%, #EEF0FF 55%, #F6F9FC 100%)",
        }}
      />

      {/* stripe-style angled ribbon — reduced opacity for readability */}
      <div
        className="absolute -top-1/3 -left-1/4 w-[160%] h-[120%] opacity-40"
        style={{
          background:
            "conic-gradient(from 210deg at 50% 50%, rgba(99,91,255,0) 0deg, rgba(99,91,255,0.40) 60deg, rgba(124,58,237,0.40) 120deg, rgba(0,132,255,0.32) 180deg, rgba(0,212,255,0.32) 240deg, rgba(99,91,255,0) 320deg)",
          filter: "blur(90px)",
          transform: "rotate(-12deg)",
          animation: "hero-spin 28s linear infinite",
        }}
      />

      {/* floating color blobs — softer and more transparent */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[520px] h-[520px] rounded-full opacity-35"
        style={{
          background: "radial-gradient(circle, #635BFF 0%, transparent 65%)",
          filter: "blur(50px)",
          animation: "hero-float-a 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[10%] right-[-12%] w-[560px] h-[560px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, #00D4FF 0%, transparent 65%)",
          filter: "blur(60px)",
          animation: "hero-float-b 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-15%] left-[25%] w-[600px] h-[600px] rounded-full opacity-28"
        style={{
          background: "radial-gradient(circle, #7C3AED 0%, transparent 65%)",
          filter: "blur(70px)",
          animation: "hero-float-c 26s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[40%] left-[35%] w-[420px] h-[420px] rounded-full opacity-22"
        style={{
          background: "radial-gradient(circle, #0A84FF 0%, transparent 65%)",
          filter: "blur(60px)",
          animation: "hero-float-b 24s ease-in-out infinite reverse",
        }}
      />

      {/* strong center light wash where text lives */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* fine grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0A2540 1px, transparent 1px), linear-gradient(to bottom, #0A2540 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 70%)",
        }}
      />

      {/* subtle vignette to push edges darker */}
      <div
        className="absolute inset-0"
        style={{
          boxShadow: "inset 0 0 120px 40px rgba(255,255,255,0.35)",
        }}
      />

      {/* bottom fade to bg */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[color:var(--color-bg)]" />

      <style>{`
        @keyframes hero-spin {
          from { transform: rotate(-12deg); }
          to   { transform: rotate(348deg); }
        }
        @keyframes hero-float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(60px, 40px) scale(1.1); }
        }
        @keyframes hero-float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(-50px, 60px) scale(1.08); }
        }
        @keyframes hero-float-c {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%      { transform: translate(40px, -50px) scale(1.12); }
        }
      `}</style>
    </div>
  );
}
