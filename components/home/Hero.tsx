import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Star, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-cream py-14 md:py-20">

      <div className="container-shell grid items-center gap-12 lg:grid-cols-2">

        {/* LEFT CONTENT */}

        <div>

          {/* TRUST BADGE */}

          <div className="inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white px-4 py-2">

            <ShieldCheck size={15} className="text-[#8DAE28]" />

            <span className="text-xs font-bold text-forest">
              Trusted Home Services in {siteConfig.city}
            </span>

          </div>

          {/* MAIN HEADING */}

          <h1 className="mt-7 text-5xl font-black leading-[1.05] tracking-[-0.05em] text-forest sm:text-6xl xl:text-7xl">

            Come home to

            <span className="block italic font-medium text-[#83A52B]">
              spotless,
            </span>

            <span className="block">
              every single day.
            </span>

          </h1>

          {/* DESCRIPTION */}

          <p className="mt-7 max-w-lg text-sm leading-7 text-muted md:text-base">

            Reclaim your time with dependable household professionals.
            From home cleaning to laundry and personal cooking,
            we're here to make everyday life easier.

          </p>

          {/* BOOKING ACTIONS */}

          <div className="mt-8 flex flex-wrap gap-3">

            <Link
              href="/services"
              className="flex items-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-forest shadow-sm transition hover:-translate-y-1"
            >

              Explore Services

              <ArrowUpRight size={17} />

            </Link>

            <Link
              href="/book"
              className="flex items-center gap-2 rounded-full bg-lime px-6 py-4 text-sm font-bold text-forest transition hover:-translate-y-1"
            >

              Book Now

              <ArrowUpRight size={17} />

            </Link>

          </div>

          {/* TRUST INDICATORS */}

          <div className="mt-9 flex flex-wrap items-center gap-5">

            <div className="flex -space-x-3">

              <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-cream bg-[#D5B59A] text-sm">
                👨
              </div>

              <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-cream bg-[#D7E3B5] text-sm">
                👩
              </div>

              <div className="grid h-9 w-9 place-items-center rounded-full border-2 border-cream bg-[#E8C5A9] text-sm">
                👨
              </div>

            </div>

            <div>

              <div className="flex items-center gap-1">

                <Star size={13} className="fill-[#E9B93D] text-[#E9B93D]" />

                <Star size={13} className="fill-[#E9B93D] text-[#E9B93D]" />

                <Star size={13} className="fill-[#E9B93D] text-[#E9B93D]" />

                <Star size={13} className="fill-[#E9B93D] text-[#E9B93D]" />

                <Star size={13} className="fill-[#E9B93D] text-[#E9B93D]" />

              </div>

              <p className="mt-1 text-[11px] font-semibold text-muted">
                Your home deserves thoughtful care.
              </p>

            </div>

          </div>

        </div>


        {/* RIGHT VISUAL */}

        <div className="relative">

          {/* BACKGROUND DECORATION */}

          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-lime/40 blur-3xl" />

          <div className="relative min-h-[400px] overflow-hidden rounded-[32px] bg-[#DDE5D5] md:min-h-[510px]">

            {/* IMAGE PLACEHOLDER */}

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(145deg,#e9eee2,#b8cbb5)]">

              <Sparkles size={45} className="text-forest/50" />

              <p className="mt-4 text-sm font-bold text-forest">
                Your professional cleaning team
              </p>

              <p className="mt-2 text-xs text-forest/60">
                Hero image will be added here.
              </p>

            </div>

            {/* QUALITY CARD */}

            <div className="absolute right-5 top-5 max-w-[155px] rounded-2xl bg-lime p-4 shadow-lg">

              <p className="text-3xl font-black text-forest">
                ✦
              </p>

              <p className="mt-1 text-sm font-extrabold text-forest">
                Care you can count on.
              </p>

              <p className="mt-2 text-[10px] leading-4 text-forest/70">
                Household help coordinated around your needs.
              </p>

            </div>

            {/* BOTTOM CARD */}

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/50 bg-white/90 p-4 shadow-lg backdrop-blur-md">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted">
                    Your household, our priority
                  </p>

                  <p className="mt-1 text-sm font-extrabold text-forest">
                    A little help. A lot more time.
                  </p>

                </div>

                <div className="grid h-11 w-11 place-items-center rounded-full bg-lime text-forest">
                  <ShieldCheck size={22} />
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}