import { Tutorial, Topic } from "../../entities";
import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { ValidationError } from "class-validator";

export class TutorialController {
  /**
   * @description Creates a new tutorial
   *
   * @route POST /tutorials
   *
   * @param req Express request object
   * @param res Express response object
   *
   * @returns Success Response: status = 201, body = saved tutorial
   * @returns Error Response: status = 400 & body = error info
   */
  async createOne(req: Request, res: Response) {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: ["Request body must be non-empty object"],
      });
    }

    try {
      const tutorialRepository = AppDataSource.getRepository(Tutorial);
      const topicRepository = AppDataSource.getRepository(Topic);

      const newTutorial = {
        ...req.body,
        lessons: [],
        is_published: false,
      };

      if (newTutorial.topics) {
        newTutorial.topics = await Promise.all(
          newTutorial.topics.map(async (topic: Topic) => {
            const existingTopic = await topicRepository.findOne({
              where: { name: topic.name },
            });

            if (!existingTopic) {
              const newTopic = topicRepository.create(topic);
              const savedNewTopic = await topicRepository.save(newTopic);
              return savedNewTopic;
            } else {
              return existingTopic;
            }
          })
        );
      }

      const savedNewTutorial = await tutorialRepository.save(
        tutorialRepository.create(newTutorial)
      );

      return res.status(201).json(savedNewTutorial);
    } catch (err) {
      // console.error("Error creating tutorial:", err); // Error logging
      if (Array.isArray(err) && err[0] instanceof ValidationError) {
        const formattedErrors = err.map((validationError: ValidationError) => ({
          property: validationError.property,
          constraints: validationError.constraints,
        }));

        return res.status(400).json({
          message: "Validation failed!",
          errors: formattedErrors,
        });
      }

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * @description Fetches all tutorials
   *
   * @route GET /tutorials
   *
   * @param req Express request object
   * @param res Express response object
   *
   * @returns Success: Response with status 200 & body containing all tutorials
   * @returns Error: Response with status 500 & body containing error message
   */
  async readAll(req: Request, res: Response) {
    try {
      const tutorials = await AppDataSource.getRepository(Tutorial).find({
        relations: ["topics", "lessons"], // Fetch related topics with each tutorial
      });
  
      return res.status(200).json(tutorials);
    } catch (error) {
      // console.error("Error fetching tutorials:", error); // Error logging
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

  /**
   * @description Fetches all published tutorials
   *
   * @route GET /tutorials?is_published=true
   *
   * @param req Request
   * @param res REsponse
   *
   * @returns Success: Response with status 200 & body containing all published tutorials
   * @returns Error: Response with status 500 & body containing error message
   */
  async readPublished(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(Tutorial);
      const publishedTutorials = await repository.find({
        where: {
          is_published: true,
        },
      });

      return res.status(200).json(publishedTutorials);
    } catch (err) {
      // console.error("Error fetching published tutorials:", err); // Error logging
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * @description Fetches all unpublished tutorials
   * @route GET /tutorials?is_published=false
   *
   * @param req Request
   * @param res Response
   *
   * @returns Success: Response with status 200 & body containing all unpublished tutorials
   * @returns Error: Response with status 500 & body containing error message
   */
  async readUnpublished(req: Request, res: Response) {
    try {
      const repository = AppDataSource.getRepository(Tutorial);
      const unpublishedTutorials = await repository.find({
        where: {
          is_published: false,
        },
      });

      return res.status(200).json(unpublishedTutorials);
    } catch (err) {
      // console.error("Error fetching unpublished tutorials:", err); // Error logging
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * @description Fetches a single tutorial by ID
   *
   * @route GET /tutorials?id={id}
   *
   * @param req Request
   * @param res Response
   *
   * @returns Success: Response with status 200 & body containing tutorial with the provided ID
   * @returns Error: Response with status 400 if ID is not provided, 404 if tutorial is not found, 500 if internal server error
   */
  async readOne(req: Request, res: Response) {
    if (!("id" in req.query)) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      const id = parseInt(req.query.id as string);

      if (isNaN(id)) {
        return res
          .status(400)
          .json({ error: "Tutorial ID must be an integer" });
      }

      const repository = AppDataSource.getRepository(Tutorial);
      const tutorial = await repository.findOne({ where: { id } });

      if (!tutorial) {
        return res.status(404).json({ error: "Tutorial not found" });
      }

      return res.status(200).json(tutorial);
    } catch (err) {
      if (err instanceof ValidationError) {
        return res.status(400).json({ error: err });
      }
      // console.error("Error fetching tutorial:", err); // Error logging
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
