import path from "path";
import dotenv from "dotenv";
import { AppDataSource } from "./src/data-source";
import { beforeAll, afterAll } from "@jest/globals";

// Load environment variables from the appropriate .env file
const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
dotenv.config({ path: envFilePath });

// Initialize the AppDataSource before running any tests
beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);

  const queryRunner = AppDataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();

    // Truncate tables to remove existing records
    await queryRunner.query(`TRUNCATE TABLE "lesson" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "tutorial" CASCADE`);
    await queryRunner.query(`TRUNCATE TABLE "topic" CASCADE`);

    // Reset ID increment counters (sequences) for each table
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
});

// Close the connection after all tests are done
afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});
