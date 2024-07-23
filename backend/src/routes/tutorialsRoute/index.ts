import { Router } from "express";
import { Request, Response } from "express";
import { readAllTutorials } from "../../controllers/tutorialController";

const tutorialsRouter = Router();

tutorialsRouter.route("/").get(async (req: Request, res: Response) => {  
  await readAllTutorials(req, res);
});

export default tutorialsRouter;
