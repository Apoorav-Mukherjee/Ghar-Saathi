"use client";

import { useEffect, useState } from "react";
import {
    ArrowRight,
    CalendarDays,
    CheckCircle2,
    Clock,
    MapPin,
    MessageCircle,
    User,
} from "lucide-react";

import { services } from "@/config/services";
import { serviceLocations } from "@/config/locations";
import { siteConfig } from "@/config/site";
import { motion } from "framer-motion";

type BookingFormData = {
    service: string;
    plan: "one-time" | "monthly";
    name: string;
    phone: string;
    location: string;
    address: string;
    date: string;
    time: string;
    requirements: string;
};

const initialForm: BookingFormData = {
    service: "cleaning",
    plan: "one-time",
    name: "",
    phone: "",
    location: "vrindavan",
    address: "",
    date: "",
    time: "",
    requirements: "",
};

export default function BookingForm() {
    const [form, setForm] = useState<BookingFormData>(initialForm);
    const [error, setError] = useState("");
    const [confirmation, setConfirmation] = useState<{
        bookingId: string;
        whatsappUrl: string;
    } | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profileLoading, setProfileLoading] = useState(true);
    // const [profileLoaded, setProfileLoaded] = useState(false);

    // Read service and plan from the URL.
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const requestedService = params.get("service");
        const requestedPlan = params.get("type");

        setForm((current) => ({
            ...current,
            service: services.some((item) => item.id === requestedService)
                ? requestedService!
                : current.service,
            plan:
                requestedPlan === "monthly" || requestedPlan === "one-time"
                    ? requestedPlan
                    : current.plan,
        }));
    }, []);

    useEffect(() => {
        let cancelled = false;

        async function loadCustomerProfile() {
            try {
                const response = await fetch("/api/account/profile");

                if (!response.ok) {
                    if (response.status === 401) {
                        window.location.href = "/login?callbackUrl=%2Fbook";
                    }

                    return;
                }

                const result = await response.json();

                if (!result.success || cancelled) return;

                const profile = result.profile;

                const defaultAddress = profile.addresses?.find(
                    (address: {
                        isDefault: boolean;
                        address: string;
                        city: string;
                    }) => address.isDefault
                ) || profile.addresses?.[0];

                setForm((previous) => ({
                    ...previous,

                    name: profile.name || previous.name,
                    phone: profile.phone || previous.phone,

                    address: defaultAddress?.address || previous.address,

                    location:
                        defaultAddress?.city?.toLowerCase() === "vrindavan"
                            ? "vrindavan"
                            : previous.location,
                }));

                // setProfileLoaded(true);
            } catch (error) {
                console.error("Unable to load customer profile:", error);
            } finally {
                if (!cancelled) {
                    setProfileLoading(false);
                }
            }
        }

        loadCustomerProfile();

        return () => {
            cancelled = true;
        };
    }, []);

    const activeLocations = serviceLocations.filter(
        (location) => location.active
    );

    const selectedService = services.find(
        (item) => item.id === form.service
    );

    const updateField = (
        field: keyof BookingFormData,
        value: string
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
        setError("");
    };

    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (!selectedService) {
            setError("Please select a valid service.");
            return;
        }

        if (!/^[6-9]\d{9}$/.test(form.phone)) {
            setError("Please enter a valid 10-digit Indian mobile number.");
            return;
        }

        if (!form.date || !form.time || !form.address.trim()) {
            setError("Please complete your date, time and address.");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: form.name,
                    phone: form.phone,
                    service: form.service,
                    plan: form.plan,
                    location: form.location,
                    address: form.address,
                    date: form.date,
                    time: form.time,
                    requirements: form.requirements,
                }),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                setError(result.message || "Unable to submit your booking.");
                return;
            }

            const bookingId = result.booking.bookingId;

            const message = `
    *NEW BOOKING REQUEST*

    Booking ID: ${bookingId}

    *Customer Details*
    Name: ${form.name}
    Phone: ${form.phone}

    *Service Details*
    Service: ${selectedService.title}
    Plan: ${form.plan === "one-time" ? "One-Time (Hourly)" : "Monthly"}
    Location: ${serviceLocations.find(
                (item) => item.id === form.location
            )?.name || form.location
                }   
    Address: ${form.address}

    *Preferred Schedule*
    Date: ${form.date}
    Time: ${form.time}

    *Additional Requirements*
    ${form.requirements || "None provided"}

    My booking request has been submitted. Please confirm availability and pricing.
        `.trim();

            const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                message
            )}`;

            setConfirmation({
                bookingId,
                whatsappUrl,
            });
        } catch (error) {
            console.error("Booking submission error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    if (confirmation) {
        return (
            <section
                role="status"
                aria-live="polite"
                className="flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#F5F4EA] px-5 py-16"
            >
                <motion.div
                    initial={{ opacity: 0, y: 35, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                    className="w-full max-w-xl text-center"
                >
                    {/* Animated confirmation icon */}
                    <div className="relative mx-auto mb-9 flex h-32 w-32 items-center justify-center">
                        <motion.div
                            animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                            className="absolute inset-0 rounded-full bg-lime-300"
                        />

                        <motion.div
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="relative flex h-24 w-24 items-center justify-center rounded-full bg-forest shadow-xl"
                        >
                            <motion.svg
                                width="45"
                                height="45"
                                viewBox="0 0 45 45"
                                fill="none"
                            >
                                <motion.path
                                    d="M10 23L19 32L36 14"
                                    stroke="#D6F45B"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                />
                            </motion.svg>
                        </motion.div>
                    </div>

                    {/* Main message */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        <span className="eyebrow text-forest">
                            BOOKING REQUEST RECEIVED
                        </span>

                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-forest md:text-5xl">
                            Your request is
                            <br />
                            <span className="text-[#83A52A]">under review.</span>
                        </h1>

                        <p className="mx-auto mt-5 max-w-md leading-7 text-muted">
                            Sit back and relax! Our team is reviewing your requirements
                            and checking professional availability.
                        </p>
                    </motion.div>

                    {/* Response timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65 }}
                        className="mt-9 rounded-3xl border border-forest/10 bg-white p-6 shadow-soft"
                    >
                        <div className="flex items-center justify-center gap-3">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                                className="h-6 w-6 rounded-full border-[3px] border-forest/15 border-t-forest"
                            />

                            <p className="font-semibold text-forest">
                                Our team is reviewing your request
                            </p>
                        </div>

                        <div className="my-5 h-px bg-black/10" />

                        <p className="text-sm text-muted">
                            Expected response time
                        </p>

                        <motion.p
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.9, type: "spring" }}
                            className="mt-2 text-4xl font-bold text-forest"
                        >
                            25 minutes
                        </motion.p>

                        <p className="mt-2 text-xs text-muted">
                            We'll contact you with availability and pricing.
                        </p>
                    </motion.div>

                    {/* Booking reference */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-6 rounded-2xl bg-forest p-5 text-left text-white"
                    >
                        <p className="text-xs uppercase tracking-widest text-white/60">
                            Your booking reference
                        </p>

                        <p className="mt-2 text-xl font-bold tracking-wider text-lime">
                            {confirmation.bookingId}
                        </p>

                        <p className="mt-2 text-xs text-white/60">
                            Keep this reference for future communication.
                        </p>
                    </motion.div>

                    {/* WhatsApp action */}
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        onClick={() =>
                            window.open(
                                confirmation.whatsappUrl,
                                "_blank",
                                "noopener,noreferrer"
                            )
                        }
                        className="mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-7 py-4 font-semibold text-white transition hover:bg-[#1DA851]"
                    >
                        <MessageCircle size={20} />
                        Connect with us on WhatsApp
                    </motion.button>

                    <p className="mt-5 text-xs leading-6 text-muted">
                        Your booking is not confirmed yet. Our team will contact you
                        after reviewing your request.
                    </p>
                </motion.div>
            </section>
        );
    }
    return (
        <section className="section-pad">
            <div className="container-shell grid gap-10 lg:grid-cols-[1fr_0.65fr]">

                {/* Booking form */}
                <div>
                    <p className="eyebrow text-forest">BOOK A SERVICE</p>

                    <h1 className="mt-3 text-4xl font-bold tracking-tight text-forest md:text-5xl">
                        Let's make your home life easier.
                    </h1>

                    <p className="mt-4 max-w-xl text-muted">
                        Share a few details about the help you need. Our team will
                        contact you to discuss availability and confirm the booking.
                    </p>

                    <form onSubmit={handleSubmit} className="mt-10 space-y-8">

                        {/* Service selection */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold">1. Choose your service</h2>

                            <div className="grid gap-3 sm:grid-cols-3">
                                {services.map((service) => (
                                    <button
                                        key={service.id}
                                        type="button"
                                        onClick={() => updateField("service", service.id)}
                                        className={`rounded-2xl border p-4 text-left transition ${form.service === service.id
                                            ? "border-forest bg-forest text-white"
                                            : "border-black/10 bg-white hover:border-forest"
                                            }`}
                                    >
                                        <span className="font-semibold">{service.title}</span>
                                        <span className="mt-2 block text-sm opacity-75">
                                            {service.subtitle}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Plan selection */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold">2. Choose your plan</h2>

                            <div className="grid gap-3 sm:grid-cols-2">
                                {[
                                    {
                                        id: "one-time",
                                        title: "One-Time Service",
                                        detail: "Hourly-based service",
                                    },
                                    {
                                        id: "monthly",
                                        title: "Monthly Service",
                                        detail: "Recurring monthly assistance",
                                    },
                                ].map((plan) => (
                                    <button
                                        key={plan.id}
                                        type="button"
                                        onClick={() =>
                                            updateField("plan", plan.id as BookingFormData["plan"])
                                        }
                                        className={`rounded-2xl border p-5 text-left ${form.plan === plan.id
                                            ? "border-forest bg-[#E8EEDB]"
                                            : "border-black/10 bg-white"
                                            }`}
                                    >
                                        <span className="font-semibold">{plan.title}</span>
                                        <span className="mt-1 block text-sm text-muted">
                                            {plan.detail}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Customer details */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold">3. Your details</h2>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <input
                                    required
                                    value={form.name}
                                    onChange={(e) => updateField("name", e.target.value)}
                                    placeholder="Your full name"
                                    className="w-full rounded-xl border border-black/10 bg-white p-4 outline-none focus:border-forest"
                                />

                                <input
                                    required
                                    type="tel"
                                    maxLength={10}
                                    value={form.phone}
                                    onChange={(e) =>
                                        updateField("phone", e.target.value.replace(/\D/g, ""))
                                    }
                                    placeholder="10-digit mobile number"
                                    className="w-full rounded-xl border border-black/10 bg-white p-4 outline-none focus:border-forest"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold">4. Service location</h2>

                            <div className="space-y-4">
                                <select
                                    value={form.location}
                                    onChange={(e) => updateField("location", e.target.value)}
                                    className="w-full rounded-xl border border-black/10 bg-white p-4 outline-none focus:border-forest"
                                >
                                    {activeLocations.map((location) => (
                                        <option key={location.id} value={location.id}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>

                                <textarea
                                    required
                                    rows={3}
                                    value={form.address}
                                    onChange={(e) => updateField("address", e.target.value)}
                                    placeholder="House / apartment, area, landmark..."
                                    className="w-full rounded-xl border border-black/10 bg-white p-4 outline-none focus:border-forest"
                                />
                            </div>
                        </div>

                        {/* Schedule */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold">5. Preferred schedule</h2>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <input
                                    required
                                    type="date"
                                    min={
                                        new Intl.DateTimeFormat("en-CA", {
                                            timeZone: "Asia/Kolkata",
                                            year: "numeric",
                                            month: "2-digit",
                                            day: "2-digit",
                                        }).format(new Date())
                                    }
                                    value={form.date}
                                    onChange={(e) => updateField("date", e.target.value)}
                                    className="w-full rounded-xl border border-black/10 bg-white p-4 outline-none focus:border-forest"
                                />

                                <input
                                    required
                                    type="time"
                                    value={form.time}
                                    onChange={(e) => updateField("time", e.target.value)}
                                    className="w-full rounded-xl border border-black/10 bg-white p-4 outline-none focus:border-forest"
                                />
                            </div>
                        </div>

                        {/* Additional requirements */}
                        <div>
                            <h2 className="mb-4 text-xl font-bold">
                                6. Anything else we should know?
                            </h2>

                            <textarea
                                rows={4}
                                value={form.requirements}
                                onChange={(e) =>
                                    updateField("requirements", e.target.value)
                                }
                                placeholder="Tell us about your household requirements..."
                                className="w-full rounded-xl border border-black/10 bg-white p-4 outline-none focus:border-forest"
                            />
                        </div>

                        {error && (
                            <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting || !!confirmation}
                            className="flex w-full items-center justify-center gap-3 rounded-full bg-forest px-7 py-4 font-semibold text-white transition hover:bg-[#195640] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting
                                ? "Submitting your request..."
                                : confirmation
                                    ? "Booking request submitted"
                                    : "Submit Booking Request"}

                            {!isSubmitting && <ArrowRight size={18} />}
                        </button>

                        <p className="text-xs leading-6 text-muted">
                            This is a booking request, not a confirmed appointment.
                            Availability and final pricing will be confirmed by our team.
                            Your WhatsApp app will open with the details you entered.
                        </p>
                    </form>
                </div>

                {/* Booking summary */}
                <aside className="h-fit rounded-3xl bg-forest p-7 text-white lg:sticky lg:top-28">
                    <p className="eyebrow text-lime">YOUR REQUEST</p>

                    <h2 className="mt-3 text-2xl font-bold">
                        Booking summary
                    </h2>

                    <div className="mt-8 space-y-6">
                        <div className="flex gap-3">
                            <CheckCircle2 className="shrink-0 text-lime" />
                            <div>
                                <p className="text-sm text-white/60">Selected service</p>
                                <p className="font-semibold">
                                    {selectedService?.title || "Choose a service"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Clock className="shrink-0 text-lime" />
                            <div>
                                <p className="text-sm text-white/60">Plan</p>
                                <p className="font-semibold">
                                    {form.plan === "one-time"
                                        ? "One-Time · Hourly"
                                        : "Monthly Subscription"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <MapPin className="shrink-0 text-lime" />
                            <div>
                                <p className="text-sm text-white/60">Location</p>
                                <p className="font-semibold">
                                    {activeLocations.find((item) => item.id === form.location)
                                        ?.name || "Not selected"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <CalendarDays className="shrink-0 text-lime" />
                            <div>
                                <p className="text-sm text-white/60">Preferred date</p>
                                <p className="font-semibold">{form.date || "Not selected"}</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <User className="shrink-0 text-lime" />
                            <div>
                                <p className="text-sm text-white/60">Customer</p>
                                <p className="font-semibold">
                                    {form.name || "Your name"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 rounded-2xl bg-white/10 p-5">
                        <p className="text-sm text-white/70">Estimated price</p>
                        <p className="mt-1 text-2xl font-bold">To be confirmed</p>
                        <p className="mt-2 text-xs leading-5 text-white/60">
                            Final charges depend on service requirements, duration and
                            schedule.
                        </p>
                    </div>
                </aside>

            </div>
        </section>
    );
}