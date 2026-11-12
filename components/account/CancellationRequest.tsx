"use client";

import { useState } from "react";

type Props = {
  bookingId: string;
  existingStatus?: "pending" | "approved" | "rejected";
  bookingStatus: string;
};

export default function CancellationRequest({
  bookingId,
  existingStatus,
  bookingStatus,
}: Props) {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const cannotCancel = ["completed", "cancelled"].includes(bookingStatus);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Request failed.");
      }

      setMessage(result.message);
      window.location.reload();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  if (cannotCancel) return null;

  if (existingStatus === "pending") {
    return (
      <div className="rounded-2xl bg-amber-50 p-5">
        <p className="font-semibold text-amber-800">
          Cancellation request under review
        </p>
        <p className="mt-2 text-sm text-amber-700">
          Your booking remains active until the team reviews your request.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 p-5"
    >
      <h3 className="font-bold text-ink">Request cancellation</h3>

      <p className="mt-2 text-sm leading-6 text-muted">
        Tell us why you want to cancel. Our team will review your request.
        Your booking is not cancelled immediately.
      </p>

      <label className="mt-5 block text-sm font-semibold text-ink">
        Reason for cancellation

        <textarea
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          rows={4}
          minLength={5}
          maxLength={500}
          required
          placeholder="Please tell us why you want to cancel..."
          className="mt-2 w-full rounded-xl border border-gray-200 p-4 text-sm outline-none focus:border-forest"
        />
      </label>

      {message && (
        <p role="status" className="mt-3 text-sm text-green-700">
          {message}
        </p>
      )}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || reason.trim().length < 5}
        className="mt-5 rounded-full border border-red-200 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit cancellation request"}
      </button>
    </form>
  );
}