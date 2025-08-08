import { InferCreationAttributes } from "sequelize";
import { Directory } from "../models";
import { HttpError } from "../utils";
import { HTTP_STATUS, MESSAGES } from "../constants";

export class DirectoryService {
  async list({
    limit = 10,
    offset = 0,
    all = false,
  }: {
    limit?: number;
    offset?: number;
    all?: boolean;
  } = {}) {
    if (all) {
      const data = await Directory.findAll({
        order: [["created_at", "DESC"]],
      });

      return {
        data,
        total: data.length,
        limit: data.length,
        offset: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      };
    }

    const result = await Directory.findAndCountAll({
      limit,
      offset,
      order: [["created_at", "DESC"]],
    });

    const { count: total, rows: data } = result;

    return {
      data,
      total,
      limit,
      offset,
      hasNextPage: offset + limit < total,
      hasPreviousPage: offset > 0,
    };
  }

  get({ id }: { id: string }) {
    return Directory.findByPk(id);
  }

  create(
    payload: InferCreationAttributes<
      Directory,
      { omit: "id" | "created_at" | "updated_at" }
    >
  ) {
    return Directory.create(payload as Directory);
  }

  async patch(
    id: string,
    updates: Partial<InferCreationAttributes<Directory>>
  ) {
    const existing = await Directory.findByPk(id);
    if (!existing) {
      return null;
    }

    const [count] = await Directory.update(updates, {
      where: { id },
    });

    if (count === 0) {
      throw new HttpError(
        HTTP_STATUS.CONFLICT,
        MESSAGES.DIRECTORY.DATA_NOT_CHANGED
      );
    }

    return await this.get({ id });
  }

  async delete(id: string) {
    const deletedCount = await Directory.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
