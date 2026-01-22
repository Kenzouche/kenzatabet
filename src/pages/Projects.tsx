import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import content from "../data/content.json";

type Project = {
  title: string;
  description: string;
  tags?: string[];
  href?: string | null;
  repo?: string | null;
  featured?: boolean;

  type?: string;
  year?: string;
  highlights?: string[];
  status?: string;
};

function isNonEmptyUrl(value?: string | null) {
  return typeof value === "string" && value.trim().length > 0;
}

function SectionSeparator({ label }: { label: string }) {
  return (
    <div className="relative py-2">
      <div className="pointer-events-none absolute -inset-x-10 -inset-y-6 opacity-35 blur-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.12),transparent_60%)]" />
      <div className="relative flex items-center gap-4">
        <span className="shrink-0 font-mono text-xs text-white/50">{label}</span>

        <div className="relative h-px flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-cyan-400 via-purple-500 to-fuchsia-400"
            initial={{ x: "-140%" }}
            animate={{ x: "340%" }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <span className="shrink-0 text-xs text-white/30">●</span>
      </div>
    </div>
  );
}

function Chip({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "cyan" | "violet";
}) {
  const base = "rounded-full border px-3 py-1 text-xs backdrop-blur transition";
  const tones: Record<string, string> = {
    neutral: "border-white/10 bg-black/30 text-white/70 hover:border-white/20",
    cyan: "border-cyan-400/20 bg-cyan-500/10 text-cyan-100 hover:border-cyan-400/35 shadow-[0_0_18px_rgba(34,211,238,0.10)]",
    violet:
      "border-fuchsia-400/20 bg-fuchsia-500/10 text-fuchsia-100 hover:border-fuchsia-400/35 shadow-[0_0_18px_rgba(236,72,153,0.10)]",
  };

  return <span className={`${base} ${tones[tone]}`}>{children}</span>;
}

function FilterPill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        rounded-full border px-3.5 py-1.5 text-xs transition
        ${
          active
            ? "border-fuchsia-400/30 bg-fuchsia-500/10 text-white shadow-[0_0_18px_rgba(236,72,153,0.16)]"
            : "border-white/10 bg-black/30 text-white/70 hover:border-cyan-400/25 hover:shadow-[0_0_18px_rgba(34,211,238,0.12)]"
        }
      `}
    >
      {children}
    </button>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      className="text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.75)]"
    >
      <path
        fill="currentColor"
        d="M12 16 7 11h3V4h4v7h3l-5 5ZM5 20v-2h14v2H5Z"
      />
    </svg>
  );
}

function ProjectFrame({ p }: { p: Project }) {
  const hasLive = isNonEmptyUrl(p.href);
  const hasRepo = isNonEmptyUrl(p.repo);

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.01 }}
      className="group h-full"
    >
      <div
        className="
          relative h-full overflow-hidden rounded-2xl border border-white/10
          bg-white/[0.04] backdrop-blur-xl
          shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_60px_rgba(0,0,0,0.55)]
          transition
          group-hover:border-white/20
          group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_22px_70px_rgba(0,0,0,0.62)]
        "
      >
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />

        <div
          aria-hidden
          className="
            pointer-events-none absolute -inset-24 opacity-0 blur-3xl transition-opacity duration-500
            group-hover:opacity-45
            bg-[radial-gradient(circle_at_25%_15%,rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(236,72,153,0.14),transparent_55%),radial-gradient(circle_at_55%_55%,rgba(168,85,247,0.12),transparent_60%)]
          "
        />

        <div className="relative flex h-full flex-col p-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold tracking-tight text-white/90">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {p.description}
              </p>
            </div>

            {p.featured ? (
              <span
                className="
                  shrink-0 rounded-full px-2.5 py-1 text-xs font-medium
                  text-fuchsia-100 bg-fuchsia-500/12 border border-fuchsia-400/25
                  shadow-[0_0_18px_rgba(236,72,153,0.22)]
                "
              >
                Featured
              </span>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {p.type ? <Chip tone="cyan">{p.type}</Chip> : null}
            {p.year ? <Chip>{p.year}</Chip> : null}
            {p.status ? <Chip tone="violet">{p.status}</Chip> : null}
          </div>

          {!!(p.tags ?? []).length && (
            <div className="mt-4 flex flex-wrap gap-2">
              {(p.tags ?? []).map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          )}

          {!!(p.highlights ?? []).length && (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {(p.highlights ?? []).slice(0, 3).map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-300/80 shadow-[0_0_10px_rgba(34,211,238,0.25)]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-6 flex flex-wrap gap-2">
            <a
              href={hasLive ? (p.href as string) : undefined}
              target={hasLive ? "_blank" : undefined}
              rel={hasLive ? "noreferrer" : undefined}
              aria-disabled={!hasLive}
              className={`
                inline-flex items-center justify-center gap-2
                rounded-xl px-4 py-2 text-sm font-semibold transition
                ${
                  hasLive
                    ? "text-black bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-90"
                    : "cursor-not-allowed text-white/35 border border-white/10 bg-black/20"
                }
              `}
            >
              Live {!hasLive ? null : <DownloadIcon />}
            </a>

            <a
              href={hasRepo ? (p.repo as string) : undefined}
              target={hasRepo ? "_blank" : undefined}
              rel={hasRepo ? "noreferrer" : undefined}
              aria-disabled={!hasRepo}
              className={`
                inline-flex items-center justify-center
                rounded-xl px-4 py-2 text-sm font-semibold transition
                ${
                  hasRepo
                    ? "text-white/85 border border-white/10 bg-black/30 hover:border-purple-400/30 hover:shadow-[0_0_22px_rgba(168,85,247,0.18)]"
                    : "cursor-not-allowed text-white/35 border border-white/10 bg-black/20"
                }
              `}
            >
              Repo
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  // ✅ NORMALISATION : supporte null dans ton JSON
  const raw = (content?.projects ?? []) as any[];
  const projects: Project[] = raw.map((p) => ({
    title: String(p?.title ?? ""),
    description: String(p?.description ?? ""),
    tags: Array.isArray(p?.tags) ? p.tags : [],
    href: p?.href ?? null,
    repo: p?.repo ?? null,
    featured: !!p?.featured,
    type: p?.type ?? undefined,
    year: p?.year ?? undefined,
    highlights: Array.isArray(p?.highlights) ? p.highlights : [],
    status: p?.status ?? undefined,
  }));

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("Tous");

  const types = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.type && set.add(p.type));
    return ["Tous", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [projects]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return projects.filter((p) => {
      const typeOk = typeFilter === "Tous" ? true : p.type === typeFilter;

      if (!q) return typeOk;

      const hay = [
        p.title,
        p.description,
        p.type ?? "",
        p.year ?? "",
        p.status ?? "",
        (p.tags ?? []).join(" "),
        (p.highlights ?? []).join(" "),
      ]
        .join(" ")
        .toLowerCase();

      return typeOk && hay.includes(q);
    });
  }, [projects, query, typeFilter]);

  const featured = filtered.filter((p) => !!p.featured);
  const others = filtered.filter((p) => !p.featured);

  return (
    <PageShell
      title="Projets"
      titleMeta="projets"
      subtitle="Une sélection de réalisations et d’expérimentations (web, back, C++, réseau…)."
      withBackground={false}
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="
            relative overflow-hidden rounded-2xl border border-white/10
            bg-white/[0.04] backdrop-blur-xl p-7
          "
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />
          <div className="pointer-events-none absolute -inset-24 opacity-35 blur-3xl bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.14),transparent_55%),radial-gradient(circle_at_80%_80%,rgba(236,72,153,0.12),transparent_55%)]" />

          <div className="relative flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <p className="mt-1 text-sm text-white/65">
                Affiche les projets par catégorie et par mot-clé.
              </p>

              <div className="flex gap-2">
                <Chip>{filtered.length} affiché(s)</Chip>
                <Chip tone="violet">{featured.length} featured</Chip>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <FilterPill
                  key={t}
                  active={t === typeFilter}
                  onClick={() => setTypeFilter(t)}
                >
                  {t}
                </FilterPill>
              ))}
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
              <span className="font-mono text-xs text-white/45">search</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ex: API, C++, réseau, auth…"
                className="w-full bg-transparent text-sm text-white/80 outline-none placeholder:text-white/30"
              />
              {query.trim() && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70 hover:border-white/20"
                >
                  clear
                </button>
              )}
            </div>
          </div>
        </motion.section>

        {featured.length > 0 && (
          <>
            <SectionSeparator label="à-la-une" />
            <section className="grid gap-6 md:grid-cols-2">
              {featured.map((p, i) => (
                <ProjectFrame key={`${p.title}-${i}`} p={p} />
              ))}
            </section>
          </>
        )}

        <SectionSeparator label="tous" />

        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur">
            <p className="text-white/70">
              Aucun résultat. Change le filtre ou la recherche, ou ajoute des projets dans{" "}
              <code className="text-white/80">data/content.json</code>.
            </p>
          </div>
        ) : (
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {(others.length ? others : filtered).map((p, i) => (
              <ProjectFrame key={`${p.title}-${i}`} p={p} />
            ))}
          </section>
        )}
      </div>
    </PageShell>
  );
}
