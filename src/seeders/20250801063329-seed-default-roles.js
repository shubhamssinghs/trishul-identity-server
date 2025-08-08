"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    await queryInterface.bulkInsert("roles", [
      {
        id: uuidv4(),
        name: "superadmin",
        description: "Platform-wide administrator",
        client_id: null,
        is_default: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "admin",
        description: "Client admin role",
        client_id: null,
        is_default: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: uuidv4(),
        name: "user",
        description: "Standard user role",
        client_id: null,
        is_default: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
