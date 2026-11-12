import { notFound, redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdminBookingDetails from "@/components/admin/AdminBookingDetails";
import { getAdminSession } from "@/lib/admin";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";

export default async function AdminBookingPage({
  params,
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/account");
  }

  const { bookingId } = await params;

  await connectDB();

  const booking = await Booking.findOne({ bookingId })
    .select(
      "bookingId customerName phone service plan location address preferredDate preferredTime status paymentStatus cancellationRequest createdAt"
    )
    .lean();

  if (!booking) {
    notFound();
  }

  // Convert MongoDB dates and ObjectIds into serialisable values.
  const safeBooking = JSON.parse(JSON.stringify(booking));

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream py-12">
        <div className="container-shell">
          <div className="mb-8">
            <p className="eyebrow text-forest">GHAR SAATHI ADMINISTRATION</p>
            <h1 className="mt-2 text-3xl font-bold text-forest">
              Booking Details
            </h1>
            <p className="mt-2 text-gray-600">
              Review customer information and manage this booking.
            </p>
          </div>

          <AdminBookingDetails initialBooking={safeBooking} />
        </div>
      </main>

      <Footer />
    </>
  );
}