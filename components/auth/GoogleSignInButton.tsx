"use client";

import { signIn } from "next-auth/react";
// import { Chrome } from "lucide-react";
import { useState } from "react";

export default function GoogleSignInButton() {
    const [loading, setLoading] = useState(false);

    async function handleSignIn() {
        setLoading(true);

        try {
            const params = new URLSearchParams(window.location.search);

            const callbackUrl = params.get("callbackUrl") || "/account";

            await signIn("google", {
                redirectTo: callbackUrl,
            });
        } catch (error) {
            console.error("Sign-in error:", error);
            setLoading(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleSignIn}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-forest px-6 py-4 font-semibold text-white transition hover:bg-[#174D3B] disabled:cursor-not-allowed disabled:opacity-60"
        >
            <svg
                width="20"
                height="20"
                viewBox="0 0 48 48"
                aria-hidden="true"
            >
                <path
                    fill="#FFC107"
                    d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.7c3.9-3.6 6-8.8 6-15Z"
                />
                <path
                    fill="#FF3D00"
                    d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.1c-1.9 1.3-4.1 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2H5.9v5.3A20 20 0 0 0 24 44Z"
                />
                <path
                    fill="#4CAF50"
                    d="M12.8 27.8a12 12 0 0 1 0-7.6v-5.3H5.9a20 20 0 0 0 0 18.2l6.9-5.3Z"
                />
                <path
                    fill="#1976D2"
                    d="M24 12.2c3 0 5.7 1 7.8 3.1l5.8-5.8A19.5 19.5 0 0 0 24 4 20 20 0 0 0 5.9 14.9l6.9 5.3c1.6-4.7 6-8 11.2-8Z"
                />
            </svg>
            {loading ? "Connecting to Google..." : "Continue with Google"}
        </button>
    );
}