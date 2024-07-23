// import TutorialCard from "@/components/TutorialCard/TutorialCard";
import Link from "next/link";

async function fetchTutorials() {
  const response = await fetch("http://localhost:3000/api/tutorials");
  const tutorials: ITutorial[] = await response.json();
  return tutorials;
}

export default async function TutorialsPage() {
  const tutorials: ITutorial[] = await fetchTutorials();

  return (
    <ul>
      {tutorials.map(({ id, title }) => (
        <li key={`tutorial_card_link-${id}`}>
          <Link href={`tutorials/${title}`}>
            <TutorialCard tutorialID={id} />
            <div></div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
