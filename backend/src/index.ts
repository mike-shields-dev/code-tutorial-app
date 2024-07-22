import { AppDataSource } from './data-source';
import app from './app';
import * as dotenv from 'dotenv'
dotenv.config({ path: process.env.ENV_FILE || '.env.test' })

AppDataSource.initialize()
  .then(() => {
    console.log("Database connection established.");
    
    const PORT = process.env.EXPRESS_PORT || 5000;
    app.listen(PORT, () => {
      console.log("Express is running on port " + PORT);
    });
    
  })
  .catch((err) => {
    console.error("Error initializing database connection:", err);
    process.exit(1);
  });
