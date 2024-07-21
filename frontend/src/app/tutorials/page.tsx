import TutorialCard from "@/components/TutorialCard/TutorialCard";
import { getTutorialsList } from "@/utils/localFileSystemMethods";
import Link from "next/link";

export default async function TutorialsPage() {
  const tutorialsList = await getTutorialsList();

  return (
    <ul>
      {tutorialsList.map((tutorialID) => (
        <li key={`tutorial_card_link-${tutorialID}`}>
          <Link href={`tutorials/${tutorialID}`}>
            <TutorialCard tutorialID={tutorialID} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
