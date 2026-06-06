import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

import { getSettings }
from "@/services/settings.service";

export async function POST(
  request: Request
) {

  try {

    const body =
      await request.json();

    const {
      customer_name,
      phone,
      booking_date,
      slot_time,
    } = body;

    const settings =
      await getSettings();

    const capacity =
      Number(
        settings.slot_capacity
      );

    const {
      data: existingBookings,
      error: bookingError,
    } = await supabase
      .from("bookings")
      .select("*")
      .eq(
        "booking_date",
        booking_date
      )
      .eq(
        "slot_time",
        slot_time
      )
      .neq(
        "status",
        "cancelled"
      );

    if (bookingError) {
      throw bookingError;
    }

    if (
      existingBookings.length >=
      capacity
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Slot is full",
        },
        {
          status: 400,
        }
      );

    }

    const {
      data,
      error,
    } = await supabase
      .from("bookings")
      .insert({
        customer_name,
        phone,
        booking_date,
        slot_time,
        status:
          "confirmed",
      })
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error: any) {

    return NextResponse.json(
      {
        success: false,
        message:
          error.message,
      },
      {
        status: 500,
      }
    );

  }

}