import TypewriterText from "./TypewriterText";

type NeonTerminalProps = {
  name: string;
  text: string;
  pathLabel?: string; // optionnel
};

export default function NeonTerminal({
  name,
  text,
}: NeonTerminalProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">
      {/* neon frame glow */}
      <div className="pointer-events-none absolute -inset-20 opacity-60 blur-3xl bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.22),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.22),transparent_50%),radial-gradient(circle_at_60%_40%,rgba(56,189,248,0.14),transparent_55%)]" />

      {/* top neon line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />

      {/* header */}
      <div className="relative flex items-center justify-between gap-3 border-b border-white/10 bg-black/35 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90 shadow-[0_0_14px_rgba(251,113,133,0.45)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80 shadow-[0_0_14px_rgba(252,211,77,0.35)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80 shadow-[0_0_14px_rgba(110,231,183,0.35)]" />
        </div>
      </div>

      {/* body */}
      <div className="relative p-6 sm:p-7">
        <p className="font-mono text-xs text-white/55">$ qui suis-je ?</p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
            {name}
          </span>
        </h2>

        <div
            className="
                mt-4
                min-h-[96px] sm:min-h-[120px]
                whitespace-pre-line
                font-mono
                text-sm
                leading-relaxed
                text-white/75
                overflow-hidden
            "
            >
            <TypewriterText text={text} speed={60} />
        </div>


        <div className="mt-6 rounded-xl border border-white/10 bg-black/30 px-4 py-3">
          <div className="font-mono text-xs text-white/60">
            <span className="text-emerald-300/80">portfolio</span>
            <span className="text-white/35">:</span>
            <span className="text-sky-300/80">~</span>
            <span className="text-white/35">$</span>{" "}
            <span className="text-white/70">npm install portfolio</span>
            <span className="ml-1 inline-block h-3 w-[2px] translate-y-[2px] animate-pulse bg-fuchsia-300/80" />
          </div>
        </div>
      </div>
    </div>
  );
}
