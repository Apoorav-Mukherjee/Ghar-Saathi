import Link from "next/link";
import {
  Search,
  ClipboardList,
  MessageCircle,
  CalendarCheck,
  UserCheck,
  House,
  Star,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Explore Our Services",
    description:
      "Browse our cleaning, laundry and personal cooking services. Choose the assistance that suits your household.",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Submit Your Booking",
    description:
      "Select your service type, preferred schedule, location and household requirements through our booking form.",
  },
  {
    number: "03",
    icon: MessageCircle,
    title: "Connect on WhatsApp",
    description:
      "Your booking details are shared with our team so we can discuss your requirements and coordinate the next steps.",
  },
  {
    number: "04",
    icon: CalendarCheck,
    title: "Confirm Availability",
    description:
      "Our team checks service availability, discusses applicable charges and confirms the arrangements with you.",
  },
  {
    number: "05",
    icon: UserCheck,
    title: "Professional Coordination",
    description:
      "Once arrangements are confirmed, we coordinate with the assigned household professional regarding the service and location.",
  },
  {
    number: "06",
    icon: House,
    title: "Service at Your Home",
    description:
      "The professional visits your home at the agreed time and carries out the confirmed household service.",
  },
  {
    number: "07",
    icon: Star,
    title: "Feedback & Completion",
    description:
      "After the service, we collect your feedback and coordinate the completion and professional payment process.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-cream py-20">
          <div className="container-shell">
            <span className="eyebrow text-forest">
              SIMPLE & CONVENIENT
            </span>

            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-ink md:text-6xl">
              From booking to doorstep assistance.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Getting household assistance should be straightforward.
              Here's how {siteConfig.name} coordinates your service
              from the first enquiry to completion.
            </p>

            <Link
              href="/book"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 font-semibold text-white transition hover:bg-[#1b5743]"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Steps */}
        <section className="section-pad bg-white">
          <div className="container-shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow text-forest">
                YOUR SERVICE JOURNEY
              </span>

              <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                Seven simple steps.
              </h2>

              <p className="mt-4 leading-7 text-muted">
                Here's what happens when you request a household service
                through our platform.
              </p>
            </div>

            <div className="relative mx-auto mt-16 max-w-3xl">
              {/* Timeline line */}
              <div className="absolute bottom-10 left-7 top-10 hidden w-px bg-[#DCE8D7] sm:block" />

              <div className="space-y-8">
                {steps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.number}
                      className="relative flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm transition hover:shadow-soft sm:flex-row sm:items-start sm:p-8"
                    >
                      <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#DCE8D7]">
                        <Icon
                          size={25}
                          className="text-forest"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-sm font-bold tracking-widest text-forest">
                            STEP {step.number}
                          </span>

                          {step.number === "03" && (
                            <span className="rounded-full bg-lime px-3 py-1 text-xs font-bold text-forest">
                              WHATSAPP
                            </span>
                          )}
                        </div>

                        <h3 className="mt-2 text-xl font-bold text-ink">
                          {step.title}
                        </h3>

                        <p className="mt-3 leading-7 text-muted">
                          {step.description}
                        </p>
                      </div>

                      <span className="hidden text-3xl font-bold text-gray-100 sm:block">
                        {step.number}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Important Information */}
        <section className="section-pad bg-cream">
          <div className="container-shell grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <span className="eyebrow text-forest">
                BEFORE YOU BOOK
              </span>

              <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                A few things worth knowing.
              </h2>

              <p className="mt-4 leading-7 text-muted">
                We want you to know what to expect before requesting
                a household service.
              </p>
            </div>

            <div className="space-y-5">
              {[
                "Submitting a booking request does not automatically confirm a service.",
                "Availability is checked according to your location and preferred schedule.",
                "Final charges are communicated before the service is confirmed.",
                "Service arrangements are coordinated through our team.",
              ].map((item) => (
                <div key={item} className="flex gap-4">
                  <CheckCircle2
                    size={22}
                    className="mt-1 shrink-0 text-forest"
                  />

                  <p className="leading-7 text-ink">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-forest py-16 text-white">
          <div className="container-shell text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              Ready to make your home life easier?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-white/70">
              Explore our household services and send us your booking
              requirements.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/services"
                className="rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Explore Services
              </Link>

              <Link
                href="/book"
                className="inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 font-bold text-forest transition hover:scale-105"
              >
                Book a Service
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}