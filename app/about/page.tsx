import Link from "next/link";
import {
  HeartHandshake,
  ShieldCheck,
  Clock,
  MapPin,
  ArrowRight,
  House,
  Users,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

const values = [
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "We aim to understand each household's needs and coordinate services accordingly.",
  },
  {
    icon: Clock,
    title: "Convenience",
    description:
      "Flexible one-time and recurring service options to make household management easier.",
  },
  {
    icon: ShieldCheck,
    title: "Clear Communication",
    description:
      "We keep customers informed about booking details, availability and service coordination.",
  },
  {
    icon: Users,
    title: "Managed Assistance",
    description:
      "Our company coordinates household professionals and customer requirements.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-cream py-20">
          <div className="container-shell">
            <span className="eyebrow text-forest">
              ABOUT {siteConfig.name.toUpperCase()}
            </span>

            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-ink md:text-6xl">
              Making everyday household tasks easier.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              {siteConfig.name} is a household services company focused on
              connecting families with coordinated assistance for cleaning,
              laundry and personal cooking needs.
            </p>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 font-semibold text-white transition hover:bg-[#1b5743]"
            >
              Explore Our Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Company Introduction */}
        <section className="section-pad bg-white">
          <div className="container-shell grid items-center gap-12 md:grid-cols-2">
            <div className="flex min-h-[320px] items-center justify-center rounded-[32px] bg-[#DCE8D7]">
              <House size={120} strokeWidth={1.2} className="text-forest" />
            </div>

            <div>
              <span className="eyebrow text-forest">
                WHO WE ARE
              </span>

              <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                Household assistance, coordinated with care.
              </h2>

              <p className="mt-5 leading-8 text-muted">
                Managing a home takes time and effort. Our goal is to make
                that responsibility easier by coordinating household
                assistance around the needs of each customer.
              </p>

              <p className="mt-4 leading-8 text-muted">
                Starting in {siteConfig.city}, we aim to make booking
                household services straightforward, with clear communication
                from the initial enquiry to service completion.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-pad bg-cream">
          <div className="container-shell">
            <div className="max-w-2xl">
              <span className="eyebrow text-forest">
                WHAT MATTERS TO US
              </span>

              <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                The principles behind our service.
              </h2>

              <p className="mt-4 leading-7 text-muted">
                We want every customer interaction to be simple,
                transparent and convenient.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <div
                    key={value.title}
                    className="rounded-3xl border border-black/5 bg-white p-7"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCE8D7]">
                      <Icon size={23} className="text-forest" />
                    </div>

                    <h3 className="text-xl font-bold text-ink">
                      {value.title}
                    </h3>

                    <p className="mt-3 leading-7 text-muted">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="bg-forest py-16 text-white">
          <div className="container-shell flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-lime">
                <MapPin size={18} />
                <span className="eyebrow">OUR SERVICE AREA</span>
              </div>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Starting with {siteConfig.city}.
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-white/70">
                We are beginning our operations in {siteConfig.city}.
                Service availability depends on the location and booking
                requirements.
              </p>
            </div>

            <Link
              href="/book"
              className="inline-flex shrink-0 items-center gap-3 rounded-full bg-lime px-7 py-4 font-bold text-forest transition hover:scale-105"
            >
              Book a Service
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}