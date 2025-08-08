import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 50,
  message: "Too many requests. Please try again later.",
  skip: (req) =>
    req.originalUrl.startsWith("/api-docs") ||
    req.originalUrl.startsWith("/swagger"),
});
