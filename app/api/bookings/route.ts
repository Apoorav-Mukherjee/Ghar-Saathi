import { NextRequest, NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { z } from "zod";

import { auth } from "@/auth";
import User from "@/models/User";

import { connectDB } from "@/lib/mongodb";
import Booking from "@/models/Booking";
import Notification from "@/models/Notification";

const bookingSchema = z.object({
    name: z.string().trim().min(2).max(100),
    phone: z.string().regex(/^[6-9]\d{9}$/),
    service: z.enum(["cleaning", "laundry", "cooking"]),
    plan: z.enum(["one-time", "monthly"]),
    location: z.literal("vrindavan"),
    address: z.string().trim().min(5).max(500),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    requirements: z.string().max(1000).optional().default(""),
});

function generateBookingId() {
    const date = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
        .format(new Date())
        .replaceAll("-", "");

    const code = randomBytes(3).toString("hex").toUpperCase();

    return `GS-${date}-${code}`;
}

export async function POST(request: NextRequest) {
    try {
        const body: unknown = await request.json();

        const result = bookingSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please check your booking details.",
                    errors: result.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const data = result.data;

        // Interpret the selected date in Indian Standard Time.
        const todayInIndia = new Intl.DateTimeFormat("en-CA", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(new Date());

        const preferredDate = new Date(`${data.date}T12:00:00+05:30`);

        if (
            Number.isNaN(preferredDate.getTime()) ||
            data.date < todayInIndia
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please select a valid future date.",
                },
                { status: 400 }
            );
        }

        // 1. Check the customer's authenticated session.
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, message: "Please sign in to book a service." },
                { status: 401 }
            );
        }

        // 2. Retrieve the actual customer from MongoDB.
        await connectDB();

        const customer = await User.findById(session.user.id);

        if (!customer) {
            return NextResponse.json(
                { success: false, message: "Customer account not found." },
                { status: 404 }
            );
        }

        // 3. Require a verified contact number before booking.
        if (!customer.phone || !/^[6-9]\d{9}$/.test(customer.phone)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please add a valid mobile number to your profile before booking.",
                    redirectTo: "/account/profile",
                },
                { status: 400 }
            );
        }

        await connectDB();

        const booking = await Booking.create({
            userId: customer._id,

            bookingId: generateBookingId(),

            customerName: customer.name,
            phone: customer.phone,

            service: data.service,
            plan: data.plan,
            location: data.location,
            address: data.address,
            preferredDate,
            preferredTime: data.time,
            requirements: data.requirements || "",

            status: "pending",
            paymentStatus: "unpaid",
        });
        // Notifications are best-effort.
        // A notification failure must never cancel a successfully created booking.
        const notificationResults = await Promise.allSettled([
            // Customer notification
            Notification.create({
                recipientType: "customer",
                recipientId: customer._id,
                type: "booking-submitted",
                title: "Booking request received",
                message: `Your booking request ${booking.bookingId} has been submitted and is awaiting review.`,
                link: "/account",
                bookingId: booking.bookingId,
            }),

            // Admin notification
            Notification.create({
                recipientType: "admin",
                recipientId: null,
                type: "new-booking",
                title: "New booking received",
                message: `A new ${booking.service} booking (${booking.bookingId}) is awaiting review.`,
                link: "/admin",
                bookingId: booking.bookingId,
            }),
        ]);

        notificationResults.forEach((result) => {
            if (result.status === "rejected") {
                console.error(
                    "Booking notification creation failed:",
                    result.reason
                );
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Your booking request has been received.",
                booking: {
                    bookingId: booking.bookingId,
                    status: booking.status,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Booking creation failed:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to process your booking right now.",
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, message: "Please sign in first." },
                { status: 401 }
            );
        }

        await connectDB();

        const bookings = await Booking.find({
            userId: session.user.id,
        })
            .select(
                "bookingId service plan location address preferredDate preferredTime status paymentStatus createdAt"
            )
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json({
            success: true,
            bookings,
        });
    } catch (error) {
        console.error("Customer bookings error:", error);

        return NextResponse.json(
            { success: false, message: "Unable to load your bookings." },
            { status: 500 }
        );
    }
}