import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export class LinkedProvider extends Model<
  InferAttributes<LinkedProvider>,
  InferCreationAttributes<LinkedProvider>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<string>;
  declare provider: string;
  declare provider_user_id: string;
  declare access_token: string | null;
  declare refresh_token: string | null;
  declare expires_at: Date | null;
  declare metadata: object | null;
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
  }

  static scopes() {
    return {
      byUser(userId: string) {
        return {
          where: { user_id: userId },
        };
      },
      byProvider(provider: string) {
        return {
          where: { provider },
        };
      },
      byProviderAndSubject(provider: string, subject: string) {
        return {
          where: {
            provider,
            provider_subject: subject,
          },
        };
      },
      withUserAndApp: {
        include: [{ association: "user" }, { association: "application" }],
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof LinkedProvider {
    LinkedProvider.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        user_id: DataTypes.UUID,
        provider: DataTypes.STRING(100),
        provider_user_id: DataTypes.STRING(255),
        access_token: DataTypes.TEXT,
        refresh_token: DataTypes.TEXT,
        expires_at: DataTypes.DATE,
        metadata: DataTypes.JSON,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "LinkedProvider",
        tableName: "linked_providers",
        timestamps: false,
        underscored: true,
      }
    );

    return LinkedProvider;
  }
}
