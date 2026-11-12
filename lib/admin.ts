import { auth } from "@/auth";

const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export async function getAdminSession() {
  const session = await auth();

  const email = session?.user?.email?.toLowerCase();

  if (!session?.user?.id || !email) {
    return null;
  }

  if (!adminEmails.includes(email)) {
    return null;
  }

  return session;
}