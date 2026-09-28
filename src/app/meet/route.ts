import { NextResponse } from "next/server";

const CALENDLY_URL = "https://calendly.com/ureb-arif-markit-media/new-meeting";

export function GET() {
  return NextResponse.redirect(CALENDLY_URL, 307);
}
