import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export class Group extends Model<
  InferAttributes<Group>,
  InferCreationAttributes<Group>
> {
  declare id: CreationOptional<string>;
  declare directory_id: ForeignKey<string>;
  declare name: string;
  declare description: string | null;
  declare is_active: boolean;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static associate(models: any) {
    this.belongsTo(models.Directory, {
      foreignKey: "directory_id",
      as: "directory",
      onDelete: "CASCADE",
    });

    this.hasMany(models.UserGroup, {
      foreignKey: "group_id",
      as: "user_groups",
      onDelete: "CASCADE",
    });

    this.hasMany(models.GroupRole, {
      foreignKey: "group_id",
      as: "group_roles",
      onDelete: "CASCADE",
    });
  }

  static scopes() {
    return {
      byDirectory(directoryId: string) {
        return {
          where: { directory_id: directoryId },
        };
      },
      withRelations: {
        include: [
          { association: "user_groups" },
          { association: "group_roles" },
          { association: "directory" },
        ],
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof Group {
    Group.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        directory_id: DataTypes.UUID,
        name: DataTypes.STRING(100),
        description: DataTypes.STRING(255),
        is_active: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Group",
        tableName: "groups",
        timestamps: false,
        underscored: true,
      }
    );

    return Group;
  }
}
