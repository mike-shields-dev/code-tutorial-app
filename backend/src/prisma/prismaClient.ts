import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.ENV_FILE || '.env.development' });

console.log("NODE_ENV=" + process.env.NODE_ENV);

const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@localhost:5432/${process.env.POSTGRES_DB}`
    }
  }
});

export default prismaClient;
