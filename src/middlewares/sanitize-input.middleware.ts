import { Request, Response, NextFunction } from "express";
import xss from "xss";

export function sanitizeInput(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const sanitize = (input: any): any => {
    if (typeof input === "string") return xss(input);
    if (typeof input === "object" && input !== null) {
      const sanitized: Record<string, any> = {};
      for (const key in input) {
        if (Object.prototype.hasOwnProperty.call(input, key)) {
          sanitized[key] = sanitize(input[key]);
        }
      }
      return sanitized;
    }
    return input;
  };

  req.body = sanitize(req.body);
  req.params = sanitize(req.params);

  const sanitizedQuery = sanitize(req.query);
  Object.keys(req.query).forEach((key) => {
    delete (req.query as any)[key];
  });
  Object.assign(req.query, sanitizedQuery);

  next();
}
