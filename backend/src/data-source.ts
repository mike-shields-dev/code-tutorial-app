import { DataSource } from 'typeorm';
import { Tutorial, Lesson } from './entities';

import dotenv from 'dotenv';
dotenv.config({ path: process.env.ENV_FILE || '.env.test' });

const { POSTGRES_URL } = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: POSTGRES_URL,  // Use the URL directly from the .env file
  synchronize: true,
  logging: false,
  entities: [Tutorial, Lesson],
});
