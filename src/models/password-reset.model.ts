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

export class PasswordReset extends Model<
  InferAttributes<PasswordReset>,
  InferCreationAttributes<PasswordReset>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<string>;
  declare token: string;
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
  }

  static scopes() {
    return {
      valid: {
        where: {
          is_used: false,
          expires_at: {
            [Op.gt]: new Date(),
          },
        },
      },
      byToken(token: string) {
        return {
          where: { token },
        };
      },
      withUser: {
        include: [{ association: "user" }],
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof PasswordReset {
    PasswordReset.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        user_id: DataTypes.UUID,
        token: DataTypes.STRING(255),
        expires_at: DataTypes.DATE,
        is_used: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "PasswordReset",
        tableName: "password_resets",
        timestamps: false,
        underscored: true,
      }
    );

    return PasswordReset;
  }
}
