import { DataSource } from "typeorm";
import { AppDataSource } from "../src/data-source";
import { Lesson, Tutorial } from "../src/entities";

seedDatabase(AppDataSource);

export async function seedDatabase(appDataSource: DataSource) {
  try {
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
      await appDataSource.synchronize();
    }

    // Get repositories
    const tutorialRepository = AppDataSource.getRepository(Tutorial);
    const lessonRepository = AppDataSource.getRepository(Lesson);

    // Define tutorials data
    const dummyData = [
      {
        title: "Introduction to HTML",
        description:
          "Learn how HTML is used to define the structure of web pages.",
        is_published: true,
        lessons: [
          { title: "What is HTML?", is_published: true },
          { title: "HTML Tags", is_published: true },
          { title: "HTML Attributes", is_published: true },
          { title: "HTML Elements", is_published: true },
        ],
      },
      {
        title: "CSS Basics",
        description:
          "Learn how to target DOM elements and change how they look.",
        is_published: true,
        lessons: [
          { title: "What is CSS?", is_published: true },
          { title: "CSS Selectors", is_published: true },
          { title: "CSS Properties", is_published: true },
          { title: "CSS Box Model", is_published: true },
        ],
      },
      {
        title: "JavaScript Fundamentals",
        description: "Learn how to add interactivity to your web applications.",
        is_published: true,
        lessons: [
          { title: "What is JavaScript?", is_published: true },
          { title: "Variables", is_published: true },
          { title: "Functions", is_published: true },
          { title: "Objects", is_published: true },
        ],
      },
      {
        title: "TypeScript for Beginners",
        description:
          "Learn how TypeScript can help you to catch bugs and create large scale projects.",
        is_published: true,
        lessons: [
          { title: "What is TypeScript?", is_published: true },
          { title: "Type Annotations", is_published: true },
          { title: "Interfaces", is_published: true },
          { title: "Classes", is_published: true },
        ],
      },
    ];

    // Create tutorials and their lessons
    for (const tutorial of dummyData) {
      // Create and save the tutorial
      const tutorialEntry = tutorialRepository.create({
        title: tutorial.title,
        description: tutorial.description,
        is_published: tutorial.is_published,
      });
      await tutorialRepository.save(tutorialEntry);

      // Create and save the lessons for the current tutorial
      const lessonEntries = tutorial.lessons.map((lessonData) => {
        const lessonEntry = lessonRepository.create({
          title: lessonData.title,
          is_published: lessonData.is_published,
          tutorial: tutorialEntry, // Associate this lesson with the current tutorial
        });

        return lessonEntry;
      });

      await lessonRepository.save(lessonEntries); // Save all lessons at once
    }

    console.log("Database seeded successfully");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
