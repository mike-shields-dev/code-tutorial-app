import { DataSource } from 'typeorm';
import { Tutorial, Lesson } from './entities';

const { POSTGRES_PORT, POSTGRES_USER, POSTGRES_PASS, POSTGRES_DB } = process.env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: parseInt(POSTGRES_PORT!) || 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASS,
  database: POSTGRES_DB,
  synchronize: true,
  logging: false,
  entities: [Tutorial, Lesson],
});
