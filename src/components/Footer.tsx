
export default function Footer() {
  return (
    <footer className="mt-auto w-full px-4 sm:px-5 pb-8">
  <div
    className="
      relative mx-auto
      w-full max-w-5xl
      rounded-2xl
      border border-white/10
      bg-black/35 backdrop-blur-2xl
      shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,0.55)]
      px-6 py-5
      overflow-hidden
    "
  >
    {/* glow line top */}
    <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent" />

    {/* subtle ambient glow */}
    <div className="pointer-events-none absolute -inset-20 opacity-30 blur-3xl bg-[radial-gradient(circle_at_20%_0%,rgba(168,85,247,0.18),transparent_60%),radial-gradient(circle_at_80%_100%,rgba(236,72,153,0.12),transparent_60%)]" />

    <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-white/60">
      <span>
        © {new Date().getFullYear()}{" "}
        <span className="text-white/80 font-medium">
          Portfolio
        </span>
        . Tous droits réservés.
      </span>

      <span className="flex items-center gap-2">
        <span className="text-white/40">Conçu avec</span>
        <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-sky-400 bg-clip-text text-transparent font-medium">
          passion & précision
        </span>
      </span>
    </div>
  </div>
</footer>

  );
}