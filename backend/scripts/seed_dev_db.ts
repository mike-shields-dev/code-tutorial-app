import { DataSource } from "typeorm";
import { AppDataSource } from "../src/data-source";
import { Lesson, Tutorial, Topic } from "../src/entities";
import dummyData from "../../shared/dummy_data";

seedDatabase(AppDataSource);

export async function seedDatabase(appDataSource: DataSource) {
  try {
    if (!appDataSource.isInitialized) {
      await appDataSource.initialize();
    }

    const queryRunner = appDataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction();

      // Truncate tables to remove existing records
      await queryRunner.query(`TRUNCATE TABLE "lesson" CASCADE`);
      await queryRunner.query(`TRUNCATE TABLE "tutorial" CASCADE`);
      await queryRunner.query(`TRUNCATE TABLE "topic" CASCADE`);

      // Reset sequences to start IDs from 1
      await queryRunner.query(`ALTER SEQUENCE lesson_id_seq RESTART WITH 1`);
      await queryRunner.query(`ALTER SEQUENCE tutorial_id_seq RESTART WITH 1`);
      await queryRunner.query(`ALTER SEQUENCE topic_id_seq RESTART WITH 1`);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    // Synchronize schema
    await appDataSource.synchronize();

    // Get repositories
    const tutorialRepository = AppDataSource.getRepository(Tutorial);
    const lessonRepository = AppDataSource.getRepository(Lesson);
    const topicRepository = AppDataSource.getRepository(Topic);

    // Create a map to keep track of topics to avoid duplicates
    const topicMap = new Map<string, Topic>();

    // Process each tutorial
    for (const tutorialData of dummyData) {
      // Add unique topics to the database using reduce
      const tutorialTopics = await tutorialData.topics.reduce<Promise<Topic[]>>(
        async (accPromise, { name }) => {
          const acc = await accPromise;

          // Check if the topic is already in the map
          if (!topicMap.has(name)) {
            let topic = await topicRepository.findOneBy({ name });
            if (!topic) {
              topic = topicRepository.create({ name });
              await topicRepository.save(topic);
            }
            topicMap.set(name, topic); // Store the full Topic entity in the map
          }

          // Add the topic from the map to the accumulator array
          acc.push(topicMap.get(name) as Topic);

          return acc;
        },
        Promise.resolve([])
      );

      // Create and save the tutorial
      const tutorialEntry = tutorialRepository.create({
        title: tutorialData.title,
        description: tutorialData.description,
        level: tutorialData.level || "beginner",
        is_published: tutorialData.is_published,
        topics: tutorialTopics,
      });

      await tutorialRepository.save(tutorialEntry);

      // Create and save the lessons
      const lessonEntries = tutorialData.lessons.map((lessonData) => {
        return lessonRepository.create({
          title: lessonData.title,
          is_published: lessonData.is_published,
          tutorial: tutorialEntry,
        });
      });

      await lessonRepository.save(lessonEntries);
    }

    console.log("Database seeded successfully");
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
