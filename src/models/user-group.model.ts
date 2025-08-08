import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export class UserGroup extends Model<
  InferAttributes<UserGroup>,
  InferCreationAttributes<UserGroup>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<string>;
  declare group_id: ForeignKey<string>;
  declare client_id: ForeignKey<string>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.Group, {
      foreignKey: "group_id",
      as: "group",
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
      withUser: {
        include: [{ association: "user" }],
      },
      withGroup: {
        include: [{ association: "group" }],
      },
      withClient: {
        include: [{ association: "client" }],
      },
      full: {
        include: [
          { association: "user" },
          { association: "group" },
          { association: "client" },
        ],
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof UserGroup {
    UserGroup.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        user_id: DataTypes.UUID,
        group_id: DataTypes.UUID,
        client_id: DataTypes.UUID,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "UserGroup",
        tableName: "user_groups",
        timestamps: false,
        underscored: true,
      }
    );

    return UserGroup;
  }
}
