import { geolocation } from "@vercel/functions";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { latitude, longitude } = geolocation(request);

  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
}
