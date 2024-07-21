"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

function TutorialNotFound() {
  const { tutorialID } = useParams();

  return (
    <div>
      <h2>Tutorial {tutorialID} not found</h2>
      <Link href="/">Return to Tutorials</Link>
    </div>
  );
}

export default TutorialNotFound;
