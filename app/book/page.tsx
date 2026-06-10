"use client";

import { useEffect, useState } from "react";

type Service = {
  id: string;
  name: string;
  duration: number;
};

type Slot = {
  time: string;
  endTime: string;
  booked: number;
  remaining: number;
  available: boolean;
};

export default function BookingPage() {

  const [services,
    setServices] =
    useState<Service[]>([]);

  const [selectedService,
    setSelectedService] =
    useState("");

  const [selectedDate,
    setSelectedDate] =
    useState("");

  const [slots,
    setSlots] =
    useState<Slot[]>([]);

  const [selectedSlot,
    setSelectedSlot] =
    useState("");

  const [customerName,
    setCustomerName] =
    useState("");

  const [phone,
    setPhone] =
    useState("");

  const [loading,
    setLoading] =
    useState(false);

  const [message,
    setMessage] =
    useState("");

  useEffect(() => {

    async function loadServices() {

      const response =
        await fetch(
          "/api/service"
        );

      const data =
        await response.json();

      setServices(data);

    }

    loadServices();

  }, []);

  async function loadSlots(
    serviceId: string,
    date: string
  ) {

    if (
      !serviceId ||
      !date
    ) {
      return;
    }

    const response =
      await fetch(
        `/api/availability?date=${date}&serviceId=${serviceId}`
      );

    const data =
      await response.json();

    setSlots(data);

  }

  async function handleBooking() {

    try {

      setLoading(true);

      const service =
        services.find(
          (s) =>
            s.id ===
            selectedService
        );

      if (!service) {
        throw new Error(
          "Please select service"
        );
      }

      const slot =
        slots.find(
          (s) =>
            s.time ===
            selectedSlot
        );

      if (!slot) {
        throw new Error(
          "Please select slot"
        );
      }

      const response =
        await fetch(
          "/api/booking",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              customer_name:
                customerName,

              phone,

              booking_date:
                selectedDate,

              slot_time:
                slot.time,

              end_time:
                slot.endTime,

              duration:
                service.duration,

              service_id:
                service.id,

              service_name:
                service.name,
            }),
          }
        );

      const result =
        await response.json();
        console.log("result:", result);

      if (
        !response.ok
      ) {
        throw new Error(
          result.message
        );
      }

      setMessage(
        "Booking Confirmed"
      );

      window.location.href =
        `/booksuccess?reference=${result.data[0].booking_reference}&customer=${customerName}&service=${service.name}&date=${selectedDate}&time=${slot.time}-${slot.endTime}`;

      setCustomerName("");
      setPhone("");
      setSelectedSlot("");

      await loadSlots(
        selectedService,
        selectedDate
      );

    } catch (
      error: any
    ) {

      setMessage(
        error.message
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Book Appointment
      </h1>

      <div className="space-y-4">

        <select
          value={
            selectedService
          }
          onChange={(
            e
          ) => {

            setSelectedService(
              e.target.value
            );

            loadSlots(
              e.target.value,
              selectedDate
            );

          }}
          className="border p-2 rounded w-full"
        >

          <option value="">
            Select Service
          </option>

          {services.map(
            (
              service
            ) => (

              <option
                key={
                  service.id
                }
                value={
                  service.id
                }
              >
                {
                  service.name
                }
                {" "}
                (
                {
                  service.duration
                }
                min)
              </option>

            )
          )}

        </select>

        <input
          type="date"
          value={
            selectedDate
          }
          onChange={(
            e
          ) => {

            setSelectedDate(
              e.target.value
            );

            loadSlots(
              selectedService,
              e.target.value
            );

          }}
          className="border p-2 rounded w-full"
        />

        <div className="grid grid-cols-3 gap-2">

          {slots.map(
            (
              slot
            ) => (

              <button
                key={
                  slot.time
                }
                disabled={
                  !slot.available
                }
                onClick={() =>
                  setSelectedSlot(
                    slot.time
                  )
                }
                className={`border p-2 rounded

                ${
                  selectedSlot ===
                  slot.time
                    ? "bg-black text-white"
                    : ""
                }

                ${
                  !slot.available
                    ? "bg-red-100 opacity-50"
                    : ""
                }`}
              >

                <div>
                  {
                    slot.time
                  }
                </div>

                <div className="text-xs">

                  {
                    slot.available
                      ? `${slot.remaining} Left`
                      : "Fully Booked"
                  }

                </div>

              </button>

            )
          )}

        </div>

        <input
          type="text"
          placeholder="Customer Name"
          value={
            customerName
          }
          onChange={(
            e
          ) =>
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
          onChange={(
            e
          ) =>
            setPhone(
              e.target.value
            )
          }
          className="border p-2 rounded w-full"
        />

        <button
          onClick={
            handleBooking
          }
          disabled={
            loading
          }
          className="bg-black text-white p-3 rounded w-full"
        >
          {loading
            ? "Booking..."
            : "Book Appointment"}
        </button>

        {message && (

          <div className="p-3 bg-gray-100 rounded">

            {message}

          </div>

        )}

      </div>

    </div>

  );

}