import { NextResponse }
from "next/server";

import {
  getAvailableSlots,
} from "@/services/availability.service";

export async function GET(
  request: Request
) {

  const {
    searchParams,
  } = new URL(
    request.url
  );

  const date =
    searchParams.get("date");

  const serviceId =
    searchParams.get(
      "serviceId"
    );

  const bookingType =
    searchParams.get("bookingType") || "normal";

  if (
    !date ||
    !serviceId
  ) {

    return NextResponse.json(
      {
        error:
          "Date and serviceId required",
      },
      {
        status: 400,
      }
    );

  }

  const slots =
    await getAvailableSlots(
      date,
      serviceId,
      bookingType
    );

  return NextResponse.json(
    slots
  );
}