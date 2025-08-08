"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("applications", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      client_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "clients",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      client_id_value: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      client_secret: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      redirect_uris: {
        type: Sequelize.TEXT,
      },
      post_logout_redirect_uris: {
        type: Sequelize.TEXT,
      },
      grant_types: {
        type: Sequelize.TEXT,
      },
      scopes: {
        type: Sequelize.TEXT,
      },
      is_confidential: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      require_pkce: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      access_token_lifetime: {
        type: Sequelize.INTEGER,
        defaultValue: 900,
      },
      refresh_token_lifetime: {
        type: Sequelize.INTEGER,
        defaultValue: 604800,
      },
      allowed_identity_providers: {
        type: Sequelize.TEXT,
      },
      allowed_cors_origins: {
        type: Sequelize.TEXT,
      },
      terms_url: {
        type: Sequelize.STRING,
      },
      privacy_url: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      auth_method: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      logo_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      login_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      logout_url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable("applications");
  },
};
