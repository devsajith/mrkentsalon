export const dynamic ="force-dynamic";
export const revalidate =0;

import BookingTable from "@/components/Admin/BookingTable";
import { getBookings } from "@/services/booking.service";
import RealtimeWrapper from "@/components/Admin/RealtimeWrapper";

export default async function BookingsPage() {
  const bookings = await getBookings();

  const today = new Date().toISOString().split("T")[0];

  const todaysBookings = bookings.filter(
    (booking) => booking.booking_date === today
  ).length;

  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "confirmed"
  ).length;

  return (
    <div className="space-y-8 animate-fade-in">

      <RealtimeWrapper
        table="bookings"
      />
      {/* Header section */}
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-text-primary tracking-tight">
          Bookings Management
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          View all client bookings, filter by status, and update appointment progress.
        </p>
      </div>

      {/* Stats row */}
      <div className="max-w-sm">
        {/* Today's Bookings card */}
        <div className="bg-white rounded-2xl border border-border-light shadow-sm p-5 hover:shadow-md transition-all relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-accent" />
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider">
                Today&apos;s Bookings
              </h3>
              <p className="text-3xl font-black text-text-primary mt-2">
                {todaysBookings}
              </p>
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <BookingTable bookings={bookings} />
    </div>
  );
}