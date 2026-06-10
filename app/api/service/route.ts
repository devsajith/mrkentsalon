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
      (service: any) =>
        service.is_active
    )
  );

}