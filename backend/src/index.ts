import express from 'express';
import db from './prisma/prismaClient';
import { Tutorial } from '@prisma/client';

const PORT = process.env.EXPRESS_PORT || 3000

const app = express();
app.use(express.json());

app.get('/api/tutorials', async (req, res) => {
  const tutorials: Tutorial[] = await db.tutorial.findMany();
  res.json(tutorials);
});

app.listen(PORT, () => {
  // console.log("NODE_ENV=" + process.env.NODE_ENV);
  console.log('Server is running on port ' + PORT);
});
