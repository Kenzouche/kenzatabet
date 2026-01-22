import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import PageShell from "../components/PageShell";
import content from "../data/content.json";

type SkillItem = {
  name: string;
  level?: number; // 0..100
  note?: string;
};

type SkillGroup = {
  group: string;
  tagline?: string;
  accent?: "cyan" | "purple" | "fuchsia" | "sky" | "mixed";
  items: SkillItem[];
};

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function slugify(input: string) {
  return String(input ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // remove accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function accentClasses(accent: SkillGroup["accent"]) {
  switch (accent) {
    case "cyan":
      return {
        ring: "ring-cyan-400/20",
        glow: "shadow-[0_0_40px_rgba(34,211,238,0.12)]",
        topLine: "via-cyan-400/60",
        badge:
          "bg-cyan-500/10 border-cyan-400/20 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.20)]",
        barFrom: "from-cyan-400",
        barTo: "to-purple-500",
      };
    case "purple":
      return {
        ring: "ring-purple-400/20",
        glow: "shadow-[0_0_40px_rgba(168,85,247,0.12)]",
        topLine: "via-purple-400/60",
        badge:
          "bg-purple-500/10 border-purple-400/20 text-purple-100 shadow-[0_0_18px_rgba(168,85,247,0.22)]",
        barFrom: "from-purple-400",
        barTo: "to-fuchsia-400",
      };
    case "fuchsia":
      return {
        ring: "ring-fuchsia-400/20",
        glow: "shadow-[0_0_40px_rgba(236,72,153,0.12)]",
        topLine: "via-fuchsia-400/60",
        badge:
          "bg-fuchsia-500/10 border-fuchsia-400/20 text-fuchsia-100 shadow-[0_0_18px_rgba(236,72,153,0.22)]",
        barFrom: "from-fuchsia-400",
        barTo: "to-purple-500",
      };
    case "sky":
      return {
        ring: "ring-sky-400/20",
        glow: "shadow-[0_0_40px_rgba(56,189,248,0.12)]",
        topLine: "via-sky-400/60",
        badge:
          "bg-sky-500/10 border-sky-400/20 text-sky-100 shadow-[0_0_18px_rgba(56,189,248,0.22)]",
        barFrom: "from-sky-400",
        barTo: "to-cyan-300",
      };
    case "mixed":
    default:
      return {
        ring: "ring-white/10",
        glow: "shadow-[0_0_40px_rgba(255,255,255,0.06)]",
        topLine: "via-fuchsia-400/60",
        badge:
          "bg-white/5 border-white/10 text-white/80 shadow-[0_0_18px_rgba(168,85,247,0.14)]",
        barFrom: "from-cyan-400",
        barTo: "to-fuchsia-400",
      };
  }
}

function LevelBar({ level = 0, from, to }: { level?: number; from: string; to: string }) {
  const v = clamp(level);

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-[11px] text-white/50">
        <span className="font-mono">level</span>
        <span className="font-mono">{v}%</span>
      </div>

      <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${from} ${to}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${v}%` }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            boxShadow: "0 0 18px rgba(34,211,238,0.12), 0 0 26px rgba(168,85,247,0.10)",
          }}
        />
      </div>
    </div>
  );
}

function SkillChip({ name }: { name: string }) {
  return (
    <span
      className="
        rounded-full border border-white/10 bg-black/30
        px-3.5 py-1.5 text-xs text-white/75
        hover:border-cyan-400/30 hover:shadow-[0_0_18px_#22d3ee22] transition
      "
    >
      {name}
    </span>
  );
}

export default function Skills() {
  const groups: SkillGroup[] = (content?.skills ?? []) as SkillGroup[];

  // fallback safe si jamais l'ancien format existe encore (items: string[])
  const normalized: SkillGroup[] = groups.map((g: any) => {
    const items = (g?.items ?? []).map((it: any) =>
      typeof it === "string" ? { name: it } : it
    );
    return { ...g, items };
  });

  // stable ids (anchors)
  const anchors = useMemo(() => {
    // si 2 groupes ont le même nom, on rend l’id unique
    const seen = new Map<string, number>();
    return normalized.map((g) => {
      const base = slugify(g.group) || "section";
      const count = (seen.get(base) ?? 0) + 1;
      seen.set(base, count);
      return {
        group: g.group,
        id: count === 1 ? base : `${base}-${count}`,
      };
    });
  }, [normalized]);

  // scroll si on arrive avec un #hash (ou si le hash change)
  useEffect(() => {
    const go = () => {
      const hash = window.location.hash?.replace("#", "").trim();
      if (!hash) return;
      // petit delay pour laisser le layout se poser
      window.setTimeout(() => scrollToId(hash), 80);
    };

    go();
    window.addEventListener("hashchange", go);
    return () => window.removeEventListener("hashchange", go);
  }, []);

  return (
    <PageShell
      title="Compétences"
      subtitle="Front, back, outils… et ce qui me rend efficace en équipe."
      withBackground={true}
    >
      <div className="mx-auto max-w-6xl space-y-10">
        {/* ── top “scanner” summary */}
        <motion.section
          id="top"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="
            relative overflow-hidden rounded-2xl border border-white/10
            bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7
            shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)]
          "
        >
          {/* glow + scanline */}
          <div className="pointer-events-none absolute -inset-24 opacity-45 blur-3xl bg-[radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.16),transparent_55%),radial-gradient(circle_at_85%_70%,rgba(236,72,153,0.14),transparent_55%),radial-gradient(circle_at_45%_110%,rgba(168,85,247,0.12),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            initial={{ y: -40 }}
            animate={{ y: 40 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
            style={{
              background:
                "linear-gradient(to bottom, transparent, rgba(255,255,255,0.9), transparent)",
            }}
          />

          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="mt-1 text-2xl font-semibold tracking-tight text-white/90">
                  Stack & fonctionnement
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-white/65 leading-relaxed">
                  Je regroupe mes compétences par domaines pour montrer ce que je maîtrise,
                  ce que j’utilise au quotidien, et où je progresse.
                </p>
              </div>

              <div className="flex gap-3">
                <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-white/70">
                  {normalized.length} groupes
                </span>
                <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs text-white/70">
                  {normalized.reduce((acc, g) => acc + (g.items?.length ?? 0), 0)} items
                </span>
              </div>
            </div>

            {/* ✅ clickable chips (anchor navigation) */}
            <div className="mt-5 flex flex-wrap gap-2">
              {anchors.map((a, i) => (
                <motion.button
                  key={`${a.id}-${i}`}
                  type="button"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05 }}
                  onClick={() => {
                    // met le hash (utile si tu veux partager le lien direct)
                    window.history.replaceState(null, "", `#${a.id}`);
                    scrollToId(a.id);
                  }}
                  className="
                    rounded-full border border-white/10 bg-white/5
                    px-3.5 py-1.5 text-xs text-white/70
                    hover:border-fuchsia-400/25 hover:shadow-[0_0_18px_rgba(236,72,153,0.12)]
                    transition
                    active:scale-[0.98]
                  "
                >
                  {a.group}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── groups */}
        <div className="grid gap-6 lg:grid-cols-2">
          {normalized.map((g, idx) => {
            const a = accentClasses(g.accent);
            const anchorId = anchors[idx]?.id ?? slugify(g.group);

            return (
              <motion.section
                key={`${g.group}-${idx}`}
                id={anchorId}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={`
                  group relative overflow-hidden rounded-2xl border border-white/10
                  bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7
                  ring-1 ${a.ring}
                  ${a.glow}
                  hover:border-white/20 transition
                  scroll-mt-28
                `}
              >
                {/* top neon line */}
                <div
                  className={`pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent ${a.topLine} to-transparent`}
                />

                {/* corner radar glow */}
                <div
                  aria-hidden
                  className="
                    pointer-events-none absolute -inset-28 opacity-0 blur-3xl transition-opacity duration-500
                    group-hover:opacity-50
                    bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.18),transparent_50%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_55%),radial-gradient(circle_at_40%_110%,rgba(236,72,153,0.14),transparent_60%)]
                  "
                />

                <header className="relative flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold tracking-tight text-white/90">
                        {g.group}
                      </h2>
                      <span
                        className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] font-medium ${a.badge}`}
                      >
                        {g.items?.length ?? 0}
                      </span>
                    </div>

                    {g.tagline ? (
                      <p className="mt-2 text-sm text-white/65 leading-relaxed">
                        {g.tagline}
                      </p>
                    ) : null}
                  </div>
                </header>

                {/* items */}
                <div className="relative mt-6 space-y-4">
                  {(g.items ?? []).map((it, i) => (
                    <motion.div
                      key={`${it.name}-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ delay: i * 0.04, duration: 0.35 }}
                      className="
                        rounded-xl border border-white/10 bg-black/30
                        px-4 py-4
                        hover:border-cyan-400/20 hover:shadow-[0_0_22px_#22d3ee18]
                        transition
                      "
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white/85">
                            {it.name}
                          </p>
                          {it.note ? (
                            <p className="mt-1 text-xs text-white/55 leading-relaxed">
                              {it.note}
                            </p>
                          ) : null}
                        </div>

                        {/* quick chip */}
                        <div className="flex shrink-0 gap-2">
                          <SkillChip name={g.group} />
                        </div>
                      </div>

                      {typeof it.level === "number" ? (
                        <LevelBar
                          level={it.level}
                          from={a.barFrom}
                          to={a.barTo}
                        />
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
