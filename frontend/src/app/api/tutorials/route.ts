import { NextResponse } from 'next/server';

export async function fetchTutorials() {
  const response = await fetch("http://localhost:5000/tutorials?is_active=true");
  if (!response.ok) {
    throw new Error("Failed to fetch tutorials");
  }
  const tutorials = await response.json();
  return tutorials;
}

export async function GET() {
  try {
    const tutorials = await fetchTutorials();
    return NextResponse.json(tutorials);
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.error();
  }
}
