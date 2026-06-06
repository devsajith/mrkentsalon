"use client";

import { useState } from "react";
import { createBooking }from "@/services/publicbooking.service";
type Slot = {
  time: string;
  booked: number;
  remaining: number;
  available: boolean;
};

export default function BookingPage() {

  const [date, setDate] =
    useState("");

  const [slots, setSlots] =
    useState<Slot[]>([]);

  const [selectedSlot, setSelectedSlot] =
    useState("");

  const [customerName, setCustomerName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [message, setMessage] =
    useState("");

  async function loadSlots(
    selectedDate: string
  ) {

    setDate(selectedDate);

    const response =
      await fetch(
        `/api/availability?date=${selectedDate}`
      );

    const data =
      await response.json();

    setSlots(data);
  }

  async function handleBooking() {

    try {

      await createBooking({
        customer_name:
          customerName,
        phone,
        booking_date: date,
        slot_time:
          selectedSlot,
      });

      setMessage(
        "Booking created successfully"
      );

      setCustomerName("");
      setPhone("");
      setSelectedSlot("");

      await loadSlots(date);

    } catch (error) {

      console.error(error);

      setMessage(
        "Failed to create booking"
      );

    }

  }

  return (

    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Book Appointment
      </h1>

      <div className="space-y-4">

        <input
          type="date"
          value={date}
          onChange={(e) =>
            loadSlots(
              e.target.value
            )
          }
          className="border p-2 rounded w-full"
        />

        {slots.length > 0 && (

          <div className="grid grid-cols-3 gap-3">

            {slots.map((slot) => (

              <button
                key={slot.time}
                disabled={
                  !slot.available
                }
                onClick={() =>
                  setSelectedSlot(
                    slot.time
                  )
                }
                className={`p-3 rounded border
                ${
                  selectedSlot ===
                  slot.time
                    ? "bg-black text-white"
                    : ""
                }
                ${
                  !slot.available
                    ? "opacity-50"
                    : ""
                }`}
              >
                {slot.time}
              </button>

            ))}

          </div>

        )}

        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) =>
            setCustomerName(
              e.target.value
            )
          }
          className="border p-2 rounded w-full"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) =>
            setPhone(
              e.target.value
            )
          }
          className="border p-2 rounded w-full"
        />

        <button
          onClick={handleBooking}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Book Appointment
        </button>

        {message && (

          <div className="p-3 bg-green-100 rounded">

            {message}

          </div>

        )}

      </div>

    </div>

  );

}