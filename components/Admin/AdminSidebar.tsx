"use client";

import Link from "next/link";
import LogoutButton from "./LogOutButton";

export default function AdminSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-black text-white p-5">

      <h2 className="text-2xl font-bold mb-8">
        Salon Admin
      </h2>

      <nav className="flex flex-col gap-4">

        <Link
          href="/admin/dashboard"
          className="hover:text-gray-300"
        >
          Dashboard
        </Link>

        <Link
          href="/admin/bookings"
          className="hover:text-gray-300"
        >
          Bookings
        </Link>

        <Link
          href="/admin/settings"
          className="hover:text-gray-300"
        >
          Settings
        </Link>
        <LogoutButton />

      </nav>

    </aside>
  );
}