import { DataSource } from "typeorm";
import { AppDataSource } from "../src/data-source";
import { Lesson, Tutorial } from "../src/entities";

export async function seedDatabase(appDataSource: DataSource) {
  try {    
    // Get repositories
    const tutorialRepository = AppDataSource.getRepository(Tutorial);
    const lessonRepository = AppDataSource.getRepository(Lesson);

    // Define tutorials data
    const tutorialsData = [
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
    for (const tutorialData of tutorialsData) {
      // Create and save the tutorial
      const tutorial = tutorialRepository.create({
        title: tutorialData.title,
        description: tutorialData.description,
        is_published: tutorialData.is_published,
      });
      await tutorialRepository.save(tutorial);

      // Create and save the lessons for the current tutorial
      const lessons = tutorialData.lessons.map((lessonData) => {
        const lesson = lessonRepository.create({
          title: lessonData.title,
          is_published: lessonData.is_published,
          tutorial, // Associate this lesson with the current tutorial
        });
        return lesson;
      });

      await lessonRepository.save(lessons); // Save all lessons at once
    }

    console.log("Database seeded successfully");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
