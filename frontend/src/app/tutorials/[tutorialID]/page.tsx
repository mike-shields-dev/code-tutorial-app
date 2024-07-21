import LessonCard from "@/components/LessonCard/LessonCard";
import { getLessonsList } from "@/utils/localFileSystemMethods";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function TutorialPage({
  params: { tutorialID },
}: {
  params: { tutorialID: string };
}) {
  let lessonsList;

  try {
    lessonsList = await getLessonsList(tutorialID);
  } catch (err) {
    notFound();
  }
  
  return (
    <>
      {lessonsList.map((lessonID) => (
        <Link 
          key={`lesson-card-link-${tutorialID}:${lessonID}`}
          href={`tutorials/${tutorialID}/lessons/lessonID`}>
            <LessonCard
              tutorialID={tutorialID} 
              lessonID={lessonID}
            />
        </Link>
      ))}
    </>
  );
}

export default TutorialPage;
