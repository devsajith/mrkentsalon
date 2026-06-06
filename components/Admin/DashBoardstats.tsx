export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <div className="bg-white rounded-lg p-5 shadow">
        <h2 className="text-gray-500">
          Today's Bookings
        </h2>

        <p className="text-3xl font-bold">
          12
        </p>
      </div>

      <div className="bg-white rounded-lg p-5 shadow">
        <h2 className="text-gray-500">
          Upcoming
        </h2>

        <p className="text-3xl font-bold">
          18
        </p>
      </div>

      <div className="bg-white rounded-lg p-5 shadow">
        <h2 className="text-gray-500">
          Completed
        </h2>

        <p className="text-3xl font-bold">
          5
        </p>
      </div>

    </div>
  );
}