"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const [users] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE email = 'superadmin@trishul.dev' LIMIT 1`
    );
    const [roles] = await queryInterface.sequelize.query(
      `SELECT id FROM roles WHERE name = 'superadmin' LIMIT 1`
    );

    const superAdminId = users[0]?.id;
    const superAdminRoleId = roles[0]?.id;

    if (!superAdminId || !superAdminRoleId) {
      console.warn("❌ Cannot assign superadmin role: user or role not found");
      return;
    }

    await queryInterface.bulkInsert("user_roles", [
      {
        id: uuidv4(),
        user_id: superAdminId,
        role_id: superAdminRoleId,
        client_id: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete("user_roles", null, {
      where: {
        user_id: {
          [queryInterface.Sequelize.Op.in]: queryInterface.sequelize.literal(
            `(SELECT id FROM users WHERE email = 'superadmin@trishul.dev')`
          ),
        },
      },
    });
  },
};
