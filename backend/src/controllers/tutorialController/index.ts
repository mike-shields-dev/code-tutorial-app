import { Tutorial } from "../../entities";
import { Request, Response } from "express";
import { readAll } from "../../queries/index";

const readAllTutorials = async (req: Request, res: Response) =>
  readAll(req, res, Tutorial);

export { readAllTutorials };
