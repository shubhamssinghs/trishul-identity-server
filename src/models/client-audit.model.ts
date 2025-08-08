import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export class ClientAudit extends Model<
  InferAttributes<ClientAudit>,
  InferCreationAttributes<ClientAudit>
> {
  declare id: CreationOptional<string>;
  declare client_id: ForeignKey<string>;
  declare user_id: ForeignKey<string> | null;
  declare action: string;
  declare target_type: string | null;
  declare target_id: string | null;
  declare ip_address: string | null;
  declare user_agent: string | null;
  declare metadata: object | null;
  declare created_at: CreationOptional<Date>;

  static associate(models: any) {
    this.belongsTo(models.Client, {
      foreignKey: "client_id",
      as: "client",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "SET NULL",
    });
  }

  static scopes() {
    return {
      forClient(clientId: string) {
        return { where: { client_id: clientId } };
      },
      forUser(userId: string) {
        return { where: { user_id: userId } };
      },
      recent: {
        order: [["created_at", "DESC"]],
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof ClientAudit {
    ClientAudit.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        client_id: DataTypes.UUID,
        user_id: DataTypes.UUID,
        action: DataTypes.STRING(100),
        target_type: DataTypes.STRING(100),
        target_id: DataTypes.UUID,
        ip_address: DataTypes.STRING,
        user_agent: DataTypes.TEXT,
        metadata: DataTypes.JSON,
        created_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "ClientAudit",
        tableName: "client_audits",
        timestamps: false,
        underscored: true,
      }
    );

    return ClientAudit;
  }
}
