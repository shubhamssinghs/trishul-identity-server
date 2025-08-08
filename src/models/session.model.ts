import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export class Session extends Model<
  InferAttributes<Session>,
  InferCreationAttributes<Session>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<string>;
  declare application_id: ForeignKey<string> | null;
  declare refresh_token_id: ForeignKey<string> | null;
  declare ip_address: string | null;
  declare user_agent: string | null;
  declare location: string | null;
  declare device: string | null;
  declare is_active: boolean;
  declare revoked_at: Date | null;
  declare expires_at: Date | null;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Application, {
      foreignKey: "application_id",
      as: "application",
      onDelete: "SET NULL",
    });

    this.belongsTo(models.RefreshToken, {
      foreignKey: "refresh_token_id",
      as: "refreshToken",
      onDelete: "SET NULL",
    });
  }

  static scopes() {
    return {
      active: {
        where: { is_active: true },
      },
      revoked: {
        where: { is_active: false },
      },
      withUser: {
        include: [{ association: "user" }],
      },
      withApplication: {
        include: [{ association: "application" }],
      },
      withRefreshToken: {
        include: [{ association: "refreshToken" }],
      },
      full: {
        include: [
          { association: "user" },
          { association: "application" },
          { association: "refreshToken" },
        ],
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof Session {
    Session.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        user_id: DataTypes.UUID,
        application_id: DataTypes.UUID,
        refresh_token_id: DataTypes.UUID,
        ip_address: DataTypes.STRING,
        user_agent: DataTypes.STRING,
        location: DataTypes.STRING,
        device: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
        revoked_at: DataTypes.DATE,
        expires_at: DataTypes.DATE,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Session",
        tableName: "sessions",
        timestamps: false,
        underscored: true,
      }
    );

    return Session;
  }
}
