/**
 * Clay-style hero background — warm cream paper with subtle organic texture.
 * No animated gradients, no neon. Just a calm, premium canvas.
 */
export function HeroBackground() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* warm cream base */}
      <div
        className="absolute inset-0"
        style={{ background: "#F4F1EC" }}
      />

      {/* very soft horizontal wash for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* organic paper-grain noise via layered radial dots */}
      <div
        className="absolute inset-0 opacity-[0.5] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(180,160,130,0.06) 0px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(180,160,130,0.05) 0px, transparent 2px), radial-gradient(circle at 40% 80%, rgba(180,160,130,0.05) 0px, transparent 2px)",
          backgroundSize: "140px 140px, 180px 180px, 220px 220px",
        }}
      />

      {/* faint topographic curve lines (paper texture cue) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M 0 ${120 + i * 60} Q 360 ${80 + i * 60} 720 ${130 + i * 60} T 1440 ${110 + i * 60}`}
            fill="none"
            stroke="#2A1F12"
            strokeWidth="1"
          />
        ))}
      </svg>

      {/* bottom fade to page bg */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[color:var(--color-bg)]" />
    </div>
  );
}
