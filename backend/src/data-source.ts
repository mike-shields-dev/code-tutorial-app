import { DataSource } from "typeorm";
import { Tutorial, Lesson } from "./entities";
import dotenv from "dotenv";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";

let username = "";
let password = "";
let database = "";

if (NODE_ENV === "development") {
  username = process.env.DEV_DB_USER || "";
  password = process.env.DEV_DB_PASSWORD || "";
  database = process.env.DEV_DB_NAME || "";
} else if (NODE_ENV === "test") {
  username = process.env.TEST_DB_USER || "";
  password = process.env.TEST_DB_PASSWORD || "";
  database = process.env.TEST_DB_NAME || "";
} else if (NODE_ENV === "production") {
  username = process.env.PROD_DB_USER || "";
  password = process.env.PROD_DB_PASSWORD || "";
  database = process.env.PROD_DB_NAME || "";
}

if (!username || !password || !database) {
  throw new Error(`Database credentials not found for ${NODE_ENV} environment`);
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: `postgres://${username}:${password}@localhost:5432/${database}`,
  synchronize: NODE_ENV !== "production", // Avoid schema sync in production
  logging: NODE_ENV === "development", // Enable logging in development
  entities: [Tutorial, Lesson],
});
