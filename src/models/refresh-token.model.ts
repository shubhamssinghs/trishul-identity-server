import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  Op,
} from "sequelize";

export class RefreshToken extends Model<
  InferAttributes<RefreshToken>,
  InferCreationAttributes<RefreshToken>
> {
  declare id: CreationOptional<string>;
  declare token: string;
  declare user_id: ForeignKey<string>;
  declare application_id: ForeignKey<string>;
  declare client_id: ForeignKey<string> | null;
  declare scope: string | null;
  declare is_used: boolean;
  declare is_revoked: boolean;
  declare expires_at: Date;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Client, {
      foreignKey: "client_id",
      as: "client",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Application, {
      foreignKey: "application_id",
      as: "application",
      onDelete: "SET NULL",
    });

    this.hasOne(models.Session, {
      foreignKey: "refresh_token_id",
      as: "session",
      onDelete: "SET NULL",
    });
  }

  static scopes() {
    return {
      valid: {
        where: {
          is_revoked: false,
          expires_at: {
            [Op.gt]: new Date(),
          },
        },
      },
      withUser: {
        include: [{ association: "user" }],
      },
      withClient: {
        include: [{ association: "client" }],
      },
      withApplication: {
        include: [{ association: "application" }],
      },
      full: {
        include: [
          { association: "user" },
          { association: "client" },
          { association: "application" },
          { association: "session" },
        ],
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof RefreshToken {
    RefreshToken.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        token: DataTypes.STRING(512),
        user_id: DataTypes.UUID,
        application_id: DataTypes.UUID,
        client_id: DataTypes.UUID,
        scope: DataTypes.TEXT,
        is_used: DataTypes.BOOLEAN,
        is_revoked: DataTypes.BOOLEAN,
        expires_at: DataTypes.DATE,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "RefreshToken",
        tableName: "refresh_tokens",
        timestamps: false,
        underscored: true,
      }
    );

    return RefreshToken;
  }
}
