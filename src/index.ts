import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { v1 } from "./routes";
import { Application } from "./services";
import { registerAssociations } from "./models";
import { sequelize } from "./config";
import {
  authRateLimiter,
  requestLogger,
  sanitizeInput,
  secureHeaders,
  errorHandler,
  notFoundHandler,
} from "./middlewares";

import { setupSwagger } from "./utils";

dotenv.config();

const port = process.env.APP_PORT;

const app = new Application(port);

app.configureMiddleware([
  secureHeaders,
  sanitizeInput,
  requestLogger,
  express.json(),
  express.urlencoded({ extended: true }),
  authRateLimiter,
  cors(),
]);

if (process.env.NODE_ENV === "development") {
  setupSwagger(app.server);
  console.log(
    `📘 Swagger docs available at http://localhost:${process.env.APP_PORT}/api-docs`
  );
}

app.configureRoutes([v1]);

app.serveClient();

app.server.use(notFoundHandler);

app.configureErrorHandlers([errorHandler]);

app.configureStartupTasks([
  async () => registerAssociations(),
  async () => {
    await sequelize.sync();
    return;
  },
]);

app.listen();
app.startWebSocketServer();
