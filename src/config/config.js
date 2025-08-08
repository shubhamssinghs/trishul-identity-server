require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: "mysql",
    migrationStorage: "sequelize",
    migrationStorageTableName: "migrations",
    seederStorage: "sequelize",
    seederStorageTableName: "seeders",
  },
};
