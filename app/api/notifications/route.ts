import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/admin";
import { auth } from "@/auth";
import Notification from "@/models/Notification";

export async function GET() {
  try {
    await connectDB();

    // Check whether the logged-in user is an authorised admin.
    const adminSession = await getAdminSession();

    let filter: Record<string, unknown>;

    if (adminSession) {
      filter = { recipientType: "admin" };
    } else {
      // Otherwise, check for a normal logged-in customer.
      const session = await auth();

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "Authentication required." },
          { status: 401 }
        );
      }

      filter = {
        recipientType: "customer",
        recipientId: session.user.id,
      };
    }

    const [notifications, unreadCount] = await Promise.all([
      Notification.find(filter)
        .sort({ createdAt: -1 })
        .limit(30)
        .lean(),

      Notification.countDocuments({
        ...filter,
        readAt: null,
      }),
    ]);

    return NextResponse.json({
      success: true,
      notifications,
      unreadCount,
    });
  } catch (error) {
    console.error("Notification fetch error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch notifications." },
      { status: 500 }
    );
  }
}