import Link from "next/link";
import {
  Sparkles,
  Shirt,
  ChefHat,
  ArrowRight,
  CheckCircle2,
  Clock,
  CalendarDays,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { services } from "@/config/services";

const serviceIcons = {
  cleaning: Sparkles,
  laundry: Shirt,
  cooking: ChefHat,
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-cream py-20">
          <div className="container-shell">
            <span className="eyebrow text-forest">
              OUR HOUSEHOLD SERVICES
            </span>

            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-ink md:text-6xl">
              A little help can make a big difference.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              From keeping your home clean to managing everyday laundry
              and cooking needs, explore household assistance designed
              around your requirements.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#available-services"
                className="inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 font-semibold text-white transition hover:bg-[#1b5743]"
              >
                Explore Services
                <ArrowRight size={18} />
              </a>

              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-3 rounded-full border border-forest px-7 py-4 font-semibold text-forest transition hover:bg-white"
              >
                How It Works
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section
          id="available-services"
          className="section-pad bg-white"
        >
          <div className="container-shell">
            <div className="max-w-2xl">
              <span className="eyebrow text-forest">
                WHAT WE OFFER
              </span>

              <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                Household assistance for everyday needs.
              </h2>

              <p className="mt-4 leading-7 text-muted">
                Explore our available service categories and find
                the assistance that suits your household.
              </p>
            </div>

            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => {
                const Icon =
                  serviceIcons[
                    service.id as keyof typeof serviceIcons
                  ];

                return (
                  <article
                    key={service.id}
                    className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-soft"
                  >
                    {/* Visual */}
                    <div
                      className={`flex h-52 items-center justify-center ${service.color}`}
                    >
                      <Icon
                        size={90}
                        strokeWidth={1.2}
                        className="text-forest transition duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-7">
                      <h3 className="text-2xl font-bold text-ink">
                        {service.title}
                      </h3>

                      <p className="mt-2 font-medium text-forest">
                        {service.subtitle}
                      </p>

                      <p className="mt-4 text-sm leading-7 text-muted">
                        {service.description}
                      </p>

                      <div className="mt-6 space-y-3">
                        {service.offerings.slice(0, 3).map((offering) => (
                          <div
                            key={offering}
                            className="flex items-center gap-3 text-sm text-ink"
                          >
                            <CheckCircle2
                              size={17}
                              className="shrink-0 text-forest"
                            />
                            {offering}
                          </div>
                        ))}
                      </div>

                      <Link
                        href={service.href}
                        className="mt-8 flex items-center justify-between border-t border-gray-100 pt-5 font-semibold text-forest"
                      >
                        Explore Service
                        <ArrowRight
                          size={19}
                          className="transition group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Service Types */}
        <section className="section-pad bg-cream">
          <div className="container-shell">
            <div className="max-w-2xl">
              <span className="eyebrow text-forest">
                FLEXIBLE SERVICE OPTIONS
              </span>

              <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                Choose how you want household assistance.
              </h2>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl bg-white p-8">
                <Clock size={30} className="text-forest" />

                <h3 className="mt-5 text-2xl font-bold text-ink">
                  One-Time Service
                </h3>

                <p className="mt-3 leading-7 text-muted">
                  Need assistance occasionally? Choose a specific
                  household service and pay according to the
                  service duration.
                </p>

                <p className="mt-5 font-semibold text-forest">
                  Hourly pricing model
                </p>

                <Link
                  href="/pricing"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-forest"
                >
                  View Pricing <ArrowRight size={17} />
                </Link>
              </div>

              <div className="rounded-3xl bg-forest p-8 text-white">
                <CalendarDays size={30} className="text-lime" />

                <h3 className="mt-5 text-2xl font-bold">
                  Monthly Service
                </h3>

                <p className="mt-3 leading-7 text-white/70">
                  Looking for recurring household assistance?
                  Explore monthly service arrangements based on
                  your household requirements.
                </p>

                <p className="mt-5 font-semibold text-lime">
                  Monthly subscription model
                </p>

                <Link
                  href="/pricing"
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-lime"
                >
                  View Pricing <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-white py-16">
          <div className="container-shell text-center">
            <h2 className="text-3xl font-bold text-ink md:text-4xl">
              Found the help you're looking for?
            </h2>

            <p className="mt-4 text-muted">
              Explore your options and get started with a booking enquiry.
            </p>

            <Link
              href="/book"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-forest px-8 py-4 font-semibold text-white transition hover:bg-[#1b5743]"
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