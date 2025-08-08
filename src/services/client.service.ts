import { InferCreationAttributes } from "sequelize";
import { Client, sequelize } from "../models";
import { HttpError } from "../utils";
import { HTTP_STATUS, MESSAGES } from "../constants";

export class ClientService {
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
      const data = await Client.findAll({
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

    const result = await Client.findAndCountAll({
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

  get({
    id,
    scope,
  }: {
    id: string;
    scope?: keyof ReturnType<(typeof Client)["scopes"]>;
  }) {
    const _scope = scope?.split(",");
    const scopedModel = scope ? Client.scope(_scope) : Client;
    return scopedModel.findByPk(id);
  }

  async create(payload: InferCreationAttributes<Client>) {
    return await sequelize.transaction(async (transaction) => {
      const client = await Client.create(payload, { transaction });

      await client.createDirectory(
        {
          name: MESSAGES.DIRECTORY.DEFAULT.NAME,
          description: MESSAGES.DIRECTORY.DEFAULT.DESCRIPTION,
          is_default: true,
        },
        { transaction }
      );

      return client;
    });
  }

  async patch(id: string, updates: Partial<InferCreationAttributes<Client>>) {
    const existing = await Client.findByPk(id);
    if (!existing) {
      return null;
    }

    const [count] = await Client.update(updates, {
      where: { id },
    });

    if (count === 0) {
      throw new HttpError(
        HTTP_STATUS.CONFLICT,
        MESSAGES.CLIENT.DATA_NOT_CHANGED
      );
    }

    return await this.get({ id });
  }

  async delete(id: string) {
    const deletedCount = await Client.destroy({ where: { id } });
    return deletedCount > 0;
  }
}
