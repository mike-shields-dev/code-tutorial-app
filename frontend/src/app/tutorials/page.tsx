import { fetchTutorials } from "../api/tutorials/route";

export default async function Page() {
  const tutorials = await fetchTutorials();
  
  return (
    <main>
      <ul>
        {tutorials.map((tutorial: { id: number; title: string }) => (
          <li key={tutorial.id}>{tutorial.title}</li>
        ))}
      </ul>
    </main>
  );
}
