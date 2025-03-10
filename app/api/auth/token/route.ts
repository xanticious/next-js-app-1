import { auth } from "@/app/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const token = await auth();

  return NextResponse.json(token);
}
