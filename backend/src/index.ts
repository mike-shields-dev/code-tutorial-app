import { AppDataSource } from "./data-source";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

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
