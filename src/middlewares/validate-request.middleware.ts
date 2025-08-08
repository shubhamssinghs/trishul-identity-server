import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";
import { HttpError } from "../utils";
import { HTTP_STATUS, MESSAGES } from "../constants";

type ValidationSchemas = {
  body?: ZodType<any, any>;
  query?: ZodType<any, any>;
  params?: ZodType<any, any>;
};

export const validateRequest =
  (schemas: ValidationSchemas) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        const parsedBody = schemas.body.parse(req.body);
        Object.assign(req.body, parsedBody);
      }

      if (schemas.query) {
        const parsedQuery = schemas.query.parse(req.query);
        Object.assign(req.query, parsedQuery);
      }

      if (schemas.params) {
        const parsedParams = schemas.params.parse(req.params);
        Object.assign(req.params, parsedParams);
      }

      next();
    } catch (err: any) {
      if (err instanceof ZodError) {
        const formattedErrors: Record<string, string> = {};

        for (const issue of err.issues) {
          const path = issue.path.join(".");
          formattedErrors[path] = issue.message;
        }

        next(
          new HttpError(
            HTTP_STATUS.BAD_REQUEST,
            MESSAGES.GENERAL.VALIDATION_FAILED,
            formattedErrors
          )
        );
        return;
      }

      throw err;
    }
  };
