"use client";

import { useState } from "react";
import Link from "next/link";

type Booking = {
  bookingId: string;
  customerName: string;
  phone: string;
  service: string;
  plan?: string;
  location: string;
  address: string;
  preferredDate: string;
  preferredTime: string;
  status: string;
  paymentStatus: string;
  cancellationRequest?: {
    reason: string;
    status: "pending" | "approved" | "rejected";
    requestedAt: string;
  };
  createdAt: string;
};

const nextStatuses: Record<string, string[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["assigned", "cancelled"],
  assigned: ["in-progress", "cancelled"],
  "in-progress": ["completed"],
  completed: [],
  cancelled: [],
};

export default function AdminBookingDetails({
  initialBooking,
}: {
  initialBooking: Booking;
}) {
  const [booking, setBooking] = useState(initialBooking);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function performAction(body: Record<string, string>) {
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/bookings/${booking.bookingId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      setBooking((current) => ({
        ...current,
        ...data.booking,
      }));

      setMessage(data.message || "Updated successfully.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to update booking."
      );
    } finally {
      setLoading(false);
    }
  }

  const availableStatuses = nextStatuses[booking.status] || [];

  return (
    <div className="space-y-6">
      <Link
        href="/admin"
        className="inline-flex text-sm font-semibold text-forest hover:underline"
      >
        ← Back to dashboard
      </Link>

      <section className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm text-gray-500">Booking reference</p>
            <h2 className="mt-1 text-2xl font-bold text-forest">
              {booking.bookingId}
            </h2>
          </div>

          <span className="rounded-full bg-cream px-4 py-2 text-sm font-semibold capitalize text-forest">
            {booking.status}
          </span>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Detail label="Customer" value={booking.customerName} />
          <Detail label="Phone" value={booking.phone} />
          <Detail label="Service" value={booking.service} />
          <Detail label="Plan" value={booking.plan || "Not specified"} />
          <Detail label="Location" value={booking.location} />
          <Detail label="Preferred date" value={booking.preferredDate} />
          <Detail label="Preferred time" value={booking.preferredTime} />
          <Detail label="Payment status" value={booking.paymentStatus} />
        </div>

        <div className="mt-6 border-t border-gray-100 pt-5">
          <p className="text-sm font-semibold text-gray-500">Service address</p>
          <p className="mt-2 text-gray-800">{booking.address}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-forest">Booking operations</h3>
        <p className="mt-1 text-sm text-gray-500">
          Move this booking to its next valid stage.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {availableStatuses.length > 0 ? (
            availableStatuses.map((status) => (
              <button
                key={status}
                disabled={loading}
                onClick={() =>
                  performAction({ action: "update-status", status })
                }
                className="rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold capitalize text-white transition hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "Updating..." : `Mark as ${status}`}
              </button>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No further status changes are available.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-forest/10 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-forest">Payment management</h3>
        <p className="mt-1 text-sm text-gray-500">
          Update payment separately from the service status.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {["unpaid", "pending", "paid"].map((paymentStatus) => (
            <button
              key={paymentStatus}
              disabled={loading || booking.paymentStatus === paymentStatus}
              onClick={() =>
                performAction({
                  action: "update-payment",
                  paymentStatus,
                })
              }
              className="rounded-xl border border-forest/20 px-4 py-2.5 text-sm font-semibold capitalize text-forest hover:bg-cream disabled:opacity-40"
            >
              Mark {paymentStatus}
            </button>
          ))}
        </div>
      </section>

      {booking.cancellationRequest && (
        <section className="rounded-2xl border border-amber-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-forest">
            Cancellation request
          </h3>

          <p className="mt-3 text-sm text-gray-600">
            <strong>Reason:</strong>{" "}
            {booking.cancellationRequest.reason || "No reason provided"}
          </p>

          <p className="mt-2 text-sm text-gray-600">
            <strong>Request status:</strong>{" "}
            <span className="capitalize">
              {booking.cancellationRequest.status}
            </span>
          </p>

          {booking.cancellationRequest.status === "pending" && (
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                disabled={loading}
                onClick={() =>
                  performAction({
                    action: "resolve-cancellation",
                    decision: "approve",
                  })
                }
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
              >
                Approve cancellation
              </button>

              <button
                disabled={loading}
                onClick={() =>
                  performAction({
                    action: "resolve-cancellation",
                    decision: "reject",
                  })
                }
                className="rounded-xl border border-forest/20 px-4 py-2.5 text-sm font-semibold text-forest disabled:opacity-50"
              >
                Reject cancellation
              </button>
            </div>
          )}
        </section>
      )}

      {message && (
        <p
          role="status"
          className="rounded-xl bg-cream p-4 text-sm font-medium text-forest"
        >
          {message}
        </p>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-semibold capitalize text-gray-900">{value}</p>
    </div>
  );
}