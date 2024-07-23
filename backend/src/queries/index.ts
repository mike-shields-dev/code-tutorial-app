import { Request, Response } from "express";
import { EntityTarget, ObjectLiteral } from "typeorm";
import { AppDataSource } from "../data-source";

/**
 * @description
 * Retrieves all rows in the database table associated with,
 * the provided entity.
 *
 * Responds with a 500 status error, if not successful.
 *
 * @param req { Request }
 * @param res { Response }
 * @param entity { EntityTarget<ObjectLiteral> }
 */
export const readAll = async (
  req: Request,
  res: Response,
  entity: EntityTarget<ObjectLiteral>
) => {
  try {
    const repository = AppDataSource.getRepository(entity);
    const items = await repository.find();

    res.json(items);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 *
 * @param req { Request }
 * @param res { Response }
 * @param entity { EntityTarget<ObjectLiteral> }
 */
export const readOne = async (
  req: Request,
  res: Response,
  entity: EntityTarget<ObjectLiteral>
) => {
  try {
    const { id } = req.params;

    if (Number.isNaN(parseInt(id))) {
      return res.status(400).json({ error: "Invalid ID" });
    }

    const repository = AppDataSource.getRepository(entity);
    const result = await repository.findOne({
      where: {
        id: id,
      },
    });

    if (!result) {
      res.status(404).json({ error: `${entity} with ID: ${id} not found`});
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
