import { Request, Response } from "express";
import { ClientService, DirectoryService } from "../services";
import { HTTP_STATUS, MESSAGES } from "../constants";
import { HttpError } from "../utils";

const clientService = new ClientService();

export class ClientController {
  async list(req: Request, res: Response) {
    const limit = parseInt(req.query.limit as string, 10);
    const offset = parseInt(req.query.offset as string, 10);
    const all = req.query.all === "true";

    const clients = await clientService.list({
      limit: isNaN(limit) ? 10 : limit,
      offset: isNaN(offset) ? 0 : offset,
      all,
    });

    res.status(HTTP_STATUS.OK).json(clients);
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;
    const { scope } = req.query;

    const client = await clientService.get({ id, scope: scope as any });

    if (!client) {
      throw new HttpError(HTTP_STATUS.NOT_FOUND, MESSAGES.CLIENT.NOT_FOUND);
    }

    res.status(HTTP_STATUS.OK).json(client);
  }

  async create(req: Request, res: Response) {
    const payload = req.body;

    const client = await clientService.create(payload);

    res.status(HTTP_STATUS.CREATED).json(client);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const updates = req.body;

    const updated = await clientService.patch(id, updates);

    if (!updated) {
      throw new HttpError(HTTP_STATUS.NOT_FOUND, MESSAGES.CLIENT.NOT_FOUND);
    }

    res.status(HTTP_STATUS.OK).json(updated);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const deleted = await clientService.delete(id);

    if (!deleted) {
      throw new HttpError(HTTP_STATUS.NOT_FOUND, MESSAGES.CLIENT.NOT_FOUND);
    }

    res.status(HTTP_STATUS.NO_CONTENT).send();
  }
}
