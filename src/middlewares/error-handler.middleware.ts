import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS, MESSAGES } from "../constants";
import { HttpError } from "../utils";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
    return;
  }

  console.error("Unhandled Error:", err);

  if (err.type === "entity.parse.failed") {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: MESSAGES.GENERAL.INVALID_JSON_BODY_SYNTAX,
    });
    return;
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: MESSAGES.GENERAL.INTERNAL_SERVER_ERROR,
  });
};
