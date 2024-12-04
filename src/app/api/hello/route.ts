import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hola: "Mundo",
    method: "GET",
  });
}

export async function POST() {
  return NextResponse.json({
    hola: "Mundo",
    method: "POST",
  });
}
