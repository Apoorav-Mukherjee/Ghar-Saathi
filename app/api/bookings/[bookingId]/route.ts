import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import NotificationModel from "@/models/Notification";

type RouteContext = {
  params: Promise<{ bookingId: string }>;
};

// Retrieve one booking belonging to the signed-in customer.
export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Please sign in first." },
        { status: 401 }
      );
    }

    const { bookingId } = await params;

    await connectDB();

    const booking = await Booking.findOne({
      bookingId,
      userId: session.user.id,
    })
      .select(
        "bookingId customerName service plan location address preferredDate preferredTime requirements status paymentStatus cancellationRequest createdAt updatedAt"
      )
      .lean();

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("Booking details error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to load booking details." },
      { status: 500 }
    );
  }
}

// Submit a cancellation request. This does NOT cancel the booking.
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Please sign in first." },
        { status: 401 }
      );
    }

    const { bookingId } = await params;

    const body = await request.json();

    const validation = z.object({
      reason: z.string().trim().min(5).max(500),
    }).safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a cancellation reason between 5 and 500 characters.",
        },
        { status: 400 }
      );
    }

    await connectDB();

    const existingBooking = await Booking.findOne({
      bookingId,
      userId: session.user.id,
    });

    if (!existingBooking) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    if (["completed", "cancelled"].includes(existingBooking.status)) {
      return NextResponse.json(
        {
          success: false,
          message: "This booking can no longer be cancelled.",
        },
        { status: 400 }
      );
    }

    if (existingBooking.cancellationRequest?.status === "pending") {
      return NextResponse.json(
        {
          success: false,
          message: "You already have a cancellation request awaiting review.",
        },
        { status: 409 }
      );
    }

    existingBooking.cancellationRequest = {
      reason: validation.data.reason,
      status: "pending",
      requestedAt: new Date(),
    };

    await existingBooking.save();

    // Notify all authorized admins about the cancellation request.
    try {
      await NotificationModel.create({
        recipientType: "admin",
        recipientId: null,
        type: "cancellation-request",
        title: "New cancellation request",
        message: `A customer has requested cancellation of booking ${existingBooking.bookingId}. Please review the request.`,
        link: "/admin",
        bookingId: existingBooking.bookingId,
      });
    } catch (notificationError) {
      console.error(
        "Admin cancellation notification failed:",
        notificationError
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your cancellation request has been submitted for review.",
    });
  } catch (error) {
    console.error("Cancellation request error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to submit your request." },
      { status: 500 }
    );
  }
}