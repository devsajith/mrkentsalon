"use client";

import { useMemo, useState } from "react";
import { updateBookingStatus } from "@/services/booking.service";

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  booking_date: string;
  slot_time: string;
  status: string;
};

export default function BookingTable({
  bookings,
}: {
  bookings: Booking[];
}) {

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [loadingId, setLoadingId] =
    useState("");

  const filteredBookings =
    useMemo(() => {

      return bookings.filter(
        (booking) => {

          const matchesSearch =
            booking.customer_name
              .toLowerCase()
              .includes(
                search.toLowerCase()
              ) ||
            booking.phone.includes(
              search
            );

          const matchesStatus =
            statusFilter === "all"
              ? true
              : booking.status ===
                statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );

    }, [
      bookings,
      search,
      statusFilter,
    ]);

  async function handleStatus(
    id: string,
    status: string
  ) {

    try {

      setLoadingId(id);

      await updateBookingStatus(
        id,
        status
      );

      window.location.reload();

    } catch (error) {

      console.error(error);

      alert(
        "Failed to update booking"
      );

    } finally {

      setLoadingId("");

    }

  }

  return (

    <div className="space-y-4">

      <div className="bg-white p-4 rounded-lg shadow">

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search customer or phone..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border rounded p-2 flex-1"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border rounded p-2"
          >
            <option value="all">
              All
            </option>

            <option value="confirmed">
              Confirmed
            </option>

            <option value="completed">
              Completed
            </option>

            <option value="cancelled">
              Cancelled
            </option>

          </select>

        </div>

      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Customer
              </th>

              <th className="p-3 text-left">
                Phone
              </th>

              <th className="p-3 text-left">
                Date
              </th>

              <th className="p-3 text-left">
                Time
              </th>

              <th className="p-3 text-left">
                Status
              </th>

              <th className="p-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredBookings.map(
              (booking) => (

                <tr
                  key={booking.id}
                  className="border-t"
                >

                  <td className="p-3">
                    {
                      booking.customer_name
                    }
                  </td>

                  <td className="p-3">
                    {booking.phone}
                  </td>

                  <td className="p-3">
                    {
                      booking.booking_date
                    }
                  </td>

                  <td className="p-3">
                    {booking.slot_time}
                  </td>

                  <td className="p-3">

                    <span
                      className={
                        booking.status ===
                        "confirmed"
                          ? "text-green-600"
                          : booking.status ===
                            "completed"
                          ? "text-blue-600"
                          : "text-red-600"
                      }
                    >
                      {booking.status}
                    </span>

                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      disabled={
                        loadingId ===
                        booking.id
                      }
                      onClick={() =>
                        handleStatus(
                          booking.id,
                          "completed"
                        )
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Complete
                    </button>

                    <button
                      disabled={
                        loadingId ===
                        booking.id
                      }
                      onClick={() =>
                        handleStatus(
                          booking.id,
                          "cancelled"
                        )
                      }
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Cancel
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}