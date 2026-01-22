// src/components/TopNav.jsx
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/projets", label: "Projets" },
  { to: "/competences", label: "Compétences" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export default function TopNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
      <Navbar
        maxWidth="full"
        // height="5rem"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="
          w-full
          bg-transparent
          backdrop-blur-0
        "
      >
        {/* ✅ wrapper capsule comme sur la photo */}
        <div
          className="
            relative mx-auto
            w-[min(1240px,calc(100%-1.5rem))]
            rounded-2xl
            border border-white/10
            bg-black/35 backdrop-blur-2xl
            shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_22px_60px_rgba(0,0,0,0.55)]
            px-4 sm:px-6
            overflow-hidden
          "
        >
        {/* glow line under navbar */}
        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-fuchsia-400/60 to-transparent" />

        {/* subtle inner glow */}
        <div className="pointer-events-none absolute -inset-24 opacity-35 blur-3xl bg-[radial-gradient(circle_at_20%_0%,rgba(236,72,153,0.18),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(56,189,248,0.12),transparent_60%)]" />

        {/* ✅ on remet le layout Navbar "dans" la capsule */}
        <div className="relative flex h-20 items-center">
          {/* LEFT */}
          <NavbarContent justify="start" className="gap-4">
            <NavbarBrand>
              <NavLink
                to="/"
                className="
                  flex items-center gap-3
                  transition-transform duration-300
                  hover:scale-[1.03]
                "
              >
                <img alt="logo" src="/logo_portfolio.png" className="h-10 w-10" />
                <span className="hidden sm:block text-sm font-semibold tracking-wide text-white/85">
                  <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-sky-400 bg-clip-text text-transparent">
                    Tabet Kenza
                  </span>
                </span>
              </NavLink>
            </NavbarBrand>
          </NavbarContent>

          {/* Mobile toggle */}
          <NavbarContent className="md:hidden" justify="end">
            <NavbarMenuToggle
              aria-label="toggle navigation"
              className="text-white/80"
            />
          </NavbarContent>

          {/* RIGHT Desktop */}
          <NavbarContent justify="end" className="hidden md:flex gap-2 ml-auto">
            {nav.map((item) => (
              <NavbarItem key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `
                    relative px-4 py-2 text-sm
                    font-medium tracking-wide
                    transition-all duration-300
                    rounded-xl
                    ${isActive ? "text-white bg-white/5" : "text-white/65 hover:text-white hover:bg-white/5"}
                    
                    after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
                    after:-bottom-[2px] after:h-[2px] after:rounded-full
                    after:bg-gradient-to-r after:from-purple-400 after:via-fuchsia-400 after:to-sky-400
                    after:transition-all after:duration-300
                    ${isActive ? "after:w-10" : "after:w-0 hover:after:w-10"}

                    active:scale-[0.98]
                  `}
                >
                  {item.label}
                </NavLink>
              </NavbarItem>
            ))}
          </NavbarContent>
        </div>

        {/* Mobile menu */}
        <NavbarMenu className="bg-black/85 backdrop-blur-2xl border-t border-white/10">
          <div className="px-4 pt-4 pb-2 text-xs text-white/50">
            Navigation
            <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent" />
          </div>

          {nav.map((item) => (
            <NavbarMenuItem key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `
                  w-full block
                  px-4 py-3
                  text-sm font-medium
                  rounded-xl
                  transition-all duration-300
                  ${
                    isActive
                      ? "text-white bg-white/10 border border-fuchsia-400/20 shadow-[0_0_18px_rgba(236,72,153,0.15)]"
                      : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                  }
                `}
              >
                {item.label}
              </NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </div>
    </Navbar>
    </div>
  );
}
