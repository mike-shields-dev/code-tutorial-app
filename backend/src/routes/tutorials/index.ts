import { Router } from "express";
import { Request, Response } from "express";
import { readAllTutorials, readActiveTutorials } from "../../controllers/tutorialController";

const tutorialsRouter = Router();

tutorialsRouter.route("/").get(async (req: Request, res: Response) => {
  if("is_active" in req.query) {
    return readActiveTutorials(req, res);
  }
  await readAllTutorials(req, res);
});

export default tutorialsRouter;
