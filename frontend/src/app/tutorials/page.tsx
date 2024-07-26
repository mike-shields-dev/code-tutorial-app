import Link from "next/link";
import { fetchTutorials } from "@/app/api/tutorials/route";
import TutorialCard from "@/components/TutorialCard/TutorialCard";

export default async function TutorialsPage() {
  let tutorials: ITutorial[] = [];

  try {
    tutorials = await fetchTutorials();
  } catch (error) {
    console.error("Failed to fetch tutorials:", error);
  }

  return (
    <main>
      <ul className="grid gap-4">
        {tutorials.map((tutorial) => (
          <Link
            key={`tutorial-card-${tutorial.id}`}
            href={`/lessons/${tutorial.id}`}
          >
            <TutorialCard>
              <TutorialCard.Title>{tutorial.title}</TutorialCard.Title>
              <TutorialCard.Description>
                {tutorial.description}
              </TutorialCard.Description>
            </TutorialCard>
          </Link>
        ))}
      </ul>
    </main>
  );
}
