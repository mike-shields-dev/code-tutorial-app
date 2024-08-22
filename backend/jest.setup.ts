import path from 'path';
import dotenv from 'dotenv';
import { AppDataSource } from './src/data-source';

// Ensure the NODE_ENV is set to 'test'
process.env.NODE_ENV = 'test';

// Load environment variables from the appropriate .env file
const envFilePath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
dotenv.config({ path: envFilePath });

// Initialize the AppDataSource before running any tests
beforeAll(async () => {
  await AppDataSource.initialize();
});

// Clean up the database after each test (optional)
afterEach(async () => {
  await AppDataSource.synchronize(true); // This will drop and recreate tables
});

// Close the connection after all tests are done
afterAll(async () => {
  await AppDataSource.destroy();
});
