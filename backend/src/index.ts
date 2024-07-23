import { AppDataSource } from "./data-source";
import app from "./app";
import dotenv from "dotenv";
import path from "path";

const envFilename = `.env.${process.env.NODE_ENV}`;
const envFilePath = path.resolve(__dirname, envFilename);
dotenv.config({ path: envFilePath });

const PORT = process.env.EXPRESS_PORT || 5000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();

    app.listen(PORT, () => {
      console.log(`Mode: ${process.env.NODE_ENV}`);
      console.log("Express is running on port " + PORT);
    });
  } catch (err) {
    console.error("Error initializing database connection:", err);
    process.exit(1);
  }
};

startServer();
