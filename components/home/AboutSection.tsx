import Link from "next/link";
import {
  ShieldCheck,
  Clock,
  Users,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Managed professionals",
    description:
      "Our company coordinates household professionals for your service requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Clear expectations",
    description:
      "Understand the service scope, pricing and schedule before confirming.",
  },
  {
    icon: Clock,
    title: "Flexible scheduling",
    description:
      "Choose one-time assistance or recurring household support.",
  },
  {
    icon: HeartHandshake,
    title: "Personal coordination",
    description:
      "Our team stays connected with you throughout the booking process.",
  },
];

export default function AboutSection() {
  return (
    <section className="section-pad bg-cream">

      <div className="container-shell grid items-center gap-14 lg:grid-cols-2">

        {/* LEFT VISUAL AREA */}

        <div className="grid grid-cols-2 gap-4">

          <div className="flex min-h-[260px] items-center justify-center rounded-[28px] bg-[#DCE5D5] p-6 text-center">

            <div>

              <span className="text-5xl">🏡</span>

              <h3 className="mt-5 text-lg font-black text-forest">
                A happier home
              </h3>

              <p className="mt-2 text-xs leading-5 text-forest/65">
                More time for the things that matter.
              </p>

            </div>

          </div>

          <div className="flex min-h-[260px] items-center justify-center rounded-[28px] bg-lime p-6 text-center">

            <div>

              <span className="text-5xl">✨</span>

              <h3 className="mt-5 text-lg font-black text-forest">
                Thoughtful care
              </h3>

              <p className="mt-2 text-xs leading-5 text-forest/65">
                Household assistance made simpler.
              </p>

            </div>

          </div>

          <div className="col-span-2 rounded-[28px] bg-forest p-7 text-white">

            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
              OUR PROMISE
            </p>

            <h3 className="mt-3 max-w-lg text-2xl font-black leading-tight sm:text-3xl">
              Your home deserves care, not complications.
            </h3>

          </div>

        </div>

        {/* RIGHT CONTENT */}

        <div>

          <p className="eyebrow text-[#83A52B]">
            ABOUT OUR COMPANY
          </p>

          <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-forest md:text-5xl">

            Where household help meets

            <span className="italic text-[#83A52B]">
              {" "}reliability.
            </span>

          </h2>

          <p className="mt-6 text-sm leading-7 text-muted">

            Managing a household takes time, energy and attention.
            We want to make that easier by connecting families
            with household professionals through a simple,
            organized service experience.

          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">

            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title} className="flex gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-forest text-lime">

                    <Icon size={19} />

                  </div>

                  <div>

                    <h3 className="text-sm font-extrabold text-forest">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-muted">
                      {benefit.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>

          <Link
            href="/about"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-1"
          >

            Learn more about us

            <ArrowUpRight size={17} />

          </Link>

        </div>

      </div>

    </section>
  );
}