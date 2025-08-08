import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

import { version } from "../../package.json";

const options: swaggerJSDoc.OAS3Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Trishul Identity Server API",
      version,
      description: `API documentation for Trishul Identity Server. </br> Click the link to download the JSON file: <a href="/swagger/trishul-api-swagger-docs.json">Download Trishul-api-swagger-docs JSON</a>`,
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development Server",
      },
    ],
  },
  apis: ["./src/docs/*.yaml"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/swagger/trishul-api-swagger-docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="trishul-api-swagger-docs.json"'
    );
    res.send(swaggerSpec);
  });
};
