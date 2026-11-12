import { auth } from "@/auth";
import NavbarClient from "./NavbarClient";
import { getAdminSession } from "@/lib/admin";

export default async function Navbar() {
  const session = await auth();
  const adminSession = await getAdminSession();

  return (
    <NavbarClient 
    isLoggedIn={!!session?.user?.id}
    isAdmin={!!adminSession}
    />
  );
}