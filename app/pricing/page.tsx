import Link from "next/link";
import {
  Check,
  Clock,
  CalendarDays,
  ArrowRight,
  HelpCircle,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { pricingPlans } from "@/config/pricing";
import { services } from "@/config/services";

const faqs = [
  {
    question: "How does one-time service pricing work?",
    answer:
      "One-time services follow an hourly pricing model. The final amount depends on the selected service, duration and requirements.",
  },
  {
    question: "What is a monthly service plan?",
    answer:
      "Monthly services are designed for households that need recurring assistance. The schedule and monthly charges are discussed according to your requirements.",
  },
  {
    question: "Are the prices the same for every service?",
    answer:
      "Not necessarily. Charges may vary depending on the service, duration, schedule and household requirements.",
  },
  {
    question: "When do I pay?",
    answer:
      "Payment arrangements are communicated by our team during booking confirmation, before the service is finalized.",
  },
  {
    question: "Can I change my service requirements?",
    answer:
      "You can discuss your requirements with our team. Changes are subject to availability and confirmation.",
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-cream py-20">
          <div className="container-shell">
            <span className="eyebrow text-forest">
              SIMPLE PRICING
            </span>

            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-ink md:text-6xl">
              Flexible assistance. Pricing that makes sense.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Whether you need occasional household assistance or
              recurring support, choose the service arrangement
              that works for your home.
            </p>

            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 font-semibold text-white transition hover:bg-[#1b5743]"
            >
              Explore Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="section-pad bg-white">
          <div className="container-shell">
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow text-forest">
                CHOOSE YOUR PLAN
              </span>

              <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                Two ways to get started.
              </h2>

              <p className="mt-4 leading-7 text-muted">
                Select a one-time service or discuss a recurring
                monthly arrangement with our team.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-5xl gap-7 md:grid-cols-2">
              {pricingPlans.map((plan) => {
                const isMonthly = plan.id === "monthly";

                return (
                  <div
                    key={plan.id}
                    className={`relative rounded-[30px] border p-8 md:p-10 ${
                      isMonthly
                        ? "border-forest bg-forest text-white shadow-soft"
                        : "border-gray-100 bg-cream text-ink"
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute right-7 top-7 rounded-full bg-lime px-4 py-2 text-xs font-bold text-forest">
                        RECOMMENDED
                      </span>
                    )}

                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                        isMonthly ? "bg-white/10" : "bg-[#DCE8D7]"
                      }`}
                    >
                      {isMonthly ? (
                        <CalendarDays className="text-lime" size={26} />
                      ) : (
                        <Clock className="text-forest" size={26} />
                      )}
                    </div>

                    <h3 className="mt-7 text-2xl font-bold">
                      {plan.name}
                    </h3>

                    <p
                      className={`mt-2 ${
                        isMonthly ? "text-white/60" : "text-muted"
                      }`}
                    >
                      {plan.subtitle}
                    </p>

                    <div className="mt-8">
                      <span
                        className={`text-sm ${
                          isMonthly ? "text-white/60" : "text-muted"
                        }`}
                      >
                        Billing model
                      </span>

                      <p
                        className={`mt-2 text-4xl font-bold ${
                          isMonthly ? "text-lime" : "text-forest"
                        }`}
                      >
                        {plan.billing}
                      </p>
                    </div>

                    <p
                      className={`mt-5 leading-7 ${
                        isMonthly ? "text-white/70" : "text-muted"
                      }`}
                    >
                      {plan.description}
                    </p>

                    <div className="my-8 h-px bg-current opacity-10" />

                    <div className="space-y-4">
                      {plan.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3"
                        >
                          <Check
                            size={19}
                            className={`mt-0.5 shrink-0 ${
                              isMonthly ? "text-lime" : "text-forest"
                            }`}
                          />

                          <span
                            className={`text-sm ${
                              isMonthly ? "text-white/80" : "text-ink"
                            }`}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={`/book?type=${plan.id}`}
                      className={`mt-10 flex items-center justify-center gap-3 rounded-full px-6 py-4 font-bold transition hover:scale-[1.02] ${
                        isMonthly
                          ? "bg-lime text-forest"
                          : "bg-forest text-white"
                      }`}
                    >
                      {plan.buttonText}
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                );
              })}
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-muted">
              Final charges will be shared with you before confirmation.
              They depend on the selected service, duration, schedule
              and household requirements.
            </p>
          </div>
        </section>

        {/* Available Services */}
        <section className="section-pad bg-cream">
          <div className="container-shell">
            <div className="max-w-2xl">
              <span className="eyebrow text-forest">
                AVAILABLE CATEGORIES
              </span>

              <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                What can you book?
              </h2>
            </div>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="group flex items-center justify-between rounded-2xl bg-white p-6 transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <div>
                    <h3 className="font-bold text-ink">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted">
                      Explore service details
                    </p>
                  </div>

                  <ArrowRight
                    size={20}
                    className="text-forest transition group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="section-pad bg-white">
          <div className="container-shell">
            <div className="mx-auto max-w-2xl text-center">
              <HelpCircle
                size={35}
                className="mx-auto text-forest"
              />

              <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                Pricing FAQs
              </h2>

              <p className="mt-4 text-muted">
                A few common questions about our pricing arrangements.
              </p>
            </div>

            <div className="mx-auto mt-10 max-w-3xl space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-gray-100 p-6"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink">
                    {faq.question}

                    <span className="text-xl text-forest transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="mt-4 leading-7 text-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-forest py-16 text-white">
          <div className="container-shell text-center">
            <Sparkles
              size={32}
              className="mx-auto text-lime"
            />

            <h2 className="mt-5 text-3xl font-bold md:text-4xl">
              Not sure which plan is right?
            </h2>

            <p className="mt-4 text-white/70">
              Talk to our team about your household requirements.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 font-bold text-forest"
            >
              <MessageCircle size={18} />
              Contact Our Team
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}