import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { siteConfig } from "@/config/site";
import NotificationBell from "@/components/notifications/NotificationBell";


export default async function AdminPage() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/account");
  }

  return (
    <>
      <Navbar />
      

      <main className="min-h-screen bg-cream py-12">
        <div className="container-shell">
          <div className="mb-10">
            <p className="eyebrow text-forest">
              {siteConfig.name} ADMINISTRATION
            </p>

            <h1 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              Welcome back, {session.user?.name || "Administrator"}
            </h1>

            <p className="mt-2 text-muted">
              Manage bookings and monitor daily operations.
            </p>
          </div>

          <AdminDashboard />
        </div>
      </main>

      <Footer />
    </>
  );
}