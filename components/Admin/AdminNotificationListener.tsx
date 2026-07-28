"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export function playNotificationSound(isEmergency: boolean = false) {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const now = ctx.currentTime;

    if (isEmergency) {
      // Urgent double-beep chime for Emergency Bookings
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(880, now); // A5
      gain1.gain.setValueAtTime(0.3, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1046.5, now + 0.18); // C6
      gain2.gain.setValueAtTime(0.4, now + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.18);
      osc2.stop(now + 0.4);
    } else {
      // Pleasant chime for Normal Bookings
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, now); // D5
      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(880, now + 0.15); // A5
      gain2.gain.setValueAtTime(0.25, now + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.15);
      osc2.stop(now + 0.45);
    }
  } catch (err) {
    console.error("Failed to play audio alert:", err);
  }
}

type ToastMessage = {
  id: string;
  title: string;
  body: string;
  isEmergency: boolean;
  timestamp: string;
};

export default function AdminNotificationListener() {
  const router = useRouter();
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const handleNewBooking = useCallback(
    (payloadNew: {
      id?: string;
      customer_name?: string;
      service_name?: string;
      slot_time?: string;
      booking_date?: string;
      booking_type?: string;
    }) => {
      const isEmergency = Boolean(
        payloadNew.booking_type && payloadNew.booking_type.startsWith("emergency")
      );
      const customerName = payloadNew.customer_name || "New Customer";
      const serviceName = payloadNew.service_name || "Grooming Service";
      const slotTime = payloadNew.slot_time || "";
      const bookingDate = payloadNew.booking_date || "Today";

      // 1. Audio alert
      playNotificationSound(isEmergency);

      // 2. Refresh Next.js server components/data
      router.refresh();

      // 3. Native Browser Notification if permitted
      const title = isEmergency
        ? `🚨 EMERGENCY BOOKING: ${customerName}`
        : `📅 NEW BOOKING: ${customerName}`;
      const body = `${serviceName} • ${slotTime} (${bookingDate})`;

      if ("Notification" in window && Notification.permission === "granted") {
        try {
          const notification = new Notification(title, {
            body,
            icon: "/favicon.ico",
            tag: payloadNew.id ? `booking-${payloadNew.id}` : undefined,
            requireInteraction: isEmergency,
          });

          notification.onclick = () => {
            window.focus();
            router.push("/admin/bookings");
            notification.close();
          };
        } catch (err) {
          console.error("Error creating browser notification:", err);
        }
      }

      // 4. In-App Floating Toast Notification for instant visual feedback
      const newToast: ToastMessage = {
        id: payloadNew.id || String(Date.now()),
        title,
        body,
        isEmergency,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setToasts((prev) => [newToast, ...prev].slice(0, 4));
    },
    [router]
  );

  useEffect(() => {
    // Listen for realtime INSERT events on bookings table
    const channel = supabase
      .channel("admin-new-bookings")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookings",
        },
        (payload) => {
          if (payload.new) {
            handleNewBooking(payload.new);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [handleNewBooking]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-md transition-all animate-slide-up ${
            toast.isEmergency
              ? "bg-red-950/90 text-white border-red-500/50 shadow-red-900/30"
              : "bg-black/90 text-white border-white/15 shadow-black/40"
          }`}
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
              toast.isEmergency ? "bg-red-600 text-white animate-pulse" : "bg-accent text-white"
            }`}
          >
            {toast.isEmergency ? "🚨" : "🔔"}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-extrabold text-sm truncate">{toast.title}</h4>
              <span className="text-[10px] text-white/60 font-semibold">{toast.timestamp}</span>
            </div>
            <p className="text-xs text-white/80 mt-0.5 line-clamp-2">{toast.body}</p>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  router.push("/admin/bookings");
                  removeToast(toast.id);
                }}
                className="text-[11px] font-bold px-3 py-1 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
              >
                View Details
              </button>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-[11px] text-white/60 hover:text-white transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
