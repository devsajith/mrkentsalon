import Link from "next/link";

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow p-5">

      <h2 className="text-xl font-semibold mb-4">
        Quick Actions
      </h2>

      <div className="flex flex-col gap-3">

        <Link
          href="/admin/bookings"
          className="border p-3 rounded"
        >
          Manage Bookings
        </Link>

        <Link
          href="/admin/settings"
          className="border p-3 rounded"
        >
          Business Settings
        </Link>

      </div>

    </div>
  );
}