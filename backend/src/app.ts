import express from "express";
import "reflect-metadata";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import tutorialsRoute from "./routes/tutorials";

const envFilename = `.env.${process.env.NODE_ENV}`;
const envFilePath = path.resolve(process.cwd(), envFilename);
dotenv.config({ path: envFilePath });

const PORT = process.env.EXPRESS_PORT || 5000;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/tutorials", tutorialsRoute);

export default app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log("Express is running on port " + PORT);
  });
}
