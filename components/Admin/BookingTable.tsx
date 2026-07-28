"use client";

import { useMemo, useState, useEffect } from "react";
import { updateBookingStatus } from "@/services/booking.service";

function formatTime12h(timeStr: string): string {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length < 2) return timeStr;
  let hour = parseInt(parts[0], 10);
  const min = parts[1];
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${min} ${ampm}`;
}

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

  const [typeFilter, setTypeFilter] =
    useState("all");

  const [loadingId, setLoadingId] =
    useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, typeFilter, itemsPerPage]);

  const filteredBookings =
    useMemo(() => {

      const filtered = bookings.filter(
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

          const matchesType =
            typeFilter === "all"
              ? true
              : typeFilter === "emergency"
                ? booking.booking_type?.startsWith("emergency")
                : !booking.booking_type?.startsWith("emergency");

          return (
            matchesSearch &&
            matchesType
          );
        }
      );

      const nowIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const todayStr = nowIST.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
      const currentTimeStr = `${String(nowIST.getHours()).padStart(2, "0")}:${String(nowIST.getMinutes()).padStart(2, "0")}`;

      const getIsUpcoming = (b: Booking) => {
        if (b.booking_date > todayStr) return true;
        if (b.booking_date === todayStr) {
          const slotTime = b.slot_time.substring(0, 5);
          return slotTime >= currentTimeStr;
        }
        return false;
      };

      return filtered.sort((a, b) => {
        const aUpcoming = getIsUpcoming(a);
        const bUpcoming = getIsUpcoming(b);

        if (aUpcoming && !bUpcoming) return -1;
        if (!aUpcoming && bUpcoming) return 1;

        if (aUpcoming && bUpcoming) {
          if (a.booking_date !== b.booking_date) {
            return a.booking_date.localeCompare(b.booking_date);
          }
          return a.slot_time.localeCompare(b.slot_time);
        }

        if (a.booking_date !== b.booking_date) {
          return b.booking_date.localeCompare(a.booking_date);
        }
        return b.slot_time.localeCompare(a.slot_time);
      });

    }, [
      bookings,
      search,
      typeFilter,
    ]);

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage) || 1;
  const startIndex = filteredBookings.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredBookings.length);

  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBookings.slice(start, start + itemsPerPage);
  }, [filteredBookings, currentPage, itemsPerPage]);

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
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light/40">
              {paginatedBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-sm font-semibold text-text-muted">
                    No bookings found matching filters
                  </td>
                </tr>
              ) : (
                paginatedBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-surface/20 transition-colors">
                    {/* Customer */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center shrink-0 border ${
                          booking.booking_type?.startsWith("emergency")
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
                        <span className={`w-1.5 h-1.5 rounded-full ${booking.booking_type?.startsWith("emergency") ? "bg-red-600" : "bg-accent"}`} />
                        {booking.service_name}
                      </span>
                    </td>

                    {/* Booking Type */}
                    <td className="p-4">
                      {(() => {
                        const type = booking.booking_type || "normal";
                        const isEmergency = type.startsWith("emergency");
                        const rawTier = isEmergency ? type.replace("emergency_", "") : type;
                        const tier = rawTier === "normal" ? "normal" : rawTier;
                        const tierDisplay = tier.charAt(0).toUpperCase() + tier.slice(1);
                        
                        return (
                          <div className="flex flex-col gap-1.5 items-start">
                            {isEmergency && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-red-700 border border-red-100">
                                <span className="w-1 h-1 rounded-full bg-red-600 animate-pulse" />
                                Emergency
                              </span>
                            )}
                            {!isEmergency && (
                              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border ${
                                tier === "premium"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : tier === "creative"
                                    ? "bg-purple-50 text-purple-700 border-purple-200"
                                    : "bg-slate-50 text-slate-700 border-slate-200"
                              }`}>
                                {tierDisplay}
                              </span>
                            )}
                          </div>
                        );
                      })()}
                    </td>

                    {/* Date & Time */}
                    <td className="p-4">
                      <div className="font-bold text-sm text-text-primary">
                        {(() => {
                          const parts = booking.booking_date.split("-");
                          return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : booking.booking_date;
                        })()}
                      </div>
                      <div className={`text-xs font-semibold mt-0.5 ${booking.booking_type?.startsWith("emergency") ? "text-red-600" : "text-accent"}`}>
                        {formatTime12h(booking.slot_time)} - {formatTime12h(booking.end_time)}
                      </div>
                    </td>

                    {/* Duration */}
                    <td className="p-4 text-sm font-semibold text-text-secondary">
                      {booking.duration} min
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      {(() => {
                        const nowIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
                        const todayStr = nowIST.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
                        const currentTimeStr = `${String(nowIST.getHours()).padStart(2, "0")}:${String(nowIST.getMinutes()).padStart(2, "0")}`;
                        
                        let isUpcoming = false;
                        if (booking.booking_date > todayStr) {
                          isUpcoming = true;
                        } else if (booking.booking_date === todayStr) {
                          const slotTime = booking.slot_time.substring(0, 5);
                          if (slotTime >= currentTimeStr) {
                            isUpcoming = true;
                          }
                        }

                        return isUpcoming ? (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200">
                            Upcoming
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 border border-slate-200">
                            Completed
                          </span>
                        );
                      })()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border-light bg-surface/30">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-text-secondary">
            <span>
              Showing <strong className="text-text-primary">{startIndex}</strong> to <strong className="text-text-primary">{endIndex}</strong> of <strong className="text-text-primary">{filteredBookings.length}</strong> bookings
            </span>
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="bg-white border border-border-light/80 rounded-lg px-2.5 py-1 text-xs font-bold text-text-primary outline-none cursor-pointer hover:border-accent/40 transition-colors"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>per page</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap justify-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 rounded-lg border border-border-light/80 bg-white text-xs font-bold text-text-primary hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                return (
                  page === 1 ||
                  page === totalPages ||
                  Math.abs(page - currentPage) <= 1
                );
              })
              .map((page, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && page - prev > 1;
                return (
                  <div key={page} className="flex items-center gap-1.5">
                    {showEllipsis && (
                      <span className="px-1 text-text-muted text-xs font-bold">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[32px] h-8 px-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                        currentPage === page
                          ? "bg-accent text-white shadow-sm shadow-accent/20"
                          : "bg-white border border-border-light/80 text-text-primary hover:bg-surface"
                      }`}
                    >
                      {page}
                    </button>
                  </div>
                );
              })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 rounded-lg border border-border-light/80 bg-white text-xs font-bold text-text-primary hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

}