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


      <BookingTable bookings={bookings} />
    </div>
  );
}