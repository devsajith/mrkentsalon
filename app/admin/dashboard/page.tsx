export const dynamic = "force-dynamic";
export const revalidate =0;

import { getDashboardStats } from "@/services/booking.service";
import RealtimeWrapper from "@/components/Admin/RealtimeWrapper";

function formatTime12h(timeStr: string): string {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length < 2) return timeStr;
  let hour = parseInt(parts[0], 10);
  const min = parts[1];
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${min} ${ampm}`;
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section */}
      <RealtimeWrapper
        table="bookings"
      />
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Monitor today&apos;s activity, upcoming schedules, and performance metrics.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Today's Bookings Card */}
        <div className="bg-white rounded-2xl border border-border-light shadow-sm p-6 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Today&apos;s Bookings
              </p>
              <h3 className="text-3xl font-black text-text-primary mt-2 flex items-baseline gap-2">
                {stats.todaysBookings}
                {stats.todaysEmergencyBookings > 0 && (
                  <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-100 rounded-full px-2 py-0.5 animate-pulse">
                    {stats.todaysEmergencyBookings} Emergency
                  </span>
                )}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Upcoming Card */}
        <div className="bg-white rounded-2xl border border-border-light shadow-sm p-6 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-500" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Upcoming Bookings
              </p>
              <h3 className="text-3xl font-black text-text-primary mt-2">
                {stats.upcomingBookings}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Completed Card */}
        <div className="bg-white rounded-2xl border border-border-light shadow-sm p-6 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-emerald-500" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Completed Bookings
              </p>
              <h3 className="text-3xl font-black text-text-primary mt-2">
                {stats.completedBookings}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

      </div>

      {/* Today's Schedule Section */}
      <div className="bg-white rounded-2xl border border-border-light shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-border-light/60 pb-4">
          <div>
            <h2 className="text-lg font-bold text-text-primary">
              Today&apos;s Schedule
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">Timeline of all appointments booked for today</p>
          </div>
          <span className="bg-accent/15 text-accent text-xs font-bold px-3 py-1 rounded-full">
            {stats.todaySchedule.length} Bookings
          </span>
        </div>

        {stats.todaySchedule.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto text-text-muted">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-text-secondary">No bookings scheduled for today</p>
          </div>
        ) : (
          <div className="divide-y divide-border-light/40">
            {stats.todaySchedule.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between py-4 group hover:bg-surface/30 px-3 -mx-3 rounded-xl transition-all"
              >
                <div className="flex items-center gap-4">
                  {/* Small avatar circle with user's initials */}
                  <div className={`w-10 h-10 rounded-full text-sm font-bold flex items-center justify-center shrink-0 border ${
                    booking.booking_type?.startsWith("emergency")
                      ? "bg-red-50 text-red-600 border-red-200"
                      : "bg-surface text-text-primary border-border-light/60"
                  }`}>
                    {booking.customer_name ? booking.customer_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "MK"}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-text-primary">
                        {booking.customer_name}
                      </h4>
                      {booking.booking_type?.startsWith("emergency") && (
                        <span className="inline-flex items-center gap-0.5 rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-700 border border-red-100">
                          <span className="w-1 h-1 rounded-full bg-red-600 animate-pulse" />
                          Emergency
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <p className="text-xs text-text-secondary flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94L6.73 20.18a2.12 2.12 0 01-3-3l6.77-6.77a6 6 0 017.94-7.94l-3.74 3.73z" />
                        </svg>
                        {booking.service_name} ({booking.duration} min)
                      </p>
                      {(() => {
                        const type = booking.booking_type || "normal";
                        const isEmergency = type.startsWith("emergency");
                        const rawTier = isEmergency ? type.replace("emergency_", "") : type;
                        const tier = rawTier === "normal" ? "normal" : rawTier;
                        const tierDisplay = tier.charAt(0).toUpperCase() + tier.slice(1);
                        
                        return (
                          <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider border shrink-0 ${
                            tier === "premium"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : tier === "creative"
                                ? "bg-purple-50 text-purple-700 border-purple-200"
                                : "bg-slate-50 text-slate-700 border-slate-200"
                          }`}>
                            {tierDisplay}
                          </span>
                        );
                      })()}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="font-black text-sm text-text-primary flex items-center gap-1.5">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {formatTime12h(booking.slot_time)}
                  </span>
                  <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                    ends at {formatTime12h(booking.end_time)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}