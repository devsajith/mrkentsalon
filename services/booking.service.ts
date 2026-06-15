import { supabase } from "@/lib/supabase";
import { unstable_noStore } from "next/cache";
export async function getBookings() {

    unstable_noStore();

  const { data, error } =
    await supabase

      .from("bookings")

      .select("*")

      .order(
        "created_at",
        {
          ascending: false,
        }
      );

  if (error) {

    throw error;

  }

  return data;

}

export async function updateBookingStatus(
  id: string,
  status: string
) {

  const { error } =
    await supabase

      .from("bookings")

      .update({
        status,
      })

      .eq("id", id);

  if (error) {

    throw error;

  }

  return true;

}

export async function getDashboardStats() {

    unstable_noStore();


  const bookings =
    await getBookings();

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const todaysBookings =
    bookings.filter(
      (booking) =>
        booking.booking_date ===
        today
    );

  const completedBookings =
    bookings.filter(
      (booking) =>
        booking.status ===
        "completed"
    );

  const upcomingBookings =
    bookings.filter(
      (booking) =>
        booking.status ===
        "confirmed"
    );

  return {

    todaysBookings:
      todaysBookings.length,

    completedBookings:
      completedBookings.length,

    upcomingBookings:
      upcomingBookings.length,

    todaySchedule:
      todaysBookings.sort(
        (a, b) =>

          a.slot_time.localeCompare(
            b.slot_time
          )
      ),

  };

}

export async function getTodaysBookings() {

  const today =
    new Date()
      .toISOString()
      .split("T")[0];

  const { data, error } =
    await supabase

      .from("bookings")

      .select("*")

      .eq(
        "booking_date",
        today
      )

      .order(
        "slot_time",
        {
          ascending: true,
        }
      );

  if (error) {

    throw error;

  }

  return data;

}