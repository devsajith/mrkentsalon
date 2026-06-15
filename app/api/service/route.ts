import { NextResponse }
from "next/server";

import {
  getServices,
} from "@/services/service.service";

export async function GET() {

  const services =
    await getServices();

  return NextResponse.json(
    services.filter(
      (service: { is_active: boolean }) =>
        service.is_active
    )
  );

}