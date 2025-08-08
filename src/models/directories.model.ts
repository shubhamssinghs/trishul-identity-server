import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";
import { mergeDefaultExcludesIntoScopes } from "../utils";

export class Directory extends Model<
  InferAttributes<Directory>,
  InferCreationAttributes<Directory>
> {
  declare id: CreationOptional<string>;
  declare client_id?: ForeignKey<string>;
  declare name: string;
  declare description: string | null;
  declare is_default?: boolean;
  declare is_active?: boolean;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static associate(models: any) {
    this.belongsTo(models.Client, {
      foreignKey: "client_id",
      as: "owner",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Group, {
      foreignKey: "directory_id",
      as: "groups",
      onDelete: "CASCADE",
    });
  }

  static scopes() {
    return {
      ownedBy: {
        include: [{ association: "owner" }],
      },
      withGroups: {
        include: [{ association: "groups" }],
      },
      defaultOnly: {
        where: { is_default: true },
      },
      defaultScope: {
        attributes: {
          exclude: ["updated_at"],
        },
      },
    };
  }

  static get availableScopes(): string[] {
    return Object.keys(this.scopes());
  }

  static get mergedScopes(): Record<string, any> {
    const baseScopes = this.scopes();
    const defaultExcludes = baseScopes.defaultScope?.attributes?.exclude ?? [];

    return mergeDefaultExcludesIntoScopes(baseScopes, defaultExcludes);
  }

  static initModel(sequelize: Sequelize): typeof Directory {
    Directory.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        client_id: DataTypes.UUID,
        name: DataTypes.STRING(100),
        description: DataTypes.STRING(255),
        is_default: DataTypes.BOOLEAN,
        is_active: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Directory",
        tableName: "directories",
        timestamps: false,
        underscored: true,
      }
    );

    Object.entries(this.scopes()).forEach(([name, scope]) => {
      if (name !== "defaultScope") {
        Directory.addScope(name, scope);
      }
    });

    return Directory;
  }
}
