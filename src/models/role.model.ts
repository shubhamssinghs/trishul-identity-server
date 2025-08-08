import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string | null;
  declare client_id: ForeignKey<string> | null;
  declare is_default: boolean;
  declare is_active: boolean;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static associate(models: any) {
    this.hasMany(models.UserRole, {
      foreignKey: "role_id",
      as: "user_roles",
      onDelete: "CASCADE",
    });

    this.hasMany(models.GroupRole, {
      foreignKey: "role_id",
      as: "group_roles",
      onDelete: "CASCADE",
    });
  }

  static scopes() {
    return {
      withUserRoles: {
        include: [{ association: "user_roles" }],
      },
      withGroupRoles: {
        include: [{ association: "group_roles" }],
      },
      fullRole: {
        include: [
          { association: "user_roles" },
          { association: "group_roles" },
        ],
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof Role {
    Role.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING(50),
        description: DataTypes.STRING(255),
        client_id: DataTypes.UUID,
        is_default: DataTypes.BOOLEAN,
        is_active: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Role",
        tableName: "roles",
        timestamps: false,
        underscored: true,
      }
    );

    return Role;
  }
}
