import { Tutorial } from "../../entities";
import { Request, Response } from "express";
import { readAll } from "../../common-queries/index";
import { AppDataSource } from "../../data-source";

const readAllTutorials = async (req: Request, res: Response) => await readAll(req, res, Tutorial);

const readPublishedTutorials = async (req: Request, res: Response) => {
  try {
    const repository = AppDataSource.getRepository(Tutorial);
    const activeTutorials = await repository.find({
      where: {
        is_published: true,
      },
    });

    if (!activeTutorials) {
      return res.status(404).json({ error: `No active tutorials found` });
    }

    res.json(activeTutorials);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { readAllTutorials, readPublishedTutorials };
