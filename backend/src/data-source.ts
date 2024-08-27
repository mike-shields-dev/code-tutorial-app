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
  // TODO: Production database credentials
}

if (!username || !password || !database) {
  throw new Error("Database credentials not found");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: `postgres://${username}:${password}@localhost:5432/${database}`,
  synchronize: NODE_ENV !== "production", // Only synchronize if not in production
  logging: false,
  entities: [Tutorial, Lesson],
});
