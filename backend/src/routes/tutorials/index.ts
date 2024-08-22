import { Router } from "express";
import { Request, Response } from "express";
import {
  readAllTutorials,
  readPublishedTutorials,
} from "../../controllers/tutorialController";

const tutorialsRouter = Router();

tutorialsRouter.route("/").get(async (req: Request, res: Response) => {
  if ("is_published" in req.query) {
    await readPublishedTutorials(req, res);
  } else {
    await readAllTutorials(req, res);
  }
});

export default tutorialsRouter;
