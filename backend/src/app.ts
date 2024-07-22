import express from "express";
import "reflect-metadata";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from the specified file
const envFile = path.resolve(__dirname, process.env.ENV_FILE!);
dotenv.config({ path: envFile });

const PORT = process.env.EXPRESS_PORT || 5000;

const app = express();
app.use(express.json());

app.get("/api/tutorials", async (req, res) => {
  // Example placeholder response
  res.json("tutorials");
});

export default app;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log("Express is running on port " + PORT);
  });
}
