import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import { pricingPlans } from "@/config/pricing";

export default function Pricing() {
  return (
    <section className="section-pad bg-[#F0F1E7]">

      <div className="container-shell">

        {/* SECTION HEADING */}

        <div className="mx-auto mb-14 max-w-2xl text-center">

          <p className="eyebrow text-[#83A52B]">
            SIMPLE & FLEXIBLE PRICING
          </p>

          <h2 className="mt-5 text-4xl font-black leading-tight text-forest md:text-5xl">

            Help that fits your

            <span className="block font-medium italic text-[#83A52B]">
              household & budget.
            </span>

          </h2>

          <p className="mt-5 text-sm leading-7 text-muted">
            Whether you need occasional assistance or regular
            household support, choose the booking model that
            works best for you.
          </p>

        </div>

        {/* PRICING CARDS */}

        <div className="mx-auto grid max-w-4xl gap-7 md:grid-cols-2">

          {pricingPlans.map((plan) => (

            <div
              key={plan.id}
              className={`relative rounded-[28px] p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${
                plan.popular
                  ? "bg-forest text-white"
                  : "bg-white text-forest"
              }`}
            >

              {/* POPULAR BADGE */}

              {plan.popular && (
                <span className="absolute right-6 top-6 rounded-full bg-lime px-4 py-2 text-[10px] font-black uppercase tracking-wider text-forest">
                  Recommended
                </span>
              )}

              {/* ICON */}

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  plan.popular
                    ? "bg-lime text-forest"
                    : "bg-[#EAF0DF] text-forest"
                }`}
              >
                {plan.id === "one-time" ? (
                  <Clock size={23} />
                ) : (
                  <CalendarDays size={23} />
                )}
              </div>

              {/* PLAN DETAILS */}

              <h3 className="mt-7 text-2xl font-black">
                {plan.name}
              </h3>

              <p
                className={`mt-2 text-sm ${
                  plan.popular ? "text-white/60" : "text-muted"
                }`}
              >
                {plan.subtitle}
              </p>

              {/* BILLING MODEL */}

              <div className="mt-7 flex items-center gap-3">

                <Sparkles
                  size={19}
                  className={plan.popular ? "text-lime" : "text-[#83A52B]"}
                />

                <span className="text-3xl font-black">
                  {plan.billing}
                </span>

              </div>

              <p
                className={`mt-4 min-h-[72px] text-sm leading-6 ${
                  plan.popular ? "text-white/65" : "text-muted"
                }`}
              >
                {plan.description}
              </p>

              {/* FEATURES */}

              <div
                className={`my-7 border-t pt-6 ${
                  plan.popular
                    ? "border-white/15"
                    : "border-forest/10"
                }`}
              >

                <p className="mb-5 text-xs font-bold uppercase tracking-wider">
                  What's included
                </p>

                <div className="space-y-4">

                  {plan.features.map((feature) => (

                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >

                      <Check
                        size={17}
                        className={
                          plan.popular ? "text-lime" : "text-[#83A52B]"
                        }
                      />

                      <span
                        className={`text-sm ${
                          plan.popular ? "text-white/80" : "text-forest/75"
                        }`}
                      >
                        {feature}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

              {/* CTA */}

              <Link
                href={`/book?type=${plan.id}`}
                className={`flex items-center justify-between rounded-full px-6 py-4 text-sm font-bold transition ${
                  plan.popular
                    ? "bg-lime text-forest hover:bg-white"
                    : "bg-forest text-white hover:bg-[#19513E]"
                }`}
              >

                {plan.buttonText}

                <ArrowUpRight size={18} />

              </Link>

            </div>

          ))}

        </div>

        {/* PRICING NOTE */}

        <p className="mt-9 text-center text-xs leading-6 text-muted">
          Final charges depend on the selected service, duration,
          schedule and household requirements. Pricing will be
          confirmed with our team before booking is finalized.
        </p>

      </div>

    </section>
  );
}