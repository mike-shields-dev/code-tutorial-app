"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

function LessonNotFound() {
  const { lessonID } = useParams();

  return (
    <div>
      <h2>Lesson {lessonID} not found</h2>
      <Link href="/">Return to Tutorials</Link>
    </div>
  );
}

export default LessonNotFound;
