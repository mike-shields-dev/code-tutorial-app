import { DataSource } from "typeorm";
import { Tutorial, Lesson } from "./entities";
import path from "path";
import dotenv from "dotenv";

// Configures which .env file is used to configure TypeORM based on NODE_ENV: 
// .env.development, .env.test, or .env.production
const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
dotenv.config({ path: envFilePath });

// Check if the NODE_ENV is set to production
const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: !isProduction, // Only synchronize in development and test environments
  logging: false,
  entities: [Tutorial, Lesson],
});
