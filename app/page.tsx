import { getBookings } from "@/services/booking.service";

export default async function Home() {
  const bookings = await getBookings();

  return (
    <main className="p-10">
      <h1>Booking Platform</h1>

      <pre>
        {JSON.stringify(bookings, null, 2)}
      </pre>
    </main>
  );
}