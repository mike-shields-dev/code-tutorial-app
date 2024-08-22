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

    if (items) {
      return res.status(200).json(items);
    }

    return res.status(404).json({ error: "No items found" });
    
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/**
 * @description Retrieves a single row from the database table associated with,
 * the provided entity, using the ID provided in the request parameters.
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
      return res
        .status(404)
        .json({ error: `${entity} with ID: ${id} not found` });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
