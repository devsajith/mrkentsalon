export async function createBooking(
  booking: {
    customer_name: string;
    phone: string;
    booking_date: string;
    slot_time: string;
  }
) {

  const response =
    await fetch(
      "/api/booking",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(
          booking
        ),
      }
    );

  const data =
    await response.json();

  if (!response.ok) {

    throw new Error(
      data.message
    );

  }

  return data;
}