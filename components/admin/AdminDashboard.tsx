"use client";

import { useCallback, useEffect, useState } from "react";
import {
    CalendarDays,
    CheckCircle2,
    Clock3,
    Search,
    Users,
    XCircle,
} from "lucide-react";
import Link from "next/link";

type Booking = {
    bookingId: string;
    customerName: string;
    phone: string;
    service: string;
    plan: string;
    location: string;
    address: string;
    preferredDate: string;
    preferredTime: string;
    status: string;
    paymentStatus: string;
    cancellationRequest?: {
        reason: string;
        status: string;
    };
    createdAt: string;
};

type Stats = {
    total: number;
    pending: number;
    confirmed: number;
    assigned: number;
    inProgress: number;
    completed: number;
    cancelled: number;
};

const initialStats: Stats = {
    total: 0,
    pending: 0,
    confirmed: 0,
    assigned: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
};

const statusStyles: Record<string, string> = {
    pending: "bg-amber-50 text-amber-700",
    confirmed: "bg-blue-50 text-blue-700",
    assigned: "bg-purple-50 text-purple-700",
    "in-progress": "bg-indigo-50 text-indigo-700",
    completed: "bg-green-50 text-green-700",
    cancelled: "bg-red-50 text-red-700",
};

export default function AdminDashboard() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [stats, setStats] = useState<Stats>(initialStats);
    const [status, setStatus] = useState("all");
    const [service, setService] = useState("all");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadBookings = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const params = new URLSearchParams({
                status,
                service,
                search,
            });

            const response = await fetch(
                `/api/admin/bookings?${params.toString()}`,
                { cache: "no-store" }
            );

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Unable to load bookings.");
            }

            setBookings(result.bookings);
            setStats(result.stats);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }, [status, service, search]);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadBookings();
        }, 250);

        return () => clearTimeout(timer);
    }, [loadBookings]);

    const statCards = [
        {
            label: "Total bookings",
            value: stats.total,
            icon: CalendarDays,
        },
        {
            label: "Pending requests",
            value: stats.pending,
            icon: Clock3,
        },
        {
            label: "Confirmed",
            value: stats.confirmed,
            icon: CheckCircle2,
        },
        {
            label: "Completed",
            value: stats.completed,
            icon: Users,
        },
        {
            label: "Cancelled",
            value: stats.cancelled,
            icon: XCircle,
        },
    ];

    return (
        <div className="space-y-8">
            {/* Dashboard heading */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="eyebrow text-forest">OPERATIONS OVERVIEW</p>
                    <h2 className="mt-2 text-2xl font-bold text-ink">
                        Booking management
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                        Monitor and review customer service requests.
                    </p>
                </div>

                <button
                    onClick={loadBookings}
                    disabled={loading}
                    className="rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
                >
                    {loading ? "Refreshing..." : "Refresh"}
                </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
                {statCards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.label}
                            className="rounded-2xl bg-white p-5 shadow-soft"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-muted">{card.label}</p>
                                <Icon size={19} className="text-forest" />
                            </div>

                            <p className="mt-4 text-3xl font-bold text-ink">
                                {card.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Filters */}
            <section className="rounded-3xl bg-white p-5 shadow-soft sm:p-7">
                <div className="grid gap-4 md:grid-cols-3">
                    <div className="relative">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                        />

                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search name or booking ID"
                            className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-forest"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-forest"
                    >
                        <option value="all">All statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="assigned">Assigned</option>
                        <option value="in-progress">In progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>

                    <select
                        value={service}
                        onChange={(event) => setService(event.target.value)}
                        className="rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-forest"
                    >
                        <option value="all">All services</option>
                        <option value="cleaning">Cleaning</option>
                        <option value="laundry">Laundry</option>
                        <option value="cooking">Cooking</option>
                    </select>
                </div>

                {/* Booking table */}
                <div className="mt-7 overflow-x-auto">
                    {loading ? (
                        <p className="py-12 text-center text-sm text-muted">
                            Loading bookings...
                        </p>
                    ) : error ? (
                        <div
                            role="alert"
                            className="rounded-xl bg-red-50 p-5 text-sm text-red-700"
                        >
                            {error}
                        </div>
                    ) : bookings.length === 0 ? (
                        <p className="py-12 text-center text-sm text-muted">
                            No bookings match your search.
                        </p>
                    ) : (
                        <table className="w-full min-w-[850px] text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-muted">
                                    <th className="px-4 py-4">Customer</th>
                                    <th className="px-4 py-4">Service</th>
                                    <th className="px-4 py-4">Booking date</th>
                                    <th className="px-4 py-4">Location</th>
                                    <th className="px-4 py-4">Status</th>
                                    <th className="px-4 py-4">Payment</th>
                                </tr>
                            </thead>

                            <tbody>
                                {bookings.map((booking) => (
                                    <tr
                                        key={booking.bookingId}
                                        className="border-b border-gray-50 last:border-0 hover:bg-cream/50"
                                    >
                                        <td className="px-4 py-5">
                                            <p className="font-semibold text-ink">
                                                {booking.customerName}
                                            </p>
                                            <p className="mt-1 text-xs text-muted">
                                                <Link
                                                    href={`/admin/bookings/${booking.bookingId}`}
                                                    className="font-semibold text-forest hover:underline"
                                                >
                                                    {booking.bookingId}
                                                </Link>
                                            </p>
                                            <p className="mt-1 text-xs text-muted">
                                                {booking.phone}
                                            </p>
                                        </td>

                                        <td className="px-4 py-5">
                                            <p className="font-semibold capitalize text-ink">
                                                {booking.service}
                                            </p>
                                            <p className="mt-1 text-xs text-muted">
                                                {booking.plan === "one-time"
                                                    ? "One-time"
                                                    : "Monthly"}
                                            </p>
                                        </td>

                                        <td className="px-4 py-5">
                                            <p className="text-ink">
                                                {new Date(
                                                    booking.preferredDate
                                                ).toLocaleDateString("en-IN", {
                                                    timeZone: "Asia/Kolkata",
                                                })}
                                            </p>
                                            <p className="mt-1 text-xs text-muted">
                                                {booking.preferredTime}
                                            </p>
                                        </td>

                                        <td className="px-4 py-5 capitalize text-ink">
                                            {booking.location}
                                        </td>

                                        <td className="px-4 py-5">
                                            <span
                                                className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${statusStyles[booking.status] ||
                                                    "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {booking.status.replace("-", " ")}
                                            </span>

                                            {booking.cancellationRequest?.status ===
                                                "pending" && (
                                                    <p className="mt-2 text-xs font-semibold text-amber-700">
                                                        Cancellation requested
                                                    </p>
                                                )}
                                        </td>

                                        <td className="px-4 py-5 capitalize text-ink">
                                            {booking.paymentStatus}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                <p className="mt-5 text-xs text-muted">
                    Showing up to 100 recent matching bookings.
                </p>
            </section>
        </div>
    );
}