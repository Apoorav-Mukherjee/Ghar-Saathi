import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Sparkles,
  Shirt,
  ChefHat,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { services } from "@/config/services";

const serviceIcons = {
  cleaning: Sparkles,
  laundry: Shirt,
  cooking: ChefHat,
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = services.find((item) => item.id === slug);

  if (!service) {
    notFound();
  }

  const Icon =
    serviceIcons[service.id as keyof typeof serviceIcons];

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="bg-cream py-20">
          <div className="container-shell">

            <Link
              href="/services"
              className="mb-10 inline-flex items-center gap-2 text-sm text-muted hover:text-forest"
            >
              <ArrowLeft size={16} />
              All Services
            </Link>

            <div className="grid items-center gap-12 md:grid-cols-2">

              <div>
                <span className="eyebrow text-forest">
                  GHAR SAATHI SERVICES
                </span>

                <h1 className="mt-5 text-4xl font-bold leading-tight text-ink md:text-6xl">
                  {service.title}
                </h1>

                <p className="mt-4 text-xl font-medium text-forest">
                  {service.subtitle}
                </p>

                <p className="mt-5 max-w-lg leading-8 text-muted">
                  {service.description}
                </p>

                <Link
                  href={`/book?service=${service.id}`}
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-forest px-7 py-4 font-semibold text-white transition hover:bg-[#1b5743]"
                >
                  Book This Service
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className={`flex min-h-[320px] items-center justify-center rounded-[32px] ${service.color}`}>
                <Icon size={110} strokeWidth={1.2} className="text-forest" />
              </div>

            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="section-pad bg-white">
          <div className="container-shell">

            <div className="max-w-2xl">
              <span className="eyebrow text-forest">
                SERVICE DETAILS
              </span>

              <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                What can you expect?
              </h2>

              <p className="mt-4 leading-7 text-muted">
                Explore the assistance available under this service.
                Final requirements will be discussed during booking.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">

              {service.offerings.map((offering) => (
                <div
                  key={offering}
                  className="flex items-center gap-4 rounded-2xl border border-gray-100 p-5"
                >
                  <CheckCircle2
                    size={22}
                    className="shrink-0 text-forest"
                  />

                  <span className="font-medium text-ink">
                    {offering}
                  </span>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section className="bg-forest py-16 text-white">
          <div className="container-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

            <div>
              <h2 className="text-3xl font-bold">
                Need help with your home?
              </h2>

              <p className="mt-3 text-white/70">
                Tell us what you need. We'll help coordinate your service.
              </p>
            </div>

            <Link
              href={`/book?service=${service.id}`}
              className="inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 font-bold text-forest transition hover:scale-105"
            >
              Book Now
              <ArrowRight size={18} />
            </Link>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}