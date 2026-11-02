import Link from "next/link";
import {
  Search,
  ClipboardList,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose your service",
    description:
      "Explore our cleaning, laundry and cooking services. Select what your household needs.",
    icon: Search,
  },
  {
    number: "02",
    title: "Submit your booking",
    description:
      "Choose your service type, preferred date and schedule. Fill in your household details.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Connect on WhatsApp",
    description:
      "Our team contacts you to confirm availability, discuss payment and coordinate your service.",
    icon: MessageCircle,
  },
];

export default function HowItWorks() {
  return (
    <section className="overflow-hidden rounded-t-[35px] bg-forest py-20 md:rounded-t-[50px]">

      <div className="container-shell">

        {/* SECTION HEADING */}

        <div className="mb-14">

          <p className="eyebrow text-lime">
            HOW IT WORKS
          </p>

          <h2 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">

            Three simple steps to a

            <span className="block font-medium italic text-lime">
              happier household.
            </span>

          </h2>

        </div>

        {/* CONTENT GRID */}

        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">

          {/* LEFT SIDE STEPS */}

          <div className="space-y-4">

            {steps.map((step) => {

              const Icon = step.icon;

              return (

                <div
                  key={step.number}
                  className="group flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:bg-white/10"
                >

                  {/* STEP NUMBER */}

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-lime text-lg font-black text-forest">

                    {step.number}

                  </div>

                  {/* STEP INFORMATION */}

                  <div className="flex-1">

                    <div className="flex items-center justify-between">

                      <h3 className="text-lg font-extrabold text-white">
                        {step.title}
                      </h3>

                      <Icon
                        size={20}
                        className="text-lime"
                      />

                    </div>

                    <p className="mt-3 text-sm leading-6 text-white/65">
                      {step.description}
                    </p>

                  </div>

                </div>

              );
            })}

            {/* BOOKING CTA */}

            <Link
              href="/book"
              className="inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 text-sm font-bold text-forest transition hover:-translate-y-1"
            >

              Start Your Booking

              <ArrowUpRight size={18} />

            </Link>

          </div>

          {/* RIGHT VISUAL */}

          <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-[30px] bg-[#DCE8D7] p-8">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-lime/40 blur-3xl" />

            <div className="relative w-full max-w-sm rounded-[25px] bg-white p-7 shadow-soft">

              <div className="flex items-center justify-between">

                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  Booking overview
                </p>

                <span className="rounded-full bg-lime/40 px-3 py-1 text-[10px] font-bold text-forest">
                  Simple process
                </span>

              </div>

              <h3 className="mt-7 text-2xl font-black text-forest">
                Your home, taken care of.
              </h3>

              <div className="mt-7 space-y-5">

                {[
                  "Service selected",
                  "Booking details submitted",
                  "WhatsApp confirmation",
                  "Professional assigned",
                ].map((item, index) => (

                  <div key={item} className="flex items-center gap-4">

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-forest text-sm font-bold text-lime">
                      {index + 1}
                    </div>

                    <p className="text-sm font-semibold text-forest">
                      {item}
                    </p>

                  </div>

                ))}

              </div>

              <div className="mt-8 rounded-xl bg-[#F1F3E9] p-4">

                <p className="text-xs leading-5 text-forest/70">
                  Our team coordinates the details with you before
                  your household professional is assigned.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}