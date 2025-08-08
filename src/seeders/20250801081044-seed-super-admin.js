"use strict";

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash("Trishul@123", 10);

    await queryInterface.bulkInsert("users", [
      {
        id: userId,
        name: "Super Admin",
        email: "superadmin@trishul.dev",
        password_hash: hashedPassword,
        avatar_url: "https://avatar.iran.liara.run/public/48",
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("users", {
      email: "superadmin@trishul.dev",
    });
  },
};
