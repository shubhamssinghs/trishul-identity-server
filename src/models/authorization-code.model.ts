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

export class AuthorizationCode extends Model<
  InferAttributes<AuthorizationCode>,
  InferCreationAttributes<AuthorizationCode>
> {
  declare id: CreationOptional<string>;
  declare code: string;
  declare user_id: ForeignKey<string>;
  declare application_id: ForeignKey<string>;
  declare redirect_uri: string | null;
  declare scope: string | null;
  declare code_challenge: string | null;
  declare code_challenge_method: string | null;
  declare expires_at: Date;
  declare is_used: boolean;
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
  }

  static scopes() {
    return {
      active: {
        where: {
          is_used: false,
          expires_at: {
            [Op.gt]: new Date(),
          },
        },
      },
      forUser(userId: string) {
        return { where: { user_id: userId } };
      },
      forApplication(appId: string) {
        return { where: { application_id: appId } };
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof AuthorizationCode {
    AuthorizationCode.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        code: DataTypes.STRING(255),
        user_id: DataTypes.UUID,
        application_id: DataTypes.UUID,
        redirect_uri: DataTypes.STRING(2048),
        scope: DataTypes.TEXT,
        code_challenge: DataTypes.STRING,
        code_challenge_method: DataTypes.STRING,
        expires_at: DataTypes.DATE,
        is_used: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "AuthorizationCode",
        tableName: "authorization_codes",
        timestamps: false,
        underscored: true,
      }
    );

    return AuthorizationCode;
  }
}
