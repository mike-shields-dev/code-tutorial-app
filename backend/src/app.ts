import express from 'express';
import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config({ path: process.env.ENV_FILE || '.env.test' });

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
