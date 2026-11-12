import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/admin";
import { auth } from "@/auth";
import Notification from "@/models/Notification";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ notificationId: string }> }
) {
  try {
    await connectDB();

    const { notificationId } = await params;

    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return NextResponse.json(
        { success: false, message: "Invalid notification ID." },
        { status: 400 }
      );
    }

    const adminSession = await getAdminSession();

    let filter: Record<string, unknown>;

    if (adminSession) {
      filter = {
        _id: notificationId,
        recipientType: "admin",
      };
    } else {
      const session = await auth();

      if (!session?.user?.id) {
        return NextResponse.json(
          { success: false, message: "Authentication required." },
          { status: 401 }
        );
      }

      filter = {
        _id: notificationId,
        recipientType: "customer",
        recipientId: session.user.id,
      };
    }

    const notification = await Notification.findOneAndUpdate(
      filter,
      { $set: { readAt: new Date() } },
      { new: true }
    ).lean();

    if (!notification) {
      return NextResponse.json(
        { success: false, message: "Notification not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notification marked as read.",
    });
  } catch (error) {
    console.error("Mark notification read error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update notification." },
      { status: 500 }
    );
  }
}