import { Router } from "express";
import clientRoute from "./client.route";

class V1Routes {
  private readonly _router: Router = Router();

  constructor() {
    this._configureRoutes();
  }

  private _configureRoutes() {
    const v1 = Router();
    v1.use(clientRoute);
    this._router.use("/v1", v1);
  }

  get router() {
    return this._router;
  }
}

export default new V1Routes().router;
