"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, MapPin, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import SignOutButton from "@/components/auth/SignOutButton";
import NotificationBell from "@/components/notifications/NotificationBell";
type NavbarClientProps = {
  isLoggedIn: boolean;
  isAdmin: boolean;
};

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "How it works", href: "/how-it-works" },
  { name: "Pricing", href: "/pricing" },
  { name: "Reviews", href: "/reviews" },
];

export default function NavbarClient({
  isLoggedIn,
  isAdmin,
}: NavbarClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/95 backdrop-blur-md">

      <div className="container-shell flex h-[76px] items-center justify-between">

        {/* BRAND LOGO */}

        <Link href="/" className="flex items-center gap-2">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-forest text-lg font-black text-lime">
            GS
          </div>

          <span className="text-lg font-extrabold tracking-tight text-forest">
            {siteConfig.name}
            <span className="text-[#A6C936]">.</span>
          </span>

        </Link>

        {/* DESKTOP NAVIGATION */}

        <nav className="hidden items-center gap-7 lg:flex">

          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-forest/70 transition hover:text-forest"
            >
              {link.name}
            </Link>
          ))}

        </nav>

        {/* RIGHT SIDE ACTIONS */}

        <div className="hidden items-center gap-4 md:flex">

          <div className="flex items-center gap-1 text-xs font-semibold text-forest/70">

            <MapPin size={15} />

            {siteConfig.city}

          </div>

          <Link
            href="/book"
            className="flex items-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-[#19513E]"
          >
            Book a service

            <ArrowUpRight size={16} />

          </Link>

          {isLoggedIn ? (
            <Link href={isAdmin ? "/admin" : "/account"}>
              {isAdmin ? "Admin Dashboard" : "My Account"}
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-forest px-6 py-3 font-semibold text-forest transition hover:bg-forest hover:text-white"
            >
              Sign In
            </Link>
          )}
          {isLoggedIn && <NotificationBell />}

        </div>

        {/* MOBILE MENU BUTTON */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-forest hover:bg-forest/10 md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>

      </div>

      {/* MOBILE NAVIGATION */}

      {menuOpen && (

        <div className="border-t border-forest/10 bg-cream px-5 py-6 md:hidden">

          <nav className="flex flex-col gap-5">

            {navigationLinks.map((link) => (

              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-semibold text-forest"
              >
                {link.name}
              </Link>

            ))}

            <div className="flex items-center gap-2 border-t border-forest/10 pt-5 text-sm text-forest/70">
              <MapPin size={16} />
              Serving {siteConfig.city}
            </div>

            <Link
              href="/book"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-forest px-5 py-3 text-center text-sm font-bold text-white"
            >
              Book a service ↗
            </Link>

            {isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <Link href="/account" onClick={() => setMenuOpen(false)}>
                  My Account
                </Link>

                <SignOutButton />
              </div>
            ) : (
              <Link href="/login" onClick={() => setMenuOpen(false)}>
                Sign In
              </Link>
            )}

          </nav>

        </div>

      )}

    </header>
  );
}