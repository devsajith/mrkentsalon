import { supabase } from "@/lib/supabase";

export async function getBookings() {
  const { data, error } =
    await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", {
        ascending: true,
      });

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
      .update({ status })
      .eq("id", id);

  if (error) {
    throw error;
  }

  return true;
}

export async function getDashboardStats() {

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
      todaysBookings,
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