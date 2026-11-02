import Link from "next/link";
import { ArrowUpRight, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function BookingCTA() {
  return (
    <section className="bg-cream px-4 py-16">

      <div className="container-shell">

        <div className="relative overflow-hidden rounded-[32px] bg-forest px-7 py-16 text-center sm:px-12 md:py-20">

          {/* DECORATIVE ELEMENTS */}

          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-lime/10 blur-3xl" />

          <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-lime/10 blur-3xl" />

          {/* CONTENT */}

          <div className="relative mx-auto max-w-2xl">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime text-forest">

              <Sparkles size={27} />

            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-lime">
              A LITTLE HELP GOES A LONG WAY
            </p>

            <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">

              Your home deserves

              <span className="block font-medium italic text-lime">
                a helping hand.
              </span>

            </h2>

            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-white/65">

              Let us take care of your household needs.
              Explore our services and find the assistance
              that works for your everyday life.

            </p>

            {/* BUTTONS */}

            <div className="mt-9 flex flex-wrap justify-center gap-4">

              <Link
                href="/book"
                className="flex items-center gap-2 rounded-full bg-lime px-7 py-4 text-sm font-bold text-forest transition hover:-translate-y-1 hover:bg-white"
              >

                Book Your Service

                <ArrowUpRight size={18} />

              </Link>

              <a
                href={`https://wa.me/${siteConfig.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >

                <MessageCircle size={17} />

                Contact Us

              </a>

            </div>

            <p className="mt-7 text-xs text-white/40">
              Currently serving {siteConfig.city}.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}