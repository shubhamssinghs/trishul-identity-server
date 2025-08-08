import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export class Consent extends Model<
  InferAttributes<Consent>,
  InferCreationAttributes<Consent>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<string>;
  declare application_id: ForeignKey<string>;
  declare scope: string;
  declare granted_at: Date;
  declare expires_at: Date | null;
  declare is_revoked: boolean;
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
      byUser(userId: string) {
        return { where: { user_id: userId } };
      },
      byApplication(appId: string) {
        return { where: { application_id: appId } };
      },
      active: {
        where: { is_revoked: false },
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof Consent {
    Consent.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        user_id: DataTypes.UUID,
        application_id: DataTypes.UUID,
        scope: DataTypes.TEXT,
        granted_at: DataTypes.DATE,
        expires_at: DataTypes.DATE,
        is_revoked: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Consent",
        tableName: "consents",
        timestamps: false,
        underscored: true,
      }
    );

    return Consent;
  }
}
