import { Dialect, Sequelize } from "sequelize";
const dbConfig = require("./config").development;

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect as Dialect,
    logging: false,
  }
);
