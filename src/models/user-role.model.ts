import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export class UserRole extends Model<
  InferAttributes<UserRole>,
  InferCreationAttributes<UserRole>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<string>;
  declare role_id: ForeignKey<string>;
  declare client_id: ForeignKey<string> | null;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static associate(models: any) {
    this.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
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
      withUser: {
        include: [{ association: "user" }],
      },
      withRole: {
        include: [{ association: "role" }],
      },
      withClient: {
        include: [{ association: "client" }],
      },
      full: {
        include: [
          { association: "user" },
          { association: "role" },
          { association: "client" },
        ],
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof UserRole {
    UserRole.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        user_id: DataTypes.UUID,
        role_id: DataTypes.UUID,
        client_id: DataTypes.UUID,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "UserRole",
        tableName: "user_roles",
        timestamps: false,
        underscored: true,
      }
    );

    return UserRole;
  }
}
