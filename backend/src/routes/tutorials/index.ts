import { Router } from "express";
import { Request, Response } from "express";
import { TutorialController } from "../../controllers/tutorialController";

const tutorialsRouter = Router();
const tutorialController = new TutorialController();

tutorialsRouter.post("/", async (req: Request, res: Response) => {
  return await tutorialController.createOne(req, res);
});

tutorialsRouter.route("/").get(async (req: Request, res: Response) => {
  if (!("is_published" in req.query)) {
    return await tutorialController.readAll(req, res);
  }

  if (req.query.is_published === "true") {
    return await tutorialController.readPublished(req, res);
  }

  if (req.query.is_published === "false") {
    return await tutorialController.readUnpublished(req, res);
  }

  if("id" in req.query){
    return await tutorialController.readOne(req, res);
  }
});

export default tutorialsRouter;
