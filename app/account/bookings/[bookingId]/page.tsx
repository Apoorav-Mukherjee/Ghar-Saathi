import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CancellationRequest from "@/components/account/CancellationRequest";

import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";

type Props = {
  params: Promise<{ bookingId: string }>;
};

const stages = [
  { id: "pending", label: "Booking Requested" },
  { id: "confirmed", label: "Booking Confirmed" },
  { id: "assigned", label: "Professional Assigned" },
  { id: "in-progress", label: "Service In Progress" },
  { id: "completed", label: "Service Completed" },
];

export default async function BookingDetailsPage({ params }: Props) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { bookingId } = await params;

  await connectDB();

  const booking = await Booking.findOne({
    bookingId,
    userId: session.user.id,
  }).lean();

  if (!booking) {
    notFound();
  }

  const currentStage = stages.findIndex(
    (stage) => stage.id === booking.status
  );

  const preferredDate = new Date(booking.preferredDate).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Kolkata",
    }
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream py-12">
        <div className="container-shell max-w-4xl">
          <Link
            href="/account"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-forest"
          >
            <ArrowLeft size={17} />
            Back to my bookings
          </Link>

          <div className="mb-8">
            <p className="eyebrow text-forest">BOOKING DETAILS</p>

            <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Your service booking
            </h1>

            <p className="mt-2 text-sm text-muted">
              Reference: {booking.bookingId}
            </p>
          </div>

          {/* Current booking status */}
          <section className="rounded-3xl bg-forest p-6 text-white shadow-soft sm:p-8">
            <p className="text-sm font-medium text-white/70">
              CURRENT BOOKING STATUS
            </p>

            <h2 className="mt-3 text-2xl font-bold capitalize">
              {booking.status.replace("-", " ")}
            </h2>

            <p className="mt-2 text-sm text-white/70">
              {booking.status === "pending"
                ? "Your request has been received and is awaiting review."
                : booking.status === "completed"
                ? "Your service has been completed."
                : booking.status === "cancelled"
                ? "This booking has been cancelled."
                : "Your booking is being processed by our team."}
            </p>
          </section>

          {/* Booking progress */}
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-soft sm:p-8">
            <h2 className="text-xl font-bold text-ink">
              Booking progress
            </h2>

            {booking.status === "cancelled" ? (
              <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                This booking has been cancelled.
              </p>
            ) : (
              <div className="mt-7 space-y-6">
                {stages.map((stage, index) => {
                  const completed =
                    currentStage >= 0 && index <= currentStage;

                  return (
                    <div key={stage.id} className="flex items-start gap-4">
                      <div
                        className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          completed
                            ? "bg-forest text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {completed ? "✓" : index + 1}
                      </div>

                      <div>
                        <p
                          className={`font-semibold ${
                            completed ? "text-forest" : "text-gray-400"
                          }`}
                        >
                          {stage.label}
                        </p>

                        {index === currentStage && (
                          <p className="mt-1 text-xs text-muted">
                            Current stage
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Booking information */}
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-soft sm:p-8">
            <h2 className="text-xl font-bold text-ink">
              Service information
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted">Service</p>
                <p className="mt-1 font-semibold capitalize text-ink">
                  {booking.service}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted">Plan</p>
                <p className="mt-1 font-semibold text-ink">
                  {booking.plan === "one-time" ? "One-time" : "Monthly"}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted">Preferred date</p>
                <p className="mt-1 flex items-center gap-2 font-semibold text-ink">
                  <CalendarDays size={17} />
                  {preferredDate}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted">Preferred time</p>
                <p className="mt-1 flex items-center gap-2 font-semibold text-ink">
                  <Clock size={17} />
                  {booking.preferredTime}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-sm text-muted">Service address</p>
                <p className="mt-1 flex items-start gap-2 font-semibold text-ink">
                  <MapPin size={17} className="mt-1 shrink-0" />
                  {booking.address}, {booking.location}
                </p>
              </div>

              {booking.requirements && (
                <div className="sm:col-span-2">
                  <p className="text-sm text-muted">Additional requirements</p>
                  <p className="mt-1 leading-6 text-ink">
                    {booking.requirements}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Payment information */}
          <section className="mt-6 rounded-3xl bg-white p-6 shadow-soft sm:p-8">
            <h2 className="text-xl font-bold text-ink">
              Payment information
            </h2>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-muted">Payment status</span>

              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold capitalize text-amber-700">
                {booking.paymentStatus}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-muted">
              Payment details and final charges will be coordinated by our team.
            </p>
          </section>

          {/* Cancellation */}
          {booking.status !== "cancelled" &&
            booking.status !== "completed" && (
              <section className="mt-6 rounded-3xl bg-white p-6 shadow-soft sm:p-8">
                <CancellationRequest
                  bookingId={booking.bookingId}
                  bookingStatus={booking.status}
                  existingStatus={booking.cancellationRequest?.status}
                />
              </section>
            )}
        </div>
      </main>

      <Footer />
    </>
  );
}