import Link from "next/link";
import {
  Star,
  MessageCircle,
  ArrowRight,
  Quote,
  Heart,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { services } from "@/config/services";

const reviews = [
  {
    name: "Priya Sharma",
    location: "Vrindavan",
    service: "Home Cleaning",
    rating: 5,
    date: "Sample Review",
    review:
      "The booking process was simple and convenient. I liked how the service requirements were discussed before confirmation.",
    initials: "PS",
  },
  {
    name: "Rahul Agarwal",
    location: "Vrindavan",
    service: "Laundry Services",
    rating: 5,
    date: "Sample Review",
    review:
      "Having household assistance arranged through one place sounds very convenient. The communication process was easy to understand.",
    initials: "RA",
  },
  {
    name: "Neha Gupta",
    location: "Vrindavan",
    service: "Personal Cooking",
    rating: 4,
    date: "Sample Review",
    review:
      "I appreciate the idea of having flexible household assistance according to individual requirements.",
    initials: "NG",
  },
  {
    name: "Amit Sharma",
    location: "Vrindavan",
    service: "Home Cleaning",
    rating: 5,
    date: "Sample Review",
    review:
      "The one-time and monthly options make it easier to understand different household service requirements.",
    initials: "AS",
  },
  {
    name: "Anjali Verma",
    location: "Vrindavan",
    service: "Personal Cooking",
    rating: 5,
    date: "Sample Review",
    review:
      "A service that considers personal household needs can make everyday routines easier to manage.",
    initials: "AV",
  },
  {
    name: "Rohit Jain",
    location: "Vrindavan",
    service: "Laundry Services",
    rating: 4,
    date: "Sample Review",
    review:
      "The service categories are easy to understand, and having a direct communication option is helpful.",
    initials: "RJ",
  },
];

const ratingOptions = [5, 4, 3, 2, 1];

export default function ReviewsPage() {
  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-cream py-20">
          <div className="container-shell text-center">
            <span className="eyebrow text-forest">
              CUSTOMER EXPERIENCES
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight text-ink md:text-6xl">
              Every home has its own story.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
              We believe good household assistance starts with
              understanding people's needs and making everyday
              responsibilities easier.
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white px-5 py-3 text-sm font-medium text-forest">
              <Sparkles size={17} />
              Review page preview — sample content
            </div>
          </div>
        </section>

        {/* Review Summary */}
        <section className="bg-white py-12">
          <div className="container-shell">
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="rounded-3xl bg-cream p-7 text-center">
                <Star
                  size={27}
                  className="mx-auto fill-lime text-forest"
                />

                <h2 className="mt-3 text-2xl font-bold text-ink">
                  Sample Ratings
                </h2>

                <p className="mt-2 text-sm text-muted">
                  Illustrative rating display
                </p>
              </div>

              <div className="rounded-3xl bg-cream p-7 text-center">
                <Heart
                  size={27}
                  className="mx-auto text-forest"
                />

                <h2 className="mt-3 text-2xl font-bold text-ink">
                  Customer First
                </h2>

                <p className="mt-2 text-sm text-muted">
                  Understanding household needs
                </p>
              </div>

              <div className="rounded-3xl bg-cream p-7 text-center">
                <MessageCircle
                  size={27}
                  className="mx-auto text-forest"
                />

                <h2 className="mt-3 text-2xl font-bold text-ink">
                  Direct Feedback
                </h2>

                <p className="mt-2 text-sm text-muted">
                  Feedback through our team
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="section-pad bg-cream">
          <div className="container-shell">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <span className="eyebrow text-forest">
                  SAMPLE REVIEW CARDS
                </span>

                <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                  What customers might share.
                </h2>

                <p className="mt-3 text-sm text-muted">
                  All entries below are fictional design examples,
                  not verified customer testimonials.
                </p>
              </div>

              <span className="w-fit rounded-full bg-lime px-4 py-2 text-xs font-bold text-forest">
                DEMO CONTENT
              </span>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((review, index) => (
                <article
                  key={index}
                  className="rounded-[28px] border border-black/5 bg-white p-7 transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <Quote
                      size={29}
                      className="text-forest/30"
                    />

                    <span className="rounded-full bg-[#DCE8D7] px-3 py-1 text-xs font-semibold text-forest">
                      Demo
                    </span>
                  </div>

                  <div className="mt-5 flex gap-1">
                    {ratingOptions.slice(0, review.rating).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-[#E9B949] text-[#E9B949]"
                      />
                    ))}
                  </div>

                  <p className="mt-5 min-h-[120px] leading-7 text-muted">
                    "{review.review}"
                  </p>

                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-sm font-bold text-white">
                        {review.initials}
                      </div>

                      <div>
                        <h3 className="font-bold text-ink">
                          {review.name}
                        </h3>

                        <p className="text-xs text-muted">
                          {review.location} · {review.date}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-xs font-semibold text-forest">
                      {review.service}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="section-pad bg-white">
          <div className="container-shell">
            <div className="text-center">
              <span className="eyebrow text-forest">
                EXPLORE OUR SERVICES
              </span>

              <h2 className="mt-4 text-3xl font-bold text-ink md:text-4xl">
                Find assistance for your home.
              </h2>
            </div>

            <div className="mt-9 flex flex-wrap justify-center gap-4">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="rounded-full border border-forest/20 px-6 py-3 font-semibold text-forest transition hover:bg-forest hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-forest py-16 text-center text-white">
          <div className="container-shell">
            <h2 className="text-3xl font-bold md:text-4xl">
              Experience household assistance made easier.
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-white/70">
              Explore our services and tell us what your household needs.
            </p>

            <Link
              href="/book"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 font-bold text-forest transition hover:scale-105"
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