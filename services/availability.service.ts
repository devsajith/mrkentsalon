import { supabase } from "@/lib/supabase";

import { getSettings }
from "./settings.service";

import { getServices }
from "./service.service";

import {
  addMinutes,
  generateTimeSlots,
  overlaps,
} from "@/utils/time";

export async function getAvailableSlots(
  date: string,
  serviceId: string,
  bookingType: string = "normal"
) {
  // Sunday Off Check (Day 0 is Sunday in IST)
  const dayOfWeek = new Date(date + "T00:00:00+05:30").getDay();
  if (dayOfWeek === 0) {
    return [];
  }

  const settings =
    await getSettings();

  const services =
    await getServices();

  const service = services.find(
    (s: { id: string }) =>
      s.id === serviceId
  );

  if (!service) {
    throw new Error(
      "Service not found"
    );
  }

  const duration =
    service.duration;

  const isEmergency = bookingType === "emergency" || (typeof bookingType === "string" && bookingType.startsWith("emergency"));
  const capacity =
    isEmergency
      ? Number(settings.walkin_capacity || 0)
      : Number(settings.slot_capacity || 0);

  const { data: bookings,
    error } =
    await supabase
      .from("bookings")
      .select("*")
      .eq(
        "booking_date",
        date
      )
      .neq(
        "status",
        "cancelled"
      );

  if (error) {
    throw error;
  }

  const todayStr = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });
  const now = new Date();
  const currentKolkataTime = now.toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const isToday = date === todayStr;

  const candidateSlots =
    generateTimeSlots(
      settings.opening_time,
      settings.closing_time,
      30
    );

  const availableSlots =
    candidateSlots.map(
      (slot) => {

        const endTime =
          addMinutes(
            slot,
            duration
          );

        let occupancy = 0;

        bookings.forEach(
          (booking: { slot_time: string; end_time: string; booking_type?: string }) => {
            const isTargetType = isEmergency
              ? booking.booking_type?.startsWith("emergency")
              : !booking.booking_type?.startsWith("emergency");

            if (!isTargetType) return;

            const overlapsSlot =
              overlaps(
                slot,
                endTime,
                booking.slot_time,
                booking.end_time
              );

            if (
              overlapsSlot
            ) {
              occupancy++;
            }

          }
        );

        const isPast = isToday && (slot < currentKolkataTime);
        const isFullyBooked = occupancy >= capacity;

        return {

          time: slot,

          endTime,

          booked:
            occupancy,

          remaining:
            Math.max(0, capacity - occupancy),

          available:
            occupancy <
            capacity && !isPast,

          isPast,

          isFullyBooked,

        };

      }
    );

  return availableSlots.filter((slot) => !slot.isPast);
}