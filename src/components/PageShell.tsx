import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import TechTitle from "./TechTitle";
import type { ReactNode } from "react";

function formatMeta(pathname: string): string {
  if (pathname === "/") return "accueil";
  return pathname.replace("/", "").replaceAll("-", " ");
}

type PageShellProps = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  titleMeta?: string;
  withBackground?: boolean;
};

export default function PageShell({
  title = "",
  subtitle = "",
  children,
  titleMeta,
  withBackground = true, // ✅ default
}: PageShellProps) {
  const location = useLocation();
  const autoMeta = formatMeta(location.pathname);
  const meta = titleMeta ?? autoMeta;

  return (
    <motion.main
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative min-h-screen px-6 pt-16 pb-20"
    >
      {/* background now optional */}
      {withBackground && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-purple-500/30 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-cyan-400/30 blur-[120px]" />
          <div className="absolute top-1/3 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fuchsia-400/10 blur-[140px]" />
        </div>
      )}

      {(title || subtitle) && (
        <header className="mx-auto mb-8 max-w-5xl text-center">
          {title ? <TechTitle text={title} meta={meta} /> : null}

          {subtitle ? (
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-white/70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.12 }}
            >
              {subtitle}
            </motion.p>
          ) : null}
        </header>
      )}

      {children}
    </motion.main>
  );
}
