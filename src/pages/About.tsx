import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Button } from "@heroui/react";
import { NavLink } from "react-router-dom";
import PageShell from "../components/PageShell";
import content from "../data/content.json";

type QAItem = { q: string; a: string };
type AboutContent = {
  title?: string;
  subtitle?: string;
  qa?: QAItem[];
  highlights?: string[];
  currentlyLearning?: string[];
};

/* ───────── Séparateur animé ───────── */
function SectionSeparator({ label }: { label: string }) {
  return (
    <div className="relative py-2">
      <div className="pointer-events-none absolute -inset-x-10 -inset-y-6 opacity-35 blur-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.12),transparent_60%)]" />

      <div className="relative flex items-center gap-4">
        <span className="shrink-0 font-mono text-xs text-white/50">
          {label}
        </span>

        <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-400"
            initial={{ x: "-140%" }}
            animate={{ x: "340%" }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ───────── Chip ───────── */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/10 bg-black/30 px-3.5 py-1.5 text-xs text-white/75 hover:border-cyan-400/30 hover:shadow-[0_0_18px_#22d3ee22] transition">
      {children}
    </span>
  );
}

/* ───────── Chevron ───────── */
function Chevron({ open }: { open: boolean }) {
  return (
    <motion.span
      aria-hidden
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" className="text-white/70">
        <path
          fill="currentColor"
          d="M12 15.5 5.5 9l1.4-1.4L12 12.7l5.1-5.1L18.5 9 12 15.5Z"
        />
      </svg>
    </motion.span>
  );
}

/* ───────── Download Icon ───────── */
function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      className="
        ml-2
        text-cyan-300
        drop-shadow-[0_0_6px_rgba(34,211,238,0.8)]
        transition-transform duration-300
        group-hover:translate-y-[2px]
      "
    >
      <path
        fill="currentColor"
        d="M12 16 7 11h3V4h4v7h3l-5 5ZM5 20v-2h14v2H5Z"
      />
    </svg>
  );
}

export default function About() {
  const about = (content?.about ?? {}) as AboutContent;

  const qa = about.qa ?? [];
  const highlights = about.highlights ?? [];
  const learning = about.currentlyLearning ?? [];

  const identityChips = useMemo(
    () => [
      content?.site?.location ?? "Localisation",
      "Full-stack",
      "Back-first",
      "C++",
      "Réseau",
      "Root-Me",
      "Dofus",
      "Peinture",
      "Alternance (licence)",
    ],
    []
  );

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <PageShell
      title={about.title ?? "À propos"}
      subtitle={about.subtitle ?? "Quelques questions, des réponses simples."}
      withBackground={false}
    >
      <div className="mx-auto max-w-6xl space-y-10">
        {/* ── HERO */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7"
        >
          <div className="flex flex-wrap gap-2">
            {identityChips.map((c) => (
              <Chip key={c}>{c}</Chip>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              as={NavLink}
              to="/projets"
              className="group rounded-xl px-6 py-5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-fuchsia-500"
            >
              Voir mes projets →
            </Button>

            <Button
              as="a"
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex items-center rounded-xl px-6 py-5
                text-sm font-semibold text-white
                bg-white/5 border border-white/10
                hover:border-cyan-400/40
                hover:shadow-[0_0_28px_rgba(34,211,238,0.25)]
                transition
              "
            >
              Télécharger le CV
              <DownloadIcon />
            </Button>
          </div>
        </motion.section>

        <SectionSeparator label="faq" />

        {/* ── FAQ */}
        <section className="grid gap-6 lg:grid-cols-2">
          {qa.map((item, i) => {
            const open = openIndex === i;

            return (
              <motion.div
                key={item.q}
                className="rounded-2xl border border-white/10 bg-white/[0.04]"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full p-7 flex items-center justify-between"
                >
                  <h3 className="text-xl font-semibold text-white/90">
                    {item.q}
                  </h3>
                  <Chevron open={open} />
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-7 pb-7"
                    >
                      <p className="text-sm text-white/75">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </section>

        <SectionSeparator label="focus" />

        {/* ── EXTRA */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
            <h3 className="text-xl font-semibold text-white/90">
              Ce que tu peux attendre de moi
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {highlights.map((h) => (
                <Chip key={h}>{h}</Chip>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
            <h3 className="text-xl font-semibold text-white/90">
              Ce que je bosse en ce moment
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {learning.map((h) => (
                <Chip key={h}>{h}</Chip>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
