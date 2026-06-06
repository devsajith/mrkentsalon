import BookingTable from "@/components/Admin/BookingTable";

import {
  getBookings,
} from "@/services/booking.service";

export default async function BookingsPage() {

  const bookings =
    await getBookings();

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todaysBookings =
    bookings.filter(
      (booking) =>
        booking.booking_date ===
        today
    ).length;

  const upcomingBookings =
    bookings.filter(
      (booking) =>
        booking.status ===
        "confirmed"
    ).length;

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Bookings
      </h1>

      <div className="grid grid-cols-2 gap-4">

        <div className="bg-white rounded-lg shadow p-4">

          <h3 className="text-gray-500">
            Today's Bookings
          </h3>

          <p className="text-3xl font-bold">
            {todaysBookings}
          </p>

        </div>

        <div className="bg-white rounded-lg shadow p-4">

          <h3 className="text-gray-500">
            Upcoming
          </h3>

          <p className="text-3xl font-bold">
            {upcomingBookings}
          </p>

        </div>

      </div>

      <BookingTable
        bookings={bookings}
      />

    </div>

  );

}