import { AppDataSource } from "../src/data-source"; // Adjust the path as necessary
import { Tutorial } from "../src/entities"; // Adjust the path as necessary

const env = process.env.NODE_ENV;

console.log({ env });

const seedDatabase = async () => {
  try {
    await AppDataSource.initialize();
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    // Drop and recreate the table
    await queryRunner.query("DROP TABLE IF EXISTS tutorial");
    await queryRunner.query(`
      CREATE TABLE tutorial (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        is_available BOOLEAN NOT NULL,
        description VARCHAR NOT NULL,
        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const tutorialRepository = AppDataSource.getRepository(Tutorial);

    // Dummy data
    const tutorials = [
      {
        title: "Introduction to HTML",
        description:
          "Learn how HTML is used to define the structure of web pages.",
        is_available: true,
      },
      {
        title: "CSS Basics",
        description:
          "Learn how to target DOM elements and change how they look.",
        is_available: true,
      },
      {
        title: "JavaScript Fundamentals",
        description: "Learn how to add interactivity to your web applications.",
        is_available: true,
      },
      {
        title: "TypeScript for Beginners",
        description:
          "Learn how typescript can help you to catch bugs and create large scale projects.",
        is_available: true,
      },
    ];

    // Save dummy data
    for (const tutorial of tutorials) {
      const newTutorial = tutorialRepository.create(tutorial);
      await tutorialRepository.save(newTutorial);
    }

    console.log("Database seeded successfully");
    await queryRunner.release();
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

seedDatabase();
