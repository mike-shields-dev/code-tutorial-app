import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("http://localhost:5000/tutorials");
    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.error();
  }
}
