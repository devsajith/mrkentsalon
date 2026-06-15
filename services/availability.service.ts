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
  serviceId: string
) {

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

  const capacity =
    Number(
      settings.slot_capacity
    );

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
          (booking: { slot_time: string; end_time: string }) => {

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

        return {

          time: slot,

          endTime,

          booked:
            occupancy,

          remaining:
            capacity -
            occupancy,

          available:
            occupancy <
            capacity,

        };

      }
    );

  return availableSlots;
}