import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

import { getSettings } from "@/services/settings.service";

import { overlaps } from "@/utils/time";
import { generateBookingReference } from "@/utils/reference";

export async function POST(
  request: Request
) {
  try {

    const bookingReference = generateBookingReference();

    const body =
      await request.json();

    const {
      customer_name,
      phone,

      booking_date,

      service_id,
      service_name,

      duration,

      slot_time,
      end_time,
      booking_type,
    } = body;

    // -----------------------------
    // Validation
    // -----------------------------

    if (
      !customer_name ||
      !phone ||
      !booking_date ||
      !service_id ||
      !slot_time ||
      !end_time
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill all required fields",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Duplicate Booking Check
    // -----------------------------

    const {
      data: duplicateBookings,
      error: duplicateError,
    } = await supabase
      .from("bookings")
      .select("*")
      .eq("phone", phone)
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

    if (duplicateError) {
      throw duplicateError;
    }

    if (
      duplicateBookings &&
      duplicateBookings.length > 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You already have a booking for this time slot",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------
    // Capacity Validation
    // -----------------------------

    const settings =
      await getSettings();

    const currentBookingType = booking_type === "emergency" ? "emergency" : "normal";
    const capacity =
      currentBookingType === "emergency"
        ? Number(settings.walkin_capacity || 0)
        : Number(settings.slot_capacity || 0);

    const {
      data: bookings,
      error: bookingError,
    } = await supabase
      .from("bookings")
      .select("*")
      .eq(
        "booking_date",
        booking_date
      )
      .neq(
        "status",
        "cancelled"
      );

    if (bookingError) {
      throw bookingError;
    }

    let occupancy = 0;

    bookings.forEach(
      (booking: { slot_time: string; end_time: string; booking_type?: string }) => {
        const isTargetType = currentBookingType === "emergency"
          ? booking.booking_type === "emergency"
          : booking.booking_type !== "emergency";

        if (!isTargetType) return;

        const isOverlap =
          overlaps(
            slot_time,
            end_time,
            booking.slot_time,
            booking.end_time
          );

        if (isOverlap) {
          occupancy++;
        }

      }
    );

    if (
      occupancy >= capacity
    ) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Selected time slot is fully booked",
        },
        {
          status: 400,
        }
      );

    }

    // -----------------------------
    // Create Booking
    // -----------------------------

    const {
      data,
      error: insertError,
    } = await supabase
      .from("bookings")
      .insert({
        customer_name,
        phone,

        booking_date,

        service_id,
        service_name,

        duration,

        slot_time,
        end_time,

        status:
          "confirmed",
        booking_reference: bookingReference,
        booking_type: currentBookingType,

      })
      .select();

    if (insertError) {
      throw insertError;
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (error) {

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Internal Server Error",
      },
      {
        status: 500,
      }
    );

  }
}