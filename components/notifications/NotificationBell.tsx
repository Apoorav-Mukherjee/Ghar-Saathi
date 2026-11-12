"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, CheckCheck, X } from "lucide-react";

type NotificationItem = {
  _id: string;
  title: string;
  message: string;
  link?: string | null;
  readAt?: string | null;
  createdAt: string;
};

export default function NotificationBell() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch("/api/notifications", {
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = await response.json();

      if (data.success) {
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch (error) {
      console.error("Notification refresh failed:", error);
    }
  }, []);

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(fetchNotifications, 15000);

    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Close dropdown when clicking outside it.
  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Close dropdown when pressing Escape.
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  async function handleNotificationClick(item: NotificationItem) {
    if (loading) return;

    setLoading(true);

    try {
      if (!item.readAt) {
        const response = await fetch(
          `/api/notifications/${item._id}`,
          { method: "PATCH" }
        );

        if (!response.ok) {
          throw new Error("Unable to mark notification as read.");
        }

        await fetchNotifications();
      }

      setOpen(false);

      if (item.link?.startsWith("/") && !item.link.startsWith("//")) {
        router.push(item.link);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      {/* Navbar bell button */}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={`Notifications, ${unreadCount} unread`}
        aria-expanded={open}
        className="relative flex h-10 w-10 items-center justify-center rounded-full text-forest transition hover:bg-forest/5"
      >
        <Bell size={21} strokeWidth={1.8} />

        {unreadCount > 0 && (
          <span className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-[9px] font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-[100] mt-3 w-[min(380px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_45px_rgba(0,0,0,0.12)]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <div>
              <h3 className="text-sm font-bold text-forest">
                Notifications
              </h3>
              <p className="mt-0.5 text-xs text-gray-400">
                {unreadCount > 0
                  ? `${unreadCount} unread notifications`
                  : "You're all caught up"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close notifications"
              className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-forest"
            >
              <X size={17} />
            </button>
          </div>

          {/* Notification list */}
          <div className="max-h-[390px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Bell size={28} className="mx-auto text-gray-300" />

                <p className="mt-3 text-sm font-semibold text-gray-600">
                  No notifications yet
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  We'll let you know when something happens.
                </p>
              </div>
            ) : (
              notifications.map((item) => (
                <button
                  type="button"
                  key={item._id}
                  disabled={loading}
                  onClick={() => handleNotificationClick(item)}
                  className={`block w-full border-b border-gray-50 px-5 py-4 text-left transition hover:bg-cream/70 disabled:opacity-60 ${
                    !item.readAt ? "bg-cream/40" : "bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                        !item.readAt ? "bg-forest" : "bg-transparent"
                      }`}
                    />

                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-semibold text-gray-800">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        {item.message}
                      </p>

                      <p className="mt-2 text-[10px] text-gray-400">
                        {new Date(item.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-5 py-3">
            <button
              type="button"
              onClick={fetchNotifications}
              className="flex items-center gap-2 text-xs font-semibold text-forest transition hover:opacity-70"
            >
              <CheckCheck size={15} />
              Refresh notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
