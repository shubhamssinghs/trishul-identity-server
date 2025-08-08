/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ValidationSchema } from "@types";

export class ValidationService {
  static capitalize(key: string): string {
    return key.charAt(0).toUpperCase() + key.slice(1);
  }

  static validate(
    values: Record<string, any>,
    schema: ValidationSchema
  ): Record<string, string> {
    const errors: Record<string, string> = {};

    for (const key in schema) {
      const rules = schema[key];
      const value = values[key];
      const label = schema[key].name || this.capitalize(key);

      if (rules.required) {
        const message =
          typeof rules.required === "string"
            ? rules.required
            : `${label} is required`;
        if (
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0)
        ) {
          errors[key] = message;
          continue;
        }
      }

      if (
        rules.minLength &&
        typeof value === "string" &&
        value.length < rules.minLength
      ) {
        errors[key] = `${label} must be at least ${rules.minLength} characters`;
      }

      if (
        rules.maxLength &&
        typeof value === "string" &&
        value.length > rules.maxLength
      ) {
        errors[key] = `${label} must be at most ${rules.maxLength} characters`;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        errors[key] = `${label} format is invalid`;
      }

      if (rules.match && value !== values[rules.match]) {
        errors[key] = `${label} must match ${this.capitalize(rules.match)}`;
      }

      if (rules.email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errors[key] = `${label} must be a valid email`;
        }
      }

      if (rules.number && isNaN(Number(value))) {
        errors[key] = `${label} must be a number`;
      }

      if (rules.validate) {
        const customError = rules.validate(value, values);
        if (customError) {
          errors[key] = customError;
        }
      }
    }

    return errors;
  }
}
