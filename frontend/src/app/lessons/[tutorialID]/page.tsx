import LessonCard from "@/components/LessonCard/LessonCard";
import { fetchLessons } from "@/app/api/lessons/route";
import Link from "next/link";
import React from "react";

async function LessonsPage({
  params: { tutorialID },
}: {
  params: { tutorialID: number };
}) {
  let lessons;

  // try {
  //   lessons = await fetchLessons(tutorialID);
  // } catch (err) {
  //   console.error(err);
  // }
  
  // console.log({ lessons });



  return (
    <>Lessons
      {/* {lessonsList.map((lesson) => (
        <Link 
          key={`lesson-card-link-${tutorialID}:${lesson.id}`}
          href={`lesson/${lesson.id}`}>
            <LessonCard
              tutorialID={tutorialID} 
              lessonID={lesson.id}
            />
        </Link>
      ))} */}
    </>
  );
}

export default LessonsPage;
