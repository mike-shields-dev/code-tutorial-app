import { DataSource } from "typeorm";
import { Tutorial, Lesson } from "./entities";
import path from "path";
import dotenv from "dotenv";

// Configures which local postgresql database,
// that TypeORM connects to, based on the NODE_ENV environment variable.
const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
dotenv.config({ path: envFilePath });

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: true,
  logging: false,
  entities: [Tutorial, Lesson],
});
