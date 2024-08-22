import Link from "next/link";
import TutorialCard from "@/components/TutorialCard/TutorialCard";

export default async function TutorialsPage() {
  let tutorials: ITutorial[] = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/tutorials`,
      {
        cache: "no-store", // Ensures fresh data on each request
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch tutorials");
    }

    tutorials = await res.json();
  } catch (error) {
    console.error("Failed to fetch tutorials:", error);
  }

  return (
    <main>
      <h1>Tutorials</h1>
      <ul className="grid gap-4">
        {tutorials.map((tutorial) => (
          <Link
            key={`tutorial-card-${tutorial.id}`}
            href={`/lessons/${tutorial.id}`}
          >
            {tutorial.id && (
              <TutorialCard>
                <h2>{tutorial.title}</h2>
                <p>{tutorial.description}</p>
              </TutorialCard>
            )}
          </Link>
        ))}
      </ul>
    </main>
  );
}
