"use client";

import { useMemo, useState } from "react";
import { updateBookingStatus } from "@/services/booking.service";

type Booking = {
  id: string;
  customer_name: string;
  phone: string;
  booking_date: string;
  slot_time: string;
  end_time: string;
  service_name: string;
  duration: number;
  status: string;
  booking_type?: string;
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

  const [typeFilter, setTypeFilter] =
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

          const matchesType =
            typeFilter === "all"
              ? true
              : typeFilter === "emergency"
                ? booking.booking_type === "emergency"
                : booking.booking_type !== "emergency";

          return (
            matchesSearch &&
            matchesStatus &&
            matchesType
          );
        }
      );

    }, [
      bookings,
      search,
      statusFilter,
      typeFilter,
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

      alert(
        "Failed to update booking"
      );

    } finally {

      setLoadingId("");

    }

  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Card */}
      <div className="bg-white p-5 rounded-2xl border border-border-light shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search customer name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface/50 border border-border-light/60 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-text-primary placeholder:text-text-muted outline-none border-transparent focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all"
            />
          </div>

          {/* Type Dropdown */}
          <div className="relative w-full md:w-48 shrink-0">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full appearance-none bg-surface/50 border border-border-light/60 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-text-primary outline-none border-transparent focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="normal">Normal Bookings</option>
              <option value="emergency">Emergency Bookings</option>
            </select>
            {/* Custom chevron */}
            <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {/* Status Dropdown */}
          <div className="relative w-full md:w-48 shrink-0">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none bg-surface/50 border border-border-light/60 rounded-xl py-3 pl-4 pr-10 text-sm font-bold text-text-primary outline-none border-transparent focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            {/* Custom chevron */}
            <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Bookings Table list */}
      <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="bg-surface/50 border-b border-border-light">
                <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Customer</th>
                <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Contact</th>
                <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Service</th>
                <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Type</th>
                <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Date & Time</th>
                <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Duration</th>
                <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="p-4 text-left text-[11px] font-bold text-text-muted uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light/40">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-sm font-semibold text-text-muted">
                    No bookings found matching filters
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-surface/20 transition-colors">
                    {/* Customer */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center shrink-0 border ${
                          booking.booking_type === "emergency"
                            ? "bg-red-50 text-red-600 border-red-200"
                            : "bg-surface text-text-primary border-border-light/60"
                        }`}>
                          {booking.customer_name ? booking.customer_name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2) : "MK"}
                        </div>
                        <span className="font-bold text-sm text-text-primary">{booking.customer_name}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="p-4 text-sm font-medium text-text-secondary">
                      {booking.phone}
                    </td>

                    {/* Service */}
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-text-primary border border-border-light/40">
                        <span className={`w-1.5 h-1.5 rounded-full ${booking.booking_type === "emergency" ? "bg-red-600" : "bg-accent"}`} />
                        {booking.service_name}
                      </span>
                    </td>

                    {/* Booking Type */}
                    <td className="p-4">
                      {booking.booking_type === "emergency" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-700 border border-red-100">
                          <span className="w-1 h-1 rounded-full bg-red-600 animate-pulse" />
                          Emergency
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 border border-slate-100">
                          Normal
                        </span>
                      )}
                    </td>

                    {/* Date & Time */}
                    <td className="p-4">
                      <div className="font-bold text-sm text-text-primary">
                        {booking.booking_date}
                      </div>
                      <div className={`text-xs font-semibold mt-0.5 ${booking.booking_type === "emergency" ? "text-red-600" : "text-accent"}`}>
                        {booking.slot_time} - {booking.end_time}
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="p-4 text-sm font-semibold text-text-secondary">
                      {booking.duration} min
                    </td>

                    {/* Status badge */}
                    <td className="p-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ring-1 ${
                        booking.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-600/10"
                          : booking.status === "completed"
                            ? "bg-blue-50 text-blue-700 ring-blue-600/10"
                            : "bg-red-50 text-red-700 ring-red-600/10"
                      }`}>
                        {booking.status}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="p-4">
                      {booking.status === "confirmed" ? (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            disabled={loadingId === booking.id}
                            onClick={() => handleStatus(booking.id, "completed")}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg shadow-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1"
                          >
                            {loadingId === booking.id ? (
                              <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            ) : null}
                            Complete
                          </button>

                          <button
                            type="button"
                            disabled={loadingId === booking.id}
                            onClick={() => handleStatus(booking.id, "cancelled")}
                            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs px-3 py-1.5 rounded-lg shadow-sm font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs font-semibold text-text-muted italic">No actions</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

}