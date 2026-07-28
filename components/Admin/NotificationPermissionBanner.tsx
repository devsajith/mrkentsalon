"use client";

import { useEffect, useState } from "react";
import { playNotificationSound } from "./AdminNotificationListener";

export default function NotificationPermissionBanner() {
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [supported, setSupported] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    } else {
      setSupported(false);
    }
  }, []);

  const requestPermission = async () => {
    if (!supported) return;
    try {
      const res = await Notification.requestPermission();
      setPermission(res);
      if (res === "granted") {
        playNotificationSound(false);
        new Notification("🔔 Admin Notifications Active", {
          body: "You will receive real-time alerts for all new bookings and emergency slots.",
          icon: "/favicon.ico",
        });
      }
    } catch (err) {
      console.error("Permission request error:", err);
    }
  };

  const sendTestNotification = (isEmergency: boolean) => {
    playNotificationSound(isEmergency);
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(
        isEmergency ? "🚨 TEST: Emergency Booking Alert" : "📅 TEST: New Booking Alert",
        {
          body: isEmergency
            ? "Test emergency booking notification for John Doe (Haircut & Beard)."
            : "Test normal booking notification for Jane Smith (Classic Grooming).",
          icon: "/favicon.ico",
        }
      );
    }
  };

  if (!supported) return null;

  return (
    <div className="rounded-xl border border-white/15 bg-white/5 p-3 text-xs space-y-2.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 font-bold text-white">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Browser Alerts
        </div>
        <span
          className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider ${
            permission === "granted"
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : permission === "denied"
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
          }`}
        >
          {permission}
        </span>
      </div>

      {permission !== "granted" ? (
        <button
          onClick={requestPermission}
          type="button"
          className="w-full text-center py-2 px-3 rounded-lg bg-accent text-white font-extrabold hover:bg-accent-light transition-colors text-[11px] shadow-sm cursor-pointer"
        >
          Enable Push Notifications
        </button>
      ) : (
        <div className="flex items-center gap-1.5 pt-1">
          <button
            onClick={() => sendTestNotification(false)}
            type="button"
            className="flex-1 py-1.5 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] transition-colors cursor-pointer"
          >
            Test Normal
          </button>
          <button
            onClick={() => sendTestNotification(true)}
            type="button"
            className="flex-1 py-1.5 px-2 rounded-lg bg-red-600/30 hover:bg-red-600/50 text-red-200 border border-red-500/30 font-bold text-[10px] transition-colors cursor-pointer"
          >
            Test Emergency
          </button>
        </div>
      )}
    </div>
  );
}
