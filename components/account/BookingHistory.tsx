"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarDays,
  ArrowRight,
  Clock,
} from "lucide-react";

type Booking = {
  bookingId: string;
  service: string;
  plan: string;
  location: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
};

const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-blue-50 text-blue-700",
  assigned: "bg-purple-50 text-purple-700",
  "in-progress": "bg-indigo-50 text-indigo-700",
  completed: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function BookingHistory() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await fetch("/api/bookings");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Unable to load bookings.");
        }

        setBookings(result.bookings);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-muted">
        Loading your bookings...
      </div>
    );
  }

  if (error) {
    return (
      <p role="alert" className="py-8 text-center text-sm text-red-600">
        {error}
      </p>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="py-10 text-center">
        <CalendarDays size={36} className="mx-auto text-muted" />

        <h3 className="mt-4 font-semibold text-ink">
          No bookings yet
        </h3>

        <p className="mt-2 text-sm text-muted">
          Your bookings will appear here once you request a service.
        </p>

        <Link
          href="/book"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 font-semibold text-white"
        >
          Book a service <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {bookings.map((booking) => (
        <article
          key={booking.bookingId}
          className="rounded-2xl border border-gray-100 p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-muted">
                {booking.bookingId}
              </p>

              <h3 className="mt-2 text-lg font-bold capitalize text-ink">
                {booking.service} service
              </h3>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[booking.status] ||
                "bg-gray-100 text-gray-700"
                }`}
            >
              {booking.status.replace("-", " ")}
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={16} />
              {new Date(booking.preferredDate).toLocaleDateString("en-IN")}
            </span>

            <span className="inline-flex items-center gap-2">
              <Clock size={16} />
              {booking.preferredTime}
            </span>
          </div>

          <p className="mt-3 text-sm text-muted">
            {booking.location} · {booking.plan === "one-time" ? "One-time" : "Monthly"}
          </p>

          <Link
            href={`/account/bookings/${booking.bookingId}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest hover:underline"
          >
            View booking details
            <ArrowRight size={16} />
          </Link>
        </article>
      ))}
    </div>
  );
}