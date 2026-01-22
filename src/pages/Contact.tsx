import { motion } from "framer-motion";
import PageShell from "../components/PageShell";
import content from "../data/content.json";
import BorderScan from "../components/BorderScan";
import ContactForm from "../components/ContactForm";

export default function Contact() {
  const { site, socials } = content;

  return (
    <PageShell
      title="Contact"
      titleMeta="contact"
      subtitle="Discutons ensemble — projet, question ou opportunité."
      withBackground={false}
    >
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2 md:items-start">
        {/* ───────────── LEFT / INFOS */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, staggerChildren: 0.08 },
            },
          }}
          className="space-y-8 md:pt-10"
        >
          {/* Info card */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur"
          >
            {/* subtle glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-purple-500/15 blur-[60px]" />
              <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-cyan-400/15 blur-[60px]" />
            </div>

            <p className="text-sm font-semibold text-white/85">Informations</p>

            <div className="mt-5 space-y-3 text-white/80">
              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-white/60">
                  <path
                    fill="currentColor"
                    d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z"
                  />
                </svg>

                <a
                  href={`mailto:${site.email}`}
                  className="font-mono text-cyan-400 hover:underline"
                >
                  {site.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" className="text-white/60">
                  <path
                    fill="currentColor"
                    d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z"
                  />
                </svg>
                <span className="text-white/75">{site.location}</span>
              </div>

              {site.companyUrl ? (
                <div className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" className="text-white/60">
                    <path
                      fill="currentColor"
                      d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
                    />
                  </svg>
                  <a
                    href={site.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/75 hover:text-white/90 hover:underline"
                  >
                    Mon entreprise
                  </a>
                </div>
              ) : null}
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
            className="pt-1"
          >
            <div className="relative mb-3 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ x: "-120%" }}
                animate={{ x: "220%" }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "linear" }}
              />
            </div>

            <h3
              className="text-xl font-semibold tracking-tight text-white"
              style={{
                textShadow: `
                  0 0 8px rgba(34,211,238,0.45),
                  0 0 18px rgba(34,211,238,0.25),
                  0 0 32px rgba(168,85,247,0.18)
                `,
                filter: "drop-shadow(0 0 12px rgba(34,211,238,0.35))",
              }}
            >
              Réseaux
            </h3>

            <div className="mt-4 flex flex-wrap gap-3">
              {socials.map((s, i) => (
                <motion.a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.06 }}
                  className="rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white/80
                             hover:border-cyan-400/30 hover:shadow-[0_0_20px_#22d3ee24] transition"
                >
                  {s.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ───────────── RIGHT / MAIL UI */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl"
        >
          <div className="relative rounded-2xl border border-white/10 overflow-hidden">
            <BorderScan />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />

            <div className="relative rounded-2xl bg-black/40 backdrop-blur">
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <p className="font-mono text-sm text-white/70">New message</p>

                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400/70" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                  <span className="h-3 w-3 rounded-full bg-green-400/70" />
                </div>
              </div>

              {/* ✅ Formspree form */}
              <ContactForm toEmail={site.email} />
            </div>
          </div>
        </motion.section>
      </div>
    </PageShell>
  );
}
