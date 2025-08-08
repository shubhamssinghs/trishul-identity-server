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

export class AccessToken extends Model<
  InferAttributes<AccessToken>,
  InferCreationAttributes<AccessToken>
> {
  declare id: CreationOptional<string>;
  declare token: string;
  declare user_id: ForeignKey<string>;
  declare application_id: ForeignKey<string>;
  declare client_id: ForeignKey<string> | null;
  declare scope: string | null;
  declare expires_at: Date;
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
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Client, {
      foreignKey: "client_id",
      as: "client",
      onDelete: "CASCADE",
    });
  }

  static scopes() {
    return {
      valid: {
        where: {
          expires_at: {
            [Op.gt]: new Date(),
          },
        },
      },
      forUser(userId: string) {
        return {
          where: {
            user_id: userId,
          },
        };
      },
      forApplication(applicationId: string) {
        return {
          where: {
            application_id: applicationId,
          },
        };
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof AccessToken {
    AccessToken.init(
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
        expires_at: DataTypes.DATE,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "AccessToken",
        tableName: "access_tokens",
        timestamps: false,
        underscored: true,
      }
    );

    return AccessToken;
  }
}
