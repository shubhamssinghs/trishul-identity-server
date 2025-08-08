import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import bunyan from "bunyan";

dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const logDirectory = path.resolve(__dirname, "../../logs");
if (isProd && !fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

export const logger = bunyan.createLogger({
  name: "auth-microservice",
  level: isProd ? "info" : "debug",
  serializers: {
    req: (req) => {
      const socket = req?.socket || req?.connection;

      return {
        method: req?.method,
        url: req?.url,
        headers: req?.headers,
        remoteAddress: socket?.remoteAddress || req?.ip || "unknown",
        remotePort: socket?.remotePort || "unknown",
        ...bunyan.stdSerializers.req(req),
      };
    },
    res: (res) => {
      return {
        statusMessage: res.statusMessage,
        statusCode: res.statusCode,
        body: res.body,
        ...bunyan.stdSerializers.res(res),
      };
    },
    err: bunyan.stdSerializers.err,
  },
  streams: isProd
    ? [
        {
          type: "rotating-file",
          path: path.join(logDirectory, "app.log"),
          period: "1d",
          count: 7,
        },
      ]
    : [
        {
          stream: process.stdout,
          level: "debug",
        },
      ],
});
