import { DataSource } from "typeorm";
import { AppDataSource } from "../src/data-source";
import { Lesson, Tutorial } from "../src/entities";
import dummyData from "../../shared/dummy_data";

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
