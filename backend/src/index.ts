import { AppDataSource } from "./data-source";
import app from "./app";
import * as dotenv from "dotenv";
import path from "path";

// Check if ENV_FILE is set
const envFile = process.env.ENV_FILE ? path.resolve(__dirname, process.env.ENV_FILE) : path.resolve(__dirname, '../.env.production');
dotenv.config({ path: envFile });

console.log(`Loading environment variables from: ${envFile}`);

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established.");

    const PORT = process.env.EXPRESS_PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Mode: ${process.env.NODE_ENV}`);
      console.log("Express is running on port " + PORT);
    });
  })
  .catch((err) => {
    console.error("Error initializing database connection:", err);
    process.exit(1);
  });
