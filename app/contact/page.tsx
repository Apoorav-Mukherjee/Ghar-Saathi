"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Send,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    message: "",
  });

  const whatsappLink = `https://wa.me/${siteConfig.whatsapp}`;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const message = `
Hello ${siteConfig.name}!

Name: ${form.name}
Phone: ${form.phone}
Subject: ${form.subject}

Message:
${form.message}
    `;

    const url = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  }

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="bg-cream py-16">
          <div className="container-shell">
            <span className="eyebrow text-forest">
              GET IN TOUCH
            </span>

            <h1 className="mt-5 text-4xl font-bold text-ink md:text-6xl">
              We're here to help.
            </h1>

            <p className="mt-5 max-w-xl leading-8 text-muted">
              Have questions about our household services or need help
              with a booking? Contact our team and we'll help you.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="section-pad bg-white">
          <div className="container-shell grid gap-12 lg:grid-cols-5">

            {/* Contact Information */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-ink">
                Contact Information
              </h2>

              <p className="mt-3 leading-7 text-muted">
                Choose whichever contact method is most convenient for you.
              </p>

              <div className="mt-8 space-y-6">

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCE8D7]">
                    <MessageCircle className="text-forest" />
                  </div>

                  <div>
                    <p className="font-semibold text-ink">WhatsApp</p>
                    <p className="text-sm text-muted">
                      Chat with our team
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${siteConfig.phone}`}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCE8D7]">
                    <Phone className="text-forest" />
                  </div>

                  <div>
                    <p className="font-semibold text-ink">Phone</p>
                    <p className="text-sm text-muted">
                      {siteConfig.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCE8D7]">
                    <Mail className="text-forest" />
                  </div>

                  <div>
                    <p className="font-semibold text-ink">Email</p>
                    <p className="text-sm text-muted">
                      {siteConfig.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCE8D7]">
                    <MapPin className="text-forest" />
                  </div>

                  <div>
                    <p className="font-semibold text-ink">Location</p>
                    <p className="text-sm text-muted">
                      {siteConfig.city}, Uttar Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCE8D7]">
                    <Clock className="text-forest" />
                  </div>

                  <div>
                    <p className="font-semibold text-ink">Availability</p>
                    <p className="text-sm text-muted">
                      Contact us for service timings.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Enquiry Form */}
            <div className="rounded-[32px] bg-cream p-7 md:p-10 lg:col-span-3">
              <h2 className="text-2xl font-bold text-ink">
                Send us an enquiry
              </h2>

              <p className="mt-3 text-sm leading-7 text-muted">
                Fill in the details below. Your message will be prepared
                in WhatsApp so you can send it to our team.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Your Name
                  </label>

                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Phone Number
                  </label>

                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="10-digit mobile number"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none focus:border-forest"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Subject
                  </label>

                  <select
                    required
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none focus:border-forest"
                  >
                    <option value="">Select a subject</option>
                    <option value="Service enquiry">Service enquiry</option>
                    <option value="Booking assistance">Booking assistance</option>
                    <option value="Pricing enquiry">Pricing enquiry</option>
                    <option value="General question">General question</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Your Message
                  </label>

                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    placeholder="How can we help you?"
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none focus:border-forest"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-forest px-7 py-4 font-semibold text-white transition hover:bg-[#1b5743]"
                >
                  Continue to WhatsApp
                  <Send size={18} />
                </button>

              </form>
            </div>

          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-forest py-14 text-center text-white">
          <div className="container-shell">
            <h2 className="text-3xl font-bold">
              Looking for household assistance?
            </h2>

            <p className="mt-3 text-white/70">
              Explore our services and find the right assistance for your home.
            </p>

            <Link
              href="/services"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-lime px-7 py-4 font-bold text-forest"
            >
              Explore Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}