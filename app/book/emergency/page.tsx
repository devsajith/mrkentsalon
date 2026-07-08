"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BarberScissorsLoader from "@/components/BarberScissorsLoader";

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
};

type Slot = {
  time: string;
  endTime: string;
  booked: number;
  remaining: number;
  available: boolean;
  isPast?: boolean;
  isFullyBooked?: boolean;
};

function getEmergencyServiceDetails(name: string): { price: number; note?: string } {
  const clean = name.toLowerCase().trim();
  if (clean === "haircut") {
    return { price: 200, note: "Hair wash is complementary" };
  }
  if (clean.includes("haircut") && (clean.includes("shav") || clean.includes("beard"))) {
    return { price: 300, note: "Hair wash is complementary" };
  }
  if (clean.includes("shav") || clean.includes("beard")) {
    return { price: 150 };
  }
  return { price: 200 };
}

function formatTime12h(timeStr: string): string {
  if (!timeStr) return "";
  const [hourStr, minStr] = timeStr.split(":");
  const hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12}:${minStr} ${ampm}`;
}

function sortServicesPriority(servicesList: any[]): any[] {
  const priorityOrder = [
    "haircut",
    "shaving",
    "beard setting",
    "haircut + beard setting",
    "haircut + shave",
    "haircut + shaving"
  ];

  return [...servicesList].sort((a, b) => {
    const aName = a.name ? a.name.toLowerCase().trim() : "";
    const bName = b.name ? b.name.toLowerCase().trim() : "";

    const aIndex = priorityOrder.indexOf(aName);
    const bIndex = priorityOrder.indexOf(bName);

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;

    return aName.localeCompare(bName);
  });
}

export default function EmergencyBookingPage() {
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
  const [servicesLoading, setServicesLoading] = useState(true);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState("");
  const [isServiceExpanded, setIsServiceExpanded] = useState(true);
  const [selectedDate, setSelectedDate] = useState(threeDays[0].iso);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [isSlotExpanded, setIsSlotExpanded] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");


  function onClickBook() {
    setNameError("");
    setPhoneError("");
    setMessage("");

    if (!selectedService || !selectedDate || !selectedSlot || !customerName || !phone) {
      setMessage("Please fill all details and select date/time/service");
      return;
    }

    // Name Validation
    const nameLength = customerName.trim().length;
    if (nameLength < 3 || nameLength > 30) {
      setNameError("Name must be between 3 and 30 characters");
      return;
    }

    // Indian Phone Number Validation
    const cleanedPhone = phone.trim().replace(/[\s-]/g, "");
    const indianPhoneRegex = /^(?:(?:\+|0{0,2})91[\s-]?)?[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(cleanedPhone)) {
      setPhoneError("Please enter a valid 10-digit Indian phone number");
      return;
    }

    const service = services.find((s) => s.id === selectedService);
    if (!service) return;

    submitBooking("normal");
  }

  // ─── Existing Effects (PRESERVED) ────────────────────────────
  useEffect(() => {
    async function loadServices() {
      try {
        setServicesLoading(true);
        const response = await fetch("/api/service");
        const data = await response.json();
        
        const ALLOWED_EMERGENCY_SERVICES = [
          "haircut",
          "shaving",
          "beard setting",
          "haircut + beard setting",
          "haircut + shave",
          "haircut + shaving"
        ];
        
        const filtered = Array.isArray(data) ? data.filter((s: any) => {
          const clean = s.name ? s.name.toLowerCase().trim() : "";
          return ALLOWED_EMERGENCY_SERVICES.includes(clean);
        }) : [];
        
        setServices(sortServicesPriority(filtered));
      } catch (err) {
        // error handling
      } finally {
        setServicesLoading(false);
      }
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
    try {
      setSlotsLoading(true);
      // Fetch availability specifying bookingType=emergency
      const response = await fetch(
        `/api/availability?date=${date}&serviceId=${serviceId}&bookingType=emergency`
      );
      const data = await response.json();
      setSlots(data);
    } catch (err) {
      // error handling
    } finally {
      setSlotsLoading(false);
    }
  }

  async function submitBooking(tier: string) {
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
          booking_type: "emergency_" + tier, // Specify emergency booking type with selected tier
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setMessage("Booking Confirmed");

      window.location.href = `/booksuccess?reference=${result.data[0].booking_reference}&customer=${customerName}&service=${service.name}&date=${selectedDate}&time=${formatTime12h(slot.time)} - ${formatTime12h(slot.endTime)}&type=emergency_${tier}`;

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

  function formatSelectedDate(iso: string) {
    if (!iso) return "";
    const parts = iso.split("-");
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return iso;
  }

  // ─── JSX ──────────────────────────────────────────────────────
  if (!mounted || servicesLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <BarberScissorsLoader colorClass="text-red-600" label="Loading Services..." />
      </div>
    );
  }

  return (
    <div className="mobile-container bg-white md:bg-transparent min-h-dvh md:min-h-0 pb-12 md:px-4">
      {/* Two Column Grid layout for Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left Column (Header, Calendar, Service, Slots) */}
        <div className="md:col-span-7 space-y-6">
          {/* Header block with back button, title, and subtitle */}
          <div className="flex items-center gap-4 py-4 md:py-6 border-b border-border-light/40 mb-6">
            <Link
              href="/"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface border border-border-light text-text-primary hover:bg-border-light hover:text-red-600 transition-all tap-effect"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-red-600 tracking-tight flex items-center gap-2">
                <span className="animate-pulse inline-block w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
                Emergency Customer Booking
              </h1>
              <p className="text-xs md:text-sm text-text-secondary">Book using dedicated walk-in / emergency capacity slots</p>
            </div>
          </div>

          {/* Alert Notice Banner */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex gap-3">
            <div className="text-red-600 mt-0.5 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-800">Priority Emergency Slots</h3>
              <p className="text-xs text-red-700 mt-0.5 leading-relaxed">
                These slots are strictly reserved for emergency and walk-in customers. Capacity is limited and runs separately from normal client bookings.
              </p>
            </div>
          </div>

          {/* Choose Date card (3 Days selector) */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-border-light shadow-sm space-y-4">
            <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600/15 text-red-600 text-xs font-bold">1</span>
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
                      setSelectedSlot("");
                      setIsSlotExpanded(true);
                      loadSlots(selectedService, day.iso);
                    }}
                    className={`tap-effect flex flex-col items-center justify-center rounded-2xl p-3 border transition-all ${
                      isSelected
                        ? "bg-red-600 text-white border-red-600 shadow-md scale-[1.02]"
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

          {/* Service selection card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-border-light shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600/15 text-red-600 text-xs font-bold">2</span>
                Select Service
              </h2>
              {selectedService && !isServiceExpanded && (
                <button
                  type="button"
                  onClick={() => setIsServiceExpanded(true)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  Change
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>

            {selectedService && !isServiceExpanded ? (
              // Show ONLY selected service
              <div className="relative">
                {services.filter(s => s.id === selectedService).map((service) => {
                  const details = getEmergencyServiceDetails(service.name);
                  return (
                    <div
                      key={service.id}
                      className="p-4 rounded-xl border border-red-200 bg-red-50 text-text-primary flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold text-sm">{service.name}</p>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-text-secondary">
                          <span className="font-black text-red-600">
                            ₹{details.price}
                          </span>
                          {details.note && (
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-wide">
                              + Free Hair Wash
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsServiceExpanded(true)}
                        className="h-8 w-8 rounded-full hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors cursor-pointer"
                        title="Expand services"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Show ALL services
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((service) => {
                  const isSelected = selectedService === service.id;
                  const details = getEmergencyServiceDetails(service.name);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setSelectedService(service.id);
                        setIsServiceExpanded(false);
                        setSelectedSlot("");
                        setIsSlotExpanded(true);
                        loadSlots(service.id, selectedDate);
                      }}
                      className={`tap-effect text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-red-50 border-red-200 text-text-primary shadow-sm"
                          : "bg-surface border-border-light/20 hover:bg-border-light/50 text-text-primary"
                      }`}
                    >
                      <div className="space-y-0.5">
                        <p className="font-semibold text-sm">{service.name}</p>
                        <div className="flex items-baseline gap-1 mt-1 text-sm font-black text-red-600">
                          ₹{details.price}
                          {details.note && (
                            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded ml-1.5 uppercase tracking-wide">
                              + Free Hair Wash
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`h-5 w-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
                        isSelected ? "border-red-600 bg-red-600 text-white" : "border-text-muted/40"
                      }`}>
                        {isSelected && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Select Time Slot card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-border-light shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600/15 text-red-600 text-xs font-bold">3</span>
                Select Time Slot
              </h2>
              {selectedSlot && !isSlotExpanded && (
                <button
                  type="button"
                  onClick={() => setIsSlotExpanded(true)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                >
                  Change
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </div>

            {slotsLoading ? (
              <BarberScissorsLoader colorClass="text-red-600" size={48} label="Finding emergency slots..." />
            ) : selectedSlot && !isSlotExpanded ? (
              // Show ONLY selected slot
              <div className="relative">
                <div
                  className="p-4 rounded-xl border border-red-200 bg-red-50 text-text-primary flex items-center justify-between"
                >
                  <div>
                    <p className="font-bold text-sm text-red-600">Selected Time Slot</p>
                    <p className="text-xs text-text-secondary mt-1 flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatTime12h(selectedSlot)} - {formatTime12h(slots.find(s => s.time === selectedSlot)?.endTime || "")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSlotExpanded(true)}
                    className="h-8 w-8 rounded-full hover:bg-red-100 flex items-center justify-center text-red-600 transition-colors cursor-pointer"
                    title="Expand time slots"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : slots.length > 0 ? (
              // Show ALL slots
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[240px] overflow-y-auto pr-1">
                {slots.map((slot) => {
                  const isSelected = selectedSlot === slot.time;
                  const displayTime = slot.isFullyBooked && !slot.isPast ? `${formatTime12h(slot.time)} (Filled)` : formatTime12h(slot.time);
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => {
                        setSelectedSlot(slot.time);
                        setIsSlotExpanded(false);
                      }}
                      className={`tap-effect rounded-xl py-3 text-xs font-bold text-center border transition-all ${
                        isSelected
                          ? "bg-red-600 text-white border-red-600 shadow-md"
                          : slot.available
                            ? "bg-surface text-text-primary border border-border-light/20 hover:bg-border-light/60"
                            : slot.isFullyBooked && !slot.isPast
                              ? "bg-red-50 text-red-400 border-red-100 opacity-65 cursor-not-allowed"
                              : "bg-surface/40 text-text-muted border-transparent line-through opacity-30 cursor-not-allowed"
                      }`}
                    >
                      {displayTime}
                    </button>
                  );
                })}
              </div>
            ) : selectedService && selectedDate ? (
              <div className="text-center py-8 text-sm text-text-muted bg-surface rounded-xl border border-border-light/10 font-bold">
                {new Date(selectedDate + "T00:00:00+05:30").getDay() === 0 ? (
                  <span className="text-red-600">Sunday Off - Closed</span>
                ) : (
                  "No slots available for this day."
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-sm text-text-muted bg-surface rounded-xl border border-dashed border-border-light">
                Please select date and service first
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Booking Details Form / Summary - sticky on desktop) */}
        <div className="md:col-span-5 md:sticky md:top-24 space-y-6">
          <div className="bg-white rounded-2xl p-5 md:p-6 border border-border-light shadow-lg space-y-6">
            <h2 className="text-base font-bold text-text-primary pb-3 border-b border-border-light flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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

              <div className="flex items-start justify-between gap-4 pt-2 border-t border-border-light/60">
                <span className="text-xs text-text-secondary font-medium">Date & Time:</span>
                <span className="text-xs text-text-primary font-bold text-right">
                  {selectedDate ? (
                    <>
                      {formatSelectedDate(selectedDate)}
                      {selectedSlot && <span className="block text-red-600 font-black mt-0.5">@ {formatTime12h(selectedSlot)}</span>}
                    </>
                  ) : (
                    <span className="text-text-muted font-normal italic">Not selected</span>
                  )}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4 pt-2 border-t border-border-light/60">
                <span className="text-xs text-text-secondary font-medium">Type:</span>
                <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-700 border border-red-200 uppercase tracking-wider">
                  Emergency
                </span>
              </div>
              {selectedService && (() => {
                const s = services.find(x => x.id === selectedService);
                if (!s) return null;
                const details = getEmergencyServiceDetails(s.name);
                return (
                  <div className="flex items-start justify-between gap-4 pt-2 border-t border-border-light/60">
                    <span className="text-xs text-text-secondary font-medium">Emergency Fee:</span>
                    <span className="text-xs text-red-600 font-black text-right">
                      ₹{details.price}
                      {details.note && (
                        <span className="block text-[9px] font-bold text-emerald-600 uppercase tracking-wide mt-0.5">
                          * Includes Free Hair Wash
                        </span>
                      )}
                    </span>
                  </div>
                );
              })()}
            </div>

            {/* Step 4: Your Details */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-600/15 text-red-600 text-xs font-bold">4</span>
                Your Details
              </h2>
              <div className="space-y-3.5">
                <div>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Customer Name"
                      value={customerName}
                      onChange={(e) => {
                        setCustomerName(e.target.value);
                        if (nameError) setNameError("");
                      }}
                      className={`w-full rounded-xl bg-surface py-3.5 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none border transition-all font-medium ${
                        nameError ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-transparent focus:border-red-600/30 focus:ring-4 focus:ring-red-600/10"
                      }`}
                    />
                  </div>
                  {nameError && (
                    <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 animate-slide-down">
                      {nameError}
                    </p>
                  )}
                </div>

                <div>
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (phoneError) setPhoneError("");
                      }}
                      className={`w-full rounded-xl bg-surface py-3.5 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted outline-none border transition-all font-medium ${
                        phoneError ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/10" : "border-transparent focus:border-red-600/30 focus:ring-4 focus:ring-red-600/10"
                      }`}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-[10px] text-red-500 font-bold mt-1 ml-1 animate-slide-down">
                      {phoneError}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Confirm Booking Button */}
            <div className="hidden md:block pt-2">
              <button
                type="button"
                onClick={onClickBook}
                disabled={loading || !selectedService || !selectedDate || !selectedSlot || !customerName || !phone}
                className="tap-effect w-full rounded-xl bg-red-600 py-4 text-sm font-bold text-white shadow-md hover:shadow-lg transition-all active:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <BarberScissorsLoader size={18} label="" colorClass="text-white" containerClass="inline-flex items-center" />
                    Booking…
                  </>
                ) : (
                  "Confirm Emergency Booking"
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
            onClick={onClickBook}
            disabled={loading}
            className="tap-effect w-full rounded-2xl bg-red-600 py-4 text-base font-bold text-white shadow-lg transition-all active:shadow-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <BarberScissorsLoader size={18} label="" colorClass="text-white" containerClass="inline-flex items-center" />
                Booking…
              </span>
            ) : (
              "Book Emergency Now"
            )}
          </button>
        </div>
      </div>


    </div>
  );
}
