import { Button, Link } from "@heroui/react";
import { NavLink } from "react-router-dom";
import content from "../data/content.json";
import NeonTerminal from "../components/NeonTerminal";
import ActionCard from "../components/ActionCard";

export default function Home() {
  
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-16 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div className="space-y-6">

            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              <span className="text-white/90">Des interfaces</span>{" "}
              <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
                modernes
              </span>{" "}
              <span className="text-white/90">et efficaces.</span>
            </h1>

            <p className="max-w-xl text-base text-white/70 sm:text-lg">
              {content.texts.t1}
            </p>

            <div className="flex items-center gap-4">
              <Button
                as={NavLink}
                to="/projets"
                className="
                  group relative overflow-hidden
                  rounded-xl px-7 py-6 text-base font-semibold
                  text-white
                  bg-gradient-to-r from-purple-500 to-fuchsia-500
                  shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
                  transition-all duration-300
                  hover:scale-[1.03]
                  hover:shadow-[0_0_35px_rgba(236,72,153,0.35)]
                  active:scale-[0.98]
                "
              >
                <span className="relative z-10">Explorer</span>
                <span
                  className="
                    pointer-events-none absolute inset-0
                    translate-x-[-120%] skew-x-[-20deg]
                    bg-gradient-to-r from-transparent via-white/25 to-transparent
                    transition-transform duration-700
                    group-hover:translate-x-[120%]
                  "
                />
              </Button>
            </div>
          </div>

          {/* RIGHT */}
          <NeonTerminal name={content.site.name} text={content.site.text} />
        </div>

        {/* CARDS */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <ActionCard
            title="Voir mon entreprise"
            desc={
              content.texts.t2
            }
            cta={
              <Button
                as={Link}
                // href={content.site.companyUrl}
                className="
                  group relative overflow-hidden
                  rounded-xl px-6 py-5 text-sm font-semibold
                  text-white
                  bg-white/5 border border-white/10
                  transition-all duration-300
                  hover:border-fuchsia-400/40
                  hover:shadow-[0_0_28px_rgba(168,85,247,0.25)]
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                <span className="relative z-10">Voir mon entreprise →</span>
                <span className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.18),transparent_55%)]" />
              </Button>
            }
          />

          <ActionCard
            title="Voir mes projets"
            desc={
              content.texts.t3
            }
            cta={
              <Button
                as={NavLink}
                to="/projets"
                className="
                  group relative overflow-hidden
                  rounded-xl px-6 py-5 text-sm font-semibold
                  text-white
                  bg-white/5 border border-white/10
                  transition-all duration-300
                  hover:border-sky-400/40
                  hover:shadow-[0_0_28px_rgba(56,189,248,0.20)]
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                <span className="relative z-10">Ouvrir mes projets →</span>
                <span className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.16),transparent_55%)]" />
              </Button>
            }
          />

          <ActionCard
            title="Me contacter"
            desc={
              content.texts.t4
            }
            cta={
              <Button
                as={NavLink}
                to="/contact"
                className="
                  group relative overflow-hidden
                  rounded-xl px-6 py-5 text-sm font-semibold
                  text-white
                  bg-white/5 border border-white/10
                  transition-all duration-300
                  hover:border-purple-400/40
                  hover:shadow-[0_0_28px_rgba(168,85,247,0.20)]
                  hover:scale-[1.02]
                  active:scale-[0.98]
                "
              >
                <span className="relative z-10">Me contacter →</span>
                <span className="pointer-events-none absolute -inset-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.16),transparent_55%)]" />
              </Button>
            }
          />
        </div>
      </div>
    </div>
  );
}
