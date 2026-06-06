import { supabase } from "@/lib/supabase";
import { getSettings } from "./settings.service";

function generateSlots(
  openingTime: string,
  closingTime: string,
  slotDuration: number
) {

  const slots = [];

  const start =
    new Date(
      `1970-01-01T${openingTime}`
    );

  const end =
    new Date(
      `1970-01-01T${closingTime}`
    );

  while (start < end) {

    slots.push(
      start
        .toTimeString()
        .slice(0, 5)
    );

    start.setMinutes(
      start.getMinutes() +
      slotDuration
    );

  }

  return slots;
}

export async function getAvailableSlots(
  date: string
) {

  const settings =
    await getSettings();

  const slots =
    generateSlots(
      settings.opening_time,
      settings.closing_time,
      Number(
        settings.slot_duration
      )
    );

  const { data, error } =
    await supabase
      .from("bookings")
      .select("*")
      .eq(
        "booking_date",
        date
      );

  if (error) {
    throw error;
  }

  const capacity =
    Number(
      settings.slot_capacity
    );

  return slots.map(
    (slot) => {

      const count =
        data.filter(
          (booking) =>
            booking.slot_time
              .slice(0, 5) === slot
        ).length;

      return {
        time: slot,
        booked: count,
        remaining:
          capacity - count,
        available:
          count < capacity,
      };

    }
  );
}