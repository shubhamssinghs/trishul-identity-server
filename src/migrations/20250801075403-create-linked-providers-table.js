"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("linked_providers", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      provider: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      provider_user_id: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      access_token: {
        type: Sequelize.TEXT,
      },
      refresh_token: {
        type: Sequelize.TEXT,
      },
      expires_at: {
        type: Sequelize.DATE,
      },
      metadata: {
        type: Sequelize.JSON,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });

    await queryInterface.addConstraint("linked_providers", {
      fields: ["user_id", "provider"],
      type: "unique",
      name: "unique_provider_per_user",
    });
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("linked_providers");
  },
};
