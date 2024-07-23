import { DataSource } from "typeorm";
import { Tutorial, Lesson } from "./entities";
import path from "path";
import dotenv from "dotenv";

const envFilename = `.env.${process.env.NODE_ENV}`;
const envFilePath = path.resolve(process.cwd(), envFilename);
dotenv.config({ path: envFilePath });

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.POSTGRES_URL,
  synchronize: true,
  logging: false,
  entities: [Tutorial, Lesson],
});
