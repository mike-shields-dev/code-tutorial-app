import { Tutorial } from "../../entities";
import { Request, Response } from "express";
import { readAll } from "../../common-queries/index";
import { AppDataSource } from "../../data-source";

const createOneTutorial = async (req: Request, res: Response) => {
  try {
    const repository = AppDataSource.getRepository(Tutorial);
    const newTutorial = repository.create(req.body);
    const result = await repository.save(newTutorial);

    return res.status(201).json(result);
  } catch (err) {
    console.error("Error creating tutorial:", err); // Error logging
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const readAllTutorials = async (req: Request, res: Response) => {
  await readAll(req, res, Tutorial);
};

const readPublishedTutorials = async (req: Request, res: Response) => {
  try {
    const repository = AppDataSource.getRepository(Tutorial);
    const publishedTutorials = await repository.find({
      where: {
        is_published: true,
      },
    });

    return res.status(200).json(publishedTutorials);
  } catch (err) {
    console.error("Error fetching published tutorials:", err); // Error logging
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const readUnpublishedTutorials = async (req: Request, res: Response) => {
  try {
    const repository = AppDataSource.getRepository(Tutorial);
    const unpublishedTutorials = await repository.find({
      where: {
        is_published: false,
      },
    });

    return res.status(200).json(unpublishedTutorials);
  } catch (err) {
    console.error("Error fetching unpublished tutorials:", err); // Error logging
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { createOneTutorial, readAllTutorials, readPublishedTutorials };
