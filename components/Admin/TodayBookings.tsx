const bookings = [
  {
    id: 1,
    name: "John",
    time: "10:00 AM",
  },
  {
    id: 2,
    name: "Rahul",
    time: "10:30 AM",
  },
];

export default function TodayBookings() {
  return (
    <div className="bg-white rounded-lg shadow p-5">

      <h2 className="text-xl font-semibold mb-4">
        Today&apos;s Bookings
      </h2>

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="flex justify-between border-b py-3"
        >
          <span>{booking.name}</span>

          <span>{booking.time}</span>
        </div>
      ))}
    </div>
  );
}