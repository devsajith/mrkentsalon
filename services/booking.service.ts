import { supabase } from "@/lib/supabase";
import { unstable_noStore } from "next/cache";
export async function getBookings() {

  unstable_noStore();

  const { data, error } =
    await supabase

      .from("bookings")

      .select("*")

      .order("booking_date", { ascending: false })
      .order("slot_time", { ascending: false });

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

      .toLocaleDateString(
        "en-CA",
        {
          timeZone:
            "Asia/Kolkata",
        }
      );

  const todaysBookings =
    bookings.filter(
      (booking) =>
        booking.booking_date ===
        today
    );

  const todaysEmergencyBookings =
    todaysBookings.filter(
      (booking) =>
        booking.booking_type?.startsWith("emergency")
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

  const nowIST = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const currentTimeStr = `${String(nowIST.getHours()).padStart(2, "0")}:${String(nowIST.getMinutes()).padStart(2, "0")}`;

  const upcomingTodaysBookings = todaysBookings.filter((booking) => {
    const slotTime = booking.slot_time.substring(0, 5);
    return slotTime >= currentTimeStr;
  });

  return {

    todaysBookings:
      todaysBookings.length,

    todaysEmergencyBookings:
      todaysEmergencyBookings.length,

    completedBookings:
      completedBookings.length,

    upcomingBookings:
      upcomingBookings.length,

    todaySchedule:
      upcomingTodaysBookings.sort(
        (a, b) =>
          b.slot_time.localeCompare(
            a.slot_time
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