import {
  getDashboardStats,
} from "@/services/booking.service";

export default async function DashboardPage() {

  const stats =
    await getDashboardStats();

  return (

    <div className="space-y-6">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded-lg shadow">

          <h2 className="text-gray-500">
            Today's Bookings
          </h2>

          <p className="text-3xl font-bold">
            {
              stats.todaysBookings
            }
          </p>

        </div>

        <div className="bg-white p-5 rounded-lg shadow">

          <h2 className="text-gray-500">
            Upcoming
          </h2>

          <p className="text-3xl font-bold">
            {
              stats.upcomingBookings
            }
          </p>

        </div>

        <div className="bg-white p-5 rounded-lg shadow">

          <h2 className="text-gray-500">
            Completed
          </h2>

          <p className="text-3xl font-bold">
            {
              stats.completedBookings
            }
          </p>

        </div>

      </div>

      <div className="bg-white rounded-lg shadow p-5">

        <h2 className="text-xl font-semibold mb-4">
          Today's Schedule
        </h2>

        {
          stats.todaySchedule
            .length === 0 ? (

            <p>
              No bookings today
            </p>

          ) : (

            stats.todaySchedule.map(
              (booking) => (

                <div
                  key={booking.id}
                  className="flex justify-between border-b py-3"
                >

                  <span>
                    {
                      booking.customer_name
                    }
                  </span>

                  <span>
                    {
                      booking.slot_time
                    }
                  </span>

                </div>

              )
            )

          )
        }

      </div>

    </div>

  );

}