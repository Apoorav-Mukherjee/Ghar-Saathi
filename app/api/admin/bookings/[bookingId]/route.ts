import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/admin";
import Booking from "@/models/Booking";

const allowedTransitions: Record<string, string[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["assigned", "cancelled"],
  assigned: ["in-progress", "cancelled"],
  "in-progress": ["completed"],
  completed: [],
  cancelled: [],
};

const validPaymentStatuses = ["unpaid", "pending", "paid"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    // 1. Verify admin access
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Admin access required." },
        { status: 403 }
      );
    }

    // 2. Get booking ID and request body
    const { bookingId } = await params;
    const body = await request.json();

    await connectDB();

    const booking = await Booking.findOne({ bookingId });

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    let updatedBooking;

    // 3. Update booking status
    if (body.action === "update-status") {
      const newStatus = body.status;

      if (typeof newStatus !== "string") {
        return NextResponse.json(
          { success: false, message: "Invalid booking status." },
          { status: 400 }
        );
      }

      const currentStatus = booking.status;
      const allowedNext = allowedTransitions[currentStatus] || [];

      if (!allowedNext.includes(newStatus)) {
        return NextResponse.json(
          {
            success: false,
            message: `Cannot change booking status from ${currentStatus} to ${newStatus}.`,
          },
          { status: 400 }
        );
      }

      // Only update if the status has not changed since we fetched it.
      updatedBooking = await Booking.findOneAndUpdate(
        { bookingId, status: currentStatus },
        { $set: { status: newStatus } },
        { new: true, runValidators: true }
      );
    }

    // 4. Update payment status
    else if (body.action === "update-payment") {
      const paymentStatus = body.paymentStatus;

      if (
        typeof paymentStatus !== "string" ||
        !validPaymentStatuses.includes(paymentStatus)
      ) {
        return NextResponse.json(
          { success: false, message: "Invalid payment status." },
          { status: 400 }
        );
      }

      updatedBooking = await Booking.findOneAndUpdate(
        { bookingId },
        { $set: { paymentStatus } },
        { new: true, runValidators: true }
      );
    }

    // 5. Approve or reject a cancellation request
    else if (body.action === "resolve-cancellation") {
      const decision = body.decision;

      if (!["approve", "reject"].includes(decision)) {
        return NextResponse.json(
          { success: false, message: "Invalid cancellation decision." },
          { status: 400 }
        );
      }

      const updateFields: Record<string, string> = {
        "cancellationRequest.status":
          decision === "approve" ? "approved" : "rejected",
      };

      if (decision === "approve") {
        if (booking.status === "completed" || booking.status === "cancelled") {
          return NextResponse.json(
            {
              success: false,
              message: "This booking can no longer be cancelled.",
            },
            { status: 400 }
          );
        }

        updateFields.status = "cancelled";
      }

      updatedBooking = await Booking.findOneAndUpdate(
        {
          bookingId,
          "cancellationRequest.status": "pending",
        },
        { $set: updateFields },
        { new: true, runValidators: true }
      );
    }

    // 6. Reject unknown actions
    else {
      return NextResponse.json(
        { success: false, message: "Invalid action." },
        { status: 400 }
      );
    }

    if (!updatedBooking) {
      return NextResponse.json(
        {
          success: false,
          message: "The booking changed or the request is no longer pending. Refresh and try again.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Booking updated successfully.",
      booking: {
        bookingId: updatedBooking.bookingId,
        status: updatedBooking.status,
        paymentStatus: updatedBooking.paymentStatus,
        cancellationRequest: updatedBooking.cancellationRequest,
      },
    });
  } catch (error) {
    console.error("Admin booking update error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update booking." },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> }
) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Admin access required." },
        { status: 403 }
      );
    }

    const { bookingId } = await params;

    await connectDB();

    const booking = await Booking.findOne({ bookingId })
      .select(
        "bookingId customerName phone service plan location address preferredDate preferredTime status paymentStatus cancellationRequest createdAt"
      )
      .lean();

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, booking });
  } catch (error) {
    console.error("Admin booking fetch error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to fetch booking." },
      { status: 500 }
    );
  }
}