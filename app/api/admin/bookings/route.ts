import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/admin";
import Booking from "@/models/Booking";

const validStatuses = [
  "pending",
  "confirmed",
  "assigned",
  "in-progress",
  "completed",
  "cancelled",
];

const validServices = ["cleaning", "laundry", "cooking"];

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: NextRequest) {
  try {
    // Protect the API independently of the admin page.
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Admin access required." },
        { status: 403 }
      );
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;

    const status = searchParams.get("status") || "all";
    const service = searchParams.get("service") || "all";
    const search = (searchParams.get("search") || "").trim().slice(0, 100);

    if (status !== "all" && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid booking status." },
        { status: 400 }
      );
    }

    if (service !== "all" && !validServices.includes(service)) {
      return NextResponse.json(
        { success: false, message: "Invalid service." },
        { status: 400 }
      );
    }

    const filter: Record<string, unknown> = {};

    if (status !== "all") {
      filter.status = status;
    }

    if (service !== "all") {
      filter.service = service;
    }

    if (search) {
      const safeSearch = escapeRegex(search);

      filter.$or = [
        { bookingId: { $regex: safeSearch, $options: "i" } },
        { customerName: { $regex: safeSearch, $options: "i" } },
      ];
    }

    const [
      bookings,
      total,
      pending,
      confirmed,
      assigned,
      inProgress,
      completed,
      cancelled,
    ] = await Promise.all([
      Booking.find(filter)
        .select(
          "bookingId customerName phone service plan location address preferredDate preferredTime status paymentStatus cancellationRequest createdAt"
        )
        .sort({ createdAt: -1 })
        .limit(100)
        .lean(),

      Booking.countDocuments(),

      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: "confirmed" }),
      Booking.countDocuments({ status: "assigned" }),
      Booking.countDocuments({ status: "in-progress" }),
      Booking.countDocuments({ status: "completed" }),
      Booking.countDocuments({ status: "cancelled" }),
    ]);

    return NextResponse.json({
      success: true,
      bookings,
      stats: {
        total,
        pending,
        confirmed,
        assigned,
        inProgress,
        completed,
        cancelled,
      },
    });
  } catch (error) {
    console.error("Admin bookings API error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to load admin bookings." },
      { status: 500 }
    );
  }
}