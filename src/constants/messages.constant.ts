export const MESSAGES = {
  GENERAL: {
    OK: "Operation completed successfully.",
    NOT_FOUND: "Resource not found.",
    INTERNAL_SERVER_ERROR: "Internal Server Error",
    SERVER_ERROR: "Something went wrong. Please try again later.",
    VALIDATION_FAILED: "Validation failed",
    INVALID_JSON_BODY_SYNTAX: "Invalid JSON syntax in request body.",
  },

  SYSTEM: {
    OK: "System is healthy.",
    FAILED: "System has one or more issues.",
    UPTIME_LOW: "Node uptime is too low. System may have restarted recently.",
    MEMORY_HIGH: "Memory usage is too high.",
    CPU_HIGH: "CPU load is too high.",
    DATABASE_UNREACHABLE: "Database is not reachable.",

    SUGGESTIONS: {
      UPTIME_LOW: "Ensure node has been running for a sufficient duration.",
      MEMORY_HIGH: "Consider scaling up memory or optimizing memory usage.",
      CPU_HIGH: "Check for processes consuming high CPU or scale horizontally.",
      DATABASE_UNREACHABLE:
        "Ensure database is running and reachable from this service.",
    },
  },

  CLIENT: {
    NOT_FOUND: "Client not found.",
    DATA_NOT_CHANGED: "Data not changed, skipping update.",
    VALIDATION: {
      INVALID_ID: "Client ID must be a valid UUID",
      INVALID_NAME: "Name is required",
      INVALID_NAME_TYPE: "Name must be a valid string",
      INVALID_EMAIL: "Support email must be a valid email",
      INVALID_THEME_COLOR: "Theme color must be a valid hex code",
      INVALID_THEME_COLOR_TYPE: "Theme color must be a valid hex string",
      INVALID_LOGO_URL: "Logo URL must be a valid URL",
      INVALID_CREATED_BY: "Creator ID must be a valid UUID",
      INVALID_LIMIT: "Limit must be a number",
      INVALID_OFFSET: "Offset must be a number",
      INVALID_QUERY_BOOLEAN: "Query must be a boolean string (true/false)",
    },
  },

  DIRECTORY: {
    NOT_FOUND: "Directory not found.",
    DATA_NOT_CHANGED: "Data not changed, skipping update.",
    DEFAULT: {
      NAME: "Primary Directory",
      DESCRIPTION:
        "This is your primary directory, created by default for organizing your resources.",
    },
  },
};
