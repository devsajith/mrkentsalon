"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Service = {
  id: string;
  name: string;
  duration: number;
};

type Slot = {
  time: string;
  endTime: string;
  booked: number;
  remaining: number;
  available: boolean;
};
export default function BookingPage() {
  // Generate the 3 days (Today, Tomorrow, Day After)
  const threeDays = Array.from({ length: 3 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const date = String(d.getDate()).padStart(2, "0");
    const iso = `${year}-${month}-${date}`;
    
    let label = "";
    if (i === 0) label = "Today";
    else if (i === 1) label = "Tomorrow";
    else {
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const monthNamesShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      label = `${dayNames[d.getDay()]}, ${monthNamesShort[d.getMonth()]} ${d.getDate()}`;
    }
    return { iso, label, dateObj: d };
  });

  // ─── Existing State (PRESERVED) ───────────────────────────────
  const [mounted, setMounted] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState(threeDays[0].iso);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ─── Existing Effects (PRESERVED) ────────────────────────────
  useEffect(() => {
    async function loadServices() {
      const response = await fetch("/api/service");
      const data = await response.json();
      setServices(data);
    }
    loadServices();
  }, []);

  useEffect(() => {
    const handle = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  // ─── Existing Functions (PRESERVED) ──────────────────────────
  async function loadSlots(serviceId: string, date: string) {
    if (!serviceId || !date) {
      return;
    }
    const response = await fetch(
      `/api/availability?date=${date}&serviceId=${serviceId}`
    );
    const data = await response.json();
    setSlots(data);
  }

  async function handleBooking() {
    try {
      setLoading(true);

      const service = services.find((s) => s.id === selectedService);
      if (!service) {
        throw new Error("Please select service");
      }

      const slot = slots.find((s) => s.time === selectedSlot);
      if (!slot) {
        throw new Error("Please select slot");
      }

      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: customerName,
          phone,
          booking_date: selectedDate,
          slot_time: slot.time,
          end_time: slot.endTime,
          duration: service.duration,
          service_id: service.id,
          service_name: service.name,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setMessage("Booking Confirmed");

      window.location.href = `/booksuccess?reference=${result.data[0].booking_reference}&customer=${customerName}&service=${service.name}&date=${selectedDate}&time=${slot.time}-${slot.endTime}`;

      setCustomerName("");
      setPhone("");
      setSelectedSlot("");

      await loadSlots(selectedService, selectedDate);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  // ─── Calendar Helpers ─────────────────────────────────────────
  function formatSelectedDate(iso: string) {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ];
    return `${dayNames[d.getDay()]} - ${monthNames[d.getMonth()]} ${d.getDate()}`;
  }

  // ─── JSX ──────────────────────────────────────────────────────
  if (!mounted) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-accent/25 border-t-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="mobile-container bg-white md:bg-transparent min-h-dvh md:min-h-0 pb-12 md:px-4">
      
      {/* Two Column Grid layout for Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (Header, Service, Calendar, Slots) */}
        <div className="md:col-span-7 space-y-6">
          {/* Header block with back button, title, and subtitle */}
          <div className="flex items-center gap-4 py-4 md:py-6 border-b border-border-light/40 mb-6">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border-light text-text-primary hover:bg-border-light hover:text-accent transition-all tap-effect"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">Book an Appointment</h1>
              <p className="text-xs md:text-sm text-text-secondary">Follow the steps to configure your booking</p>
            </div>
          </div>

          {/* Service selection card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-border-light shadow-sm space-y-4">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent text-xs font-bold">1</span>
              Select Service
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {services.map((service) => {
                const isSelected = selectedService === service.id;
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      setSelectedService(service.id);
                      loadSlots(service.id, selectedDate);
                    }}
                    className={`tap-effect text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-accent/10 border-accent text-text-primary shadow-sm"
                        : "bg-surface border-border-light/20 hover:bg-border-light/50 text-text-primary"
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-sm">{service.name}</p>
                      <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service.duration} mins
                      </p>
                    </div>
                    <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                      isSelected ? "border-accent bg-accent text-white" : "border-text-muted/40"
                    }`}>
                      {isSelected && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Choose Date card (3 Days selector) */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-border-light shadow-sm space-y-4">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent text-xs font-bold">2</span>
              Choose Date
            </h2>
            
            <div className="grid grid-cols-3 gap-3">
              {threeDays.map((day) => {
                const isSelected = selectedDate === day.iso;
                return (
                  <button
                    key={day.iso}
                    type="button"
                    onClick={() => {
                      setSelectedDate(day.iso);
                      loadSlots(selectedService, day.iso);
                    }}
                    className={`tap-effect flex flex-col items-center justify-center rounded-2xl p-3 border transition-all ${
                      isSelected
                        ? "bg-accent text-white border-accent shadow-md scale-[1.02]"
                        : "bg-surface text-text-primary border-border-light/20 hover:bg-border-light/50"
                    }`}
                  >
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${isSelected ? "text-white/80" : "text-text-muted"}`}>
                      {day.label}
                    </span>
                    <span className="text-2xl font-black mt-1.5">
                      {day.dateObj.getDate()}
                    </span>
                    <span className={`text-[9px] font-semibold mt-1 ${isSelected ? "text-white/80" : "text-text-secondary"}`}>
                      {day.dateObj.toLocaleDateString('en-US', { month: 'short' })}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Select Time Slot card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-border-light shadow-sm space-y-4">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent text-xs font-bold">3</span>
              Select Time Slot
            </h2>
            {slots.length > 0 ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-[240px] overflow-y-auto pr-1">
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setSelectedSlot(slot.time)}
                      className={`tap-effect rounded-xl py-3 text-xs font-bold text-center border transition-all ${
                        isSelected
                          ? "bg-accent text-white border-accent shadow-md"
                          : slot.available
                            ? "bg-surface text-text-primary border border-border-light/20 hover:bg-border-light/60"
                            : "bg-surface/40 text-text-muted border-transparent line-through opacity-30 cursor-not-allowed"
                      }`}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            ) : selectedService && selectedDate ? (
              <div className="text-center py-8 text-sm text-text-muted bg-surface rounded-xl border border-border-light/10">
                No slots available for this day.
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-text-muted bg-surface rounded-xl border border-dashed border-border-light">
                Please select service first
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Booking Details Form / Summary - sticky on desktop) */}
        <div className="md:col-span-5 md:sticky md:top-24 space-y-6">
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-border-light shadow-lg space-y-6">
            
            <h2 className="text-base font-bold text-text-primary pb-3 border-b border-border-light flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2-2V12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Booking Summary
            </h2>

            {/* Message / Error banner */}
            {message && (
              <div
                className={`animate-slide-down rounded-xl px-4 py-3 text-sm font-medium ${
                  message === "Booking Confirmed"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-red-50 text-red-600 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* Selection summary list */}
            <div className="space-y-3 bg-surface p-4 rounded-xl border border-border-light/20">
              <div className="flex items-start justify-between gap-4">
                <span className="text-xs text-text-secondary font-medium">Service:</span>
                <span className="text-xs text-text-primary font-bold text-right">
                  {services.find(s => s.id === selectedService)?.name || (
                    <span className="text-text-muted font-normal italic">Not selected</span>
                  )}
                </span>
              </div>
              {selectedService && (
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs text-text-secondary font-medium">Duration:</span>
                  <span className="text-xs text-text-primary font-bold text-right">
                    {services.find(s => s.id === selectedService)?.duration} mins
                  </span>
                </div>
              )}
              <div className="flex items-start justify-between gap-4 pt-2 border-t border-border-light/60">
                <span className="text-xs text-text-secondary font-medium">Date & Time:</span>
                <span className="text-xs text-text-primary font-bold text-right">
                  {selectedDate ? (
                    <>
                      {formatSelectedDate(selectedDate)}
                      {selectedSlot && <span className="block text-accent font-black mt-0.5">@ {selectedSlot}</span>}
                    </>
                  ) : (
                    <span className="text-text-muted font-normal italic">Not selected</span>
                  )}
                </span>
              </div>
            </div>

            {/* Step 4: Your Details */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/15 text-accent text-xs font-bold">4</span>
                Your Details
              </h2>
              <div className="space-y-3">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Customer Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full rounded-xl bg-surface py-3.5 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none border border-transparent focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all font-medium"
                  />
                </div>
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl bg-surface py-3.5 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none border border-transparent focus:border-accent/30 focus:ring-4 focus:ring-accent/10 transition-all font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Confirm Booking Button */}
            <div className="hidden md:block pt-2">
              <button
                type="button"
                onClick={handleBooking}
                disabled={loading || !selectedService || !selectedDate || !selectedSlot || !customerName || !phone}
                className="tap-effect w-full rounded-xl bg-gradient-to-r from-accent to-accent-light py-4 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all active:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-light flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Booking…
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── Fixed Bottom – Book Now (Mobile View only) ── */}
      <div className="sticky bottom-0 left-0 right-0 z-30 bg-white rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.08)] safe-bottom md:hidden">
        <div className="px-5 pt-4 pb-3">
          <button
            type="button"
            onClick={handleBooking}
            disabled={loading}
            className="tap-effect w-full rounded-2xl bg-gradient-to-r from-accent to-accent-light py-4 text-base font-bold text-white shadow-lg transition-all active:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Booking…
              </span>
            ) : (
              "Book Now"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}