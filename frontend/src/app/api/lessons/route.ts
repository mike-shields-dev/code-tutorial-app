import { NextRequest, NextResponse } from "next/server";

const API_PORT = process.env.API_PORT || 5000;

// Route handler for GET requests
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const tutorial_id = url.searchParams.get("tutorial_id");
    const is_published = true; // Only fetch published lessons for users

    if (!tutorial_id) {
      return NextResponse.json(
        { error: "Missing tutorial_id parameter" },
        { status: 400 }
      );
    }

    const lessons = await fetchLessons(tutorial_id, is_published);

    return NextResponse.json(lessons);
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.error();
  }
}

// Helper function to fetch lessons by tutorial ID
async function fetchLessons(tutorial_id: string, is_published: boolean) {
  const response = await fetch(
    `http://localhost:${API_PORT}/lessons?tutorial=${tutorial_id}is_published=${is_published}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch tutorials");
  }

  const tutorials = await response.json();
  return tutorials;
}
