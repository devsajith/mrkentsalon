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

  if (!date) {

    return NextResponse.json(
      {
        error:
          "Date required",
      },
      {
        status: 400,
      }
    );

  }

  const slots =
    await getAvailableSlots(
      date
    );

  return NextResponse.json(
    slots
  );

}