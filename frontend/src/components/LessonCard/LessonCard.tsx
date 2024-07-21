import React, { ReactNode } from "react";

import Card from "../Card/Card";
import { getLessonCardConfig } from "@/utils/localFileSystemMethods";

export default async function LessonCard({
  tutorialID,
  lessonID,
}: {
  tutorialID: string;
  lessonID: string;
}) {
  const { description } = await getLessonCardConfig(tutorialID, lessonID);

  return (
    <Card className="p-4 border-2 rounded-md">
      <Card.Title>{lessonID}</Card.Title>
      <Card.Description>{description}</Card.Description>
    </Card>
  );
}
