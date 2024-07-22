import { AppDataSource } from './data-source';
import app from './app';

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
