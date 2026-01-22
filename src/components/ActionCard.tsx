import React from "react";

type ActionCardProps = {
  title: string;
  desc: string;
  cta: React.ReactNode;
};

export default function ActionCard({ title, desc, cta }: ActionCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      {/* neon top line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/55 to-transparent" />

      {/* subtle corner glow */}
      <div className="pointer-events-none absolute -inset-24 opacity-40 blur-3xl bg-[radial-gradient(circle_at_20%_10%,rgba(236,72,153,0.18),transparent_55%),radial-gradient(circle_at_90%_80%,rgba(56,189,248,0.12),transparent_55%)]" />

      <div className="relative">
        <p className="text-sm font-semibold text-white/85">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/60">{desc}</p>

        <div className="mt-5">{cta}</div>
      </div>
    </div>
  );
}
