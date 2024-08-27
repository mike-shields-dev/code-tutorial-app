import { Router } from "express";
import { Request, Response } from "express";
import {
  createOneTutorial,
  readAllTutorials,
  readPublishedTutorials,
  readUnpublishedTutorials,
} from "../../controllers/tutorialController";
import isTutorial from "../../../../shared/type_guards/isTutorial";

const tutorialsRouter = Router();

tutorialsRouter.post("/", async (req: Request, res: Response) => {
  const tutorial = req.body;

  if (!isTutorial(tutorial)) {
    return res.status(400).json({
      message: "Validation failed! Required fields: title (non-empty string), description (non-empty string) is_published (boolean)"
    });
  }

  return await createOneTutorial(req, res);
});

tutorialsRouter.route("/").get(async (req: Request, res: Response) => {
  if (!("is_published" in req.query)) {
    return await readAllTutorials(req, res);
  }

  if (req.query.is_published === "true") {
    return await readPublishedTutorials(req, res);
  }

  if (req.query.is_published === "false") {
    return await readUnpublishedTutorials(req, res);
  }
});

export default tutorialsRouter;
