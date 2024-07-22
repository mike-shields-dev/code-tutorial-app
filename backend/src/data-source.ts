import { DataSource } from "typeorm";
import { Tutorial, Lesson } from "./entities";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from the specified file
const envFile = path.resolve(__dirname, "../../.env.development");
dotenv.config({ path: envFile });

const { POSTGRES_URL } = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  url: POSTGRES_URL, // Use the URL directly from the .env file
  synchronize: true,
  logging: false,
  entities: [Tutorial, Lesson],
});
