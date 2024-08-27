import path from "path";
import dotenv from "dotenv";
import { AppDataSource } from "./src/data-source";
import { seedDatabase } from "./scripts/seedDb";
import { beforeAll, afterAll } from "@jest/globals";
import { Tutorial } from "./src/entities";
import { Connection } from "typeorm";

// Load environment variables from the appropriate .env file
const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
dotenv.config({ path: envFilePath });

// Initialize the AppDataSource before running any tests
beforeAll(async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize(true);
});

// Close the connection after all tests are done
afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});
