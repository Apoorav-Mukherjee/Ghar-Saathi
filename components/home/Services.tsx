import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  Shirt,
  ChefHat,
  CheckCircle2,
} from "lucide-react";

import { services } from "@/config/services";

const serviceIcons = {
  sparkles: Sparkles,
  shirt: Shirt,
  chef: ChefHat,
};

export default function Services() {
  return (
    <section className="section-pad bg-cream" id="services">

      <div className="container-shell">

        {/* SECTION HEADING */}

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="eyebrow text-[#83A52B]">
              WHAT WE OFFER
            </p>

            <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-tight text-forest md:text-5xl">

              Household help for

              <span className="font-medium italic text-[#83A52B]">
                {" "}every need.
              </span>

            </h2>

          </div>

          <p className="max-w-sm text-sm leading-7 text-muted">
            From keeping your home spotless to preparing everyday
            meals, discover assistance that makes life easier.
          </p>

        </div>

        {/* SERVICE CARDS */}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service) => {

            const Icon =
              serviceIcons[service.icon as keyof typeof serviceIcons];

            return (

              <article
                key={service.id}
                className="group overflow-hidden rounded-[26px] bg-white p-3 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-soft"
              >

                {/* VISUAL AREA */}

                <div
                  className={`relative flex h-52 items-center justify-center overflow-hidden rounded-[20px] ${service.color}`}
                >

                  <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30 blur-2xl" />

                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white/75 shadow-sm transition duration-500 group-hover:scale-110">

                    <Icon
                      size={52}
                      strokeWidth={1.4}
                      className="text-forest"
                    />

                  </div>

                  <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-forest">
                    {service.id === "cleaning"
                      ? "Home care"
                      : service.id === "laundry"
                        ? "Clothing care"
                        : "Kitchen care"}
                  </span>

                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-lime text-forest">
                    <ArrowUpRight size={18} />
                  </span>

                </div>

                {/* CARD CONTENT */}

                <div className="p-4">

                  <h3 className="text-xl font-black tracking-tight text-forest">
                    {service.title}
                  </h3>

                  <p className="mt-2 text-xs font-semibold text-[#83A52B]">
                    {service.subtitle}
                  </p>

                  <p className="mt-4 min-h-[60px] text-sm leading-6 text-muted">
                    {service.description}
                  </p>

                  {/* SERVICE FEATURES */}

                  <div className="mt-5 space-y-3">

                    {service.offerings.slice(0, 3).map((offering) => (

                      <div
                        key={offering}
                        className="flex items-center gap-2"
                      >

                        <CheckCircle2
                          size={15}
                          className="shrink-0 text-[#83A52B]"
                        />

                        <span className="text-xs font-medium text-forest/75">
                          {offering}
                        </span>

                      </div>

                    ))}

                  </div>

                  {/* EXPLORE BUTTON */}

                  <Link
                    href={service.href}
                    className="mt-7 flex items-center justify-between rounded-full bg-forest px-5 py-4 text-sm font-bold text-white transition hover:bg-[#19513E]"
                  >

                    Explore Service

                    <ArrowUpRight size={17} />

                  </Link>

                </div>

              </article>

            );
          })}

        </div>

      </div>

    </section>
  );
}
