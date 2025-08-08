import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export class EmailVerification extends Model<
  InferAttributes<EmailVerification>,
  InferCreationAttributes<EmailVerification>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<string>;
  declare email: string;
  declare code: string;
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
      active: {
        where: {
          is_used: false,
        },
      },
      forUser(userId: string) {
        return { where: { user_id: userId } };
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof EmailVerification {
    EmailVerification.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        user_id: DataTypes.UUID,
        email: DataTypes.STRING,
        code: DataTypes.STRING(100),
        expires_at: DataTypes.DATE,
        is_used: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "EmailVerification",
        tableName: "email_verifications",
        timestamps: false,
        underscored: true,
      }
    );

    return EmailVerification;
  }
}
