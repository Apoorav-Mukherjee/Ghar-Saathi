import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SignOutButton from "@/components/auth/SignOutButton";
import BookingHistory from "@/components/account/BookingHistory";
import {
  CalendarDays,
  MapPin,
  UserRound,
  ArrowRight,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();

  const customer = await User.findById(session.user.id)
    .select("name email image phone addresses createdAt")
    .lean();

  if (!customer) {
    redirect("/login");
  }

  const firstName = customer.name.split(" ")[0];

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream py-12">
        <div className="container-shell">
          <div className="mb-10">
            <p className="eyebrow text-forest">CUSTOMER ACCOUNT</p>

            <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Welcome, {firstName}!
            </h1>

            <p className="mt-2 text-muted">
              Manage your profile and keep track of your household services.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            {/* Main dashboard */}
            <div className="space-y-6">
              <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
                <div className="flex items-center gap-4">
                  {customer.image ? (
                    <img
                      src={customer.image}
                      alt="Profile"
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime text-forest">
                      <UserRound size={28} />
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl font-bold text-ink">
                      {customer.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      {customer.email}
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                      Google verified
                    </span>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
                    <BookingHistory />
              </section>
            </div>

            {/* Profile sidebar */}
            <aside className="space-y-6">
              <section className="rounded-3xl bg-white p-6 shadow-soft">
                <h2 className="font-bold text-ink">Your Profile</h2>

                <div className="mt-5 space-y-5 text-sm">
                  <div>
                    <p className="text-muted">Email address</p>
                    <p className="mt-1 break-all font-medium text-ink">
                      {customer.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted">Mobile number</p>
                    <p className="mt-1 font-medium text-ink">
                      {customer.phone || "Not added yet"}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted">Saved addresses</p>
                    <p className="mt-1 font-medium text-ink">
                      {customer.addresses?.length || 0} addresses
                    </p>
                  </div>
                </div>

                <Link
                  href="/account/profile"
                  className="mt-6 block w-full rounded-full border border-forest px-5 py-3 text-center font-semibold text-forest transition hover:bg-cream"
                >
                  Manage Profile
                </Link>
              </section>

              <section className="rounded-3xl bg-forest p-6 text-white">
                <MapPin size={24} className="text-lime" />

                <h2 className="mt-4 text-lg font-bold">
                  Need some help?
                </h2>

                <p className="mt-2 text-sm leading-6 text-white/70">
                  Have a question about your booking? Get in touch with
                  our team.
                </p>

                <Link
                  href="/contact"
                  className="mt-5 inline-block font-semibold text-lime"
                >
                  Contact us →
                </Link>
              </section>

              <SignOutButton />
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}