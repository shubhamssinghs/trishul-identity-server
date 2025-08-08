import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export class GroupRole extends Model<
  InferAttributes<GroupRole>,
  InferCreationAttributes<GroupRole>
> {
  declare id: CreationOptional<string>;
  declare group_id: ForeignKey<string>;
  declare role_id: ForeignKey<string>;
  declare client_id: ForeignKey<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static associate(models: any) {
    this.belongsTo(models.Group, {
      foreignKey: "group_id",
      as: "group",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Role, {
      foreignKey: "role_id",
      as: "role",
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
      byClient(clientId: string) {
        return { where: { client_id: clientId } };
      },
      forGroup(groupId: string) {
        return { where: { group_id: groupId } };
      },
      withRelations: {
        include: [
          { association: "group" },
          { association: "role" },
          { association: "client" },
        ],
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof GroupRole {
    GroupRole.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        group_id: DataTypes.UUID,
        role_id: DataTypes.UUID,
        client_id: DataTypes.UUID,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "GroupRole",
        tableName: "group_roles",
        timestamps: false,
        underscored: true,
      }
    );

    return GroupRole;
  }
}
