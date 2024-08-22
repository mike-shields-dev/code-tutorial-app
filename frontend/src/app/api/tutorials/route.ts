import { NextResponse } from "next/server";

const API_PORT = process.env.API_PORT || 5000;

// Route handler for GET requests
export async function GET() {
  try {
    const isPublished = true; // Only fetch published tutorials for users
    const tutorials = await fetchTutorials(isPublished);
    return NextResponse.json(tutorials);
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.error();
  }
}

// Helper function to fetch tutorials
async function fetchTutorials(isPublished: boolean) {
  const url = `http://localhost:${API_PORT}/tutorials?is_published=${isPublished}`;
  console.log({ url });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch tutorials");
  }

  const tutorials = await response.json();

  return tutorials;
}
