export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-canvas"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-15%,rgba(34,211,238,0.22),transparent_34rem),radial-gradient(circle_at_85%_18%,rgba(168,85,247,0.18),transparent_28rem),radial-gradient(circle_at_12%_32%,rgba(236,72,153,0.12),transparent_24rem)]" />
      <div className="aurora-gradient absolute -left-24 top-[-18rem] h-[34rem] w-[42rem] rounded-full blur-3xl" />
      <div className="aurora-gradient animation-delay-2000 absolute right-[-16rem] top-24 h-[30rem] w-[38rem] rounded-full blur-3xl" />
      <div className="animated-grid absolute inset-0" />
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
