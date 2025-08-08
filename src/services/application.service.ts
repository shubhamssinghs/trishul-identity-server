import express, { Express, Router } from "express";
import http, { Server as HttpServer } from "http";
import path from "path";
import dotenv from "dotenv";

import { wsService } from "../ws";

dotenv.config();

export class Application {
  private readonly _server: Express;
  private readonly _port: string;
  private readonly _httpServer: HttpServer;
  private _startupTasks: (() => Promise<void>)[] = [];

  constructor(port?: string) {
    this._server = express();
    this._port = port || "2128";
    this._httpServer = http.createServer(this._server);
  }

  configureMiddleware(
    middlewares: (express.RequestHandler | false | undefined)[]
  ) {
    const validMiddlewares = middlewares.filter(
      Boolean
    ) as express.RequestHandler[];
    if (validMiddlewares.length) this._server.use(...validMiddlewares);
  }

  configureRoutes(
    routes: (Router | [string, Router] | false | undefined)[],
    defaultBasePath = "/api"
  ) {
    const validRoutes = routes.filter(Boolean) as (Router | [string, Router])[];
    for (const route of validRoutes) {
      if (Array.isArray(route)) {
        const [path, router] = route;
        this._server.use(path, router);
      } else {
        this._server.use(defaultBasePath, route);
      }
    }
  }

  configureErrorHandlers(
    handlers: (express.ErrorRequestHandler | false | undefined)[]
  ) {
    const validHandlers = handlers.filter(
      Boolean
    ) as express.ErrorRequestHandler[];
    for (const handler of validHandlers) this._server.use(handler);
  }

  configureStartupTasks(tasks: (() => Promise<void>)[]) {
    this._startupTasks.push(...tasks);
  }

  serveClient(staticDir = path.join(__dirname, "../../public")) {
    const isDev = process.env.NODE_ENV === "production";
    if (isDev) {
      console.log(
        `\n⚠️ Skipped serving static files in development mode.\n\nTo see your changes, run: \n   👉 cd client && npm run dev \n`
      );
      return;
    }
    this._server.use(express.static(staticDir));
    console.log(`📂 Serving static files from ${staticDir}`);

    this._server.get(/^\/(?!api).*/, (_req, res) => {
      res.sendFile(path.join(staticDir, "index.html"));
    });
  }

  async startWebSocketServer() {
    const { ENABLE_WS } = process.env;
    if (!ENABLE_WS || ENABLE_WS.toLowerCase() !== "true") {
      console.log("⚠️ WebSocket server is disabled.\n");
      return;
    }

    await wsService.initialize(this._httpServer, "/ws");
    this.server;
    console.log(
      `📡 WebSocket server available at ws://localhost:${this._port}/ws`
    );
  }

  async listen() {
    try {
      for (const task of this._startupTasks) {
        await task();
      }

      this._httpServer.listen(this._port, () => {
        console.log(`🚀 Server running at http://localhost:${this._port}`);
      });
    } catch (error) {
      console.error("❌ Failed to start server:", error);
      process.exit(1);
    }
  }

  get server(): Express {
    return this._server;
  }

  get httpServer(): HttpServer {
    return this._httpServer;
  }
}

export default Application;
