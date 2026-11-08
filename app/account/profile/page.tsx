import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProfileForm from "@/components/account/ProfileForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectDB();

  const customer = await User.findById(session.user.id)
    .select("phone addresses")
    .lean();

  if (!customer) {
    redirect("/login");
  }

  const addresses = (customer.addresses || []).map((address) => ({
    label: address.label,
    address: address.address,
    city: address.city,
    isDefault: address.isDefault,
  }));

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-cream py-12">
        <div className="container-shell max-w-3xl">
          <Link
            href="/account"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-forest"
          >
            <ArrowLeft size={17} />
            Back to account
          </Link>

          <div className="mb-8">
            <p className="eyebrow text-forest">ACCOUNT SETTINGS</p>

            <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Manage your profile
            </h1>

            <p className="mt-3 text-muted">
              Keep your contact details and service addresses up to date.
            </p>
          </div>

          <ProfileForm
            initialPhone={customer.phone || ""}
            initialAddresses={addresses}
          />
        </div>
      </main>

      <Footer />
    </>
  );
}