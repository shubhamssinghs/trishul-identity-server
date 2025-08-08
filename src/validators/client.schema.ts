import { z } from "zod";
import { MESSAGES } from "../constants";
import { Client } from "../models";

export const clientQuerySchema = z.object({
  limit: z
    .string()
    .regex(/^\d+$/, MESSAGES.CLIENT.VALIDATION.INVALID_LIMIT)
    .transform(Number)
    .optional(),
  offset: z
    .string()
    .regex(/^\d+$/, MESSAGES.CLIENT.VALIDATION.INVALID_OFFSET)
    .transform(Number)
    .optional(),
  all: z
    .string()
    .optional()
    .transform((val) => val === "true"),
});

export const clientIdParamSchema = z.object({
  id: z.uuid(MESSAGES.CLIENT.VALIDATION.INVALID_ID),
});

export const clientScopeQuerySchema = z.object({
  scope: z
    .union([
      z.enum(Client.availableScopes as [string, ...string[]]),
      z
        .string()
        .transform((val) => val.split(","))
        .refine(
          (arr) => arr.every((scope) => Client.availableScopes.includes(scope)),
          { message: "One or more scopes are invalid." }
        ),
    ])
    .optional(),
});
export const createClientSchema = z.object({
  name: z
    .string({
      error: MESSAGES.CLIENT.VALIDATION.INVALID_NAME_TYPE,
    })
    .min(1, MESSAGES.CLIENT.VALIDATION.INVALID_NAME),
  support_email: z.email(MESSAGES.CLIENT.VALIDATION.INVALID_EMAIL),
  theme_color: z
    .string({ error: MESSAGES.CLIENT.VALIDATION.INVALID_THEME_COLOR_TYPE })
    .regex(
      /^#(?:[0-9a-fA-F]{3}){1,2}$/,
      MESSAGES.CLIENT.VALIDATION.INVALID_THEME_COLOR
    )
    .optional(),
  logo_url: z.url(MESSAGES.CLIENT.VALIDATION.INVALID_LOGO_URL).optional(),
  description: z.string().optional(),
  created_by: z
    .string({ error: MESSAGES.CLIENT.VALIDATION.INVALID_CREATED_BY })
    .uuid(MESSAGES.CLIENT.VALIDATION.INVALID_CREATED_BY)
    .optional(),
});

export const updateClientSchema = createClientSchema.partial();
