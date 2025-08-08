import { Router } from "express";
import { ClientController } from "../../controllers";
import { validateRequest } from "../../middlewares";
import {
  clientIdParamSchema,
  clientQuerySchema,
  clientScopeQuerySchema,
  createClientSchema,
  updateClientSchema,
} from "../../validators";

class ClientRoutes {
  private readonly _router: Router = Router();
  private readonly clientController = new ClientController();

  constructor() {
    this._configureRoutes();
  }

  private _configureRoutes() {
    const router = Router();
    router.get(
      "/",
      validateRequest({ query: clientQuerySchema }),
      this.clientController.list
    );
    router.get(
      "/:id",
      validateRequest({
        params: clientIdParamSchema,
        query: clientScopeQuerySchema,
      }),
      this.clientController.get
    );
    router.post(
      "/",
      validateRequest({ body: createClientSchema }),
      this.clientController.create
    );
    router.patch(
      "/:id",
      validateRequest({
        params: clientIdParamSchema,
        body: updateClientSchema,
      }),
      this.clientController.update
    );
    router.delete(
      "/:id",
      validateRequest({ params: clientIdParamSchema }),
      this.clientController.delete
    );

    this._router.use("/clients", router);
  }

  get router() {
    return this._router;
  }
}

export default new ClientRoutes().router;
