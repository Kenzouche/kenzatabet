import { motion } from "framer-motion";

type TechTitleProps = {
  text: string;
  meta?: string;
};

export default function TechTitle({ text }: TechTitleProps) {
  const letters = String(text ?? "").split("");

  return (
    <div className="relative mx-auto w-fit">
      {/* tech frame */}
      <div className="relative rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur overflow-hidden">
        {/* corners */}
        <div className="pointer-events-none absolute -top-2 -left-2 h-4 w-4 border-l border-t border-cyan-400/60" />
        <div className="pointer-events-none absolute -top-2 -right-2 h-4 w-4 border-r border-t border-purple-400/60" />
        <div className="pointer-events-none absolute -bottom-2 -left-2 h-4 w-4 border-l border-b border-purple-400/60" />
        <div className="pointer-events-none absolute -bottom-2 -right-2 h-4 w-4 border-r border-b border-cyan-400/60" />

        {/* 🔥 moving bar BEHIND the title */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-y-0 left-0 -z-0 h-full w-1/3"
          initial={{ x: "-120%" }}
          animate={{ x: "320%" }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          style={{
            background:
              "linear-gradient(90deg, rgba(34,211,238,0.25), rgba(168,85,247,0.25))",
            filter: "blur(18px)",
          }}
        />

        {/* title line with code-ish brackets */}
        <div className="relative z-10 flex items-baseline justify-center gap-3">
          <motion.span
            aria-hidden="true"
            className="select-none font-mono text-white/35"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            {"<h1>"}
          </motion.span>

          <h1 className="text-center text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
              {letters.map((ch, i) => (
                <motion.span
                  key={`${ch}-${i}`}
                  className="inline-block"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.05 + i * 0.03,
                    ease: "easeOut",
                  }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.span
            aria-hidden="true"
            className="select-none font-mono text-white/35"
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
          >
            {"</h1>"}
          </motion.span>
        </div>

        {/* subtle flicker */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.05, 0.02, 0.06, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3.5 }}
          style={{
            background:
              "linear-gradient(120deg, rgba(34,211,238,0.06), rgba(168,85,247,0.05))",
          }}
        />
      </div>
    </div>
  );
}
