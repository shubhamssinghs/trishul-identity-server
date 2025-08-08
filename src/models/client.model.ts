import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  HasManyCreateAssociationMixin,
} from "sequelize";
import { mergeDefaultExcludesIntoScopes } from "../utils";
import { Directory } from "./directories.model";
import { MESSAGES } from "../constants";

export class Client extends Model<
  InferAttributes<Client>,
  InferCreationAttributes<Client>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string | null;
  declare logo_url: string | null;
  declare theme_color: string | null;
  declare support_email: string | null;
  declare created_by: ForeignKey<string> | null;
  declare is_active: boolean;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  declare createDirectory: HasManyCreateAssociationMixin<Directory>;

  static associate(models: any) {
    this.hasMany(models.UserRole, {
      foreignKey: "client_id",
      as: "user_roles",
      onDelete: "CASCADE",
    });

    this.hasMany(models.UserGroup, {
      foreignKey: "client_id",
      as: "user_groups",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Role, {
      foreignKey: "client_id",
      as: "roles",
      onDelete: "CASCADE",
    });

    this.hasMany(models.GroupRole, {
      foreignKey: "client_id",
      as: "group_roles",
      onDelete: "CASCADE",
    });

    this.hasMany(models.RefreshToken, {
      foreignKey: "client_id",
      as: "refresh_tokens",
      onDelete: "CASCADE",
    });

    this.hasMany(models.AccessToken, {
      foreignKey: "client_id",
      as: "access_tokens",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Application, {
      foreignKey: "client_id",
      as: "applications",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Directory, {
      foreignKey: "client_id",
      as: "directories",
      onDelete: "CASCADE",
    });

    this.hasMany(models.ClientAudit, {
      foreignKey: "client_id",
      as: "audits",
      onDelete: "CASCADE",
    });

    this.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
      onDelete: "CASCADE",
    });
  }

  static scopes() {
    return {
      withRoles: {
        include: [{ association: "roles" }],
      },
      withUserRoles: {
        include: [{ association: "user_roles" }],
      },
      withUserGroups: {
        include: [{ association: "user_groups" }],
      },
      withGroupRoles: {
        include: [
          {
            association: "group_roles",
          },
        ],
      },
      withDirectories: {
        include: [
          {
            association: "directories",
            attributes: {
              exclude: ["created_at", "updated_at", "client_id"],
            },
          },
        ],
      },
      withDirectoryGroups: {
        include: [
          {
            association: "directories",
            attributes: {
              exclude: ["created_at", "updated_at", "client_id"],
            },
            include: [
              {
                association: "groups",
                attributes: {
                  exclude: ["created_at", "updated_at", "directory_id"],
                },
              },
            ],
          },
        ],
      },
      withApplications: {
        include: [{ association: "applications" }],
      },
      withAudits: {
        include: [{ association: "audits" }],
      },
      withTokens: {
        include: [
          { association: "access_tokens" },
          { association: "refresh_tokens" },
        ],
      },
      withCreator: {
        include: [
          {
            association: "creator",
            attributes: {
              exclude: [
                "email",
                "phone",
                "password_hash",
                "email_verified",
                "phone_verified",
                "created_at",
                "updated_at",
                "is_active",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["created_by"],
        },
      },
      fullClient: {
        include: [
          { association: "roles" },
          { association: "user_roles" },
          { association: "user_groups" },
          { association: "group_roles" },
          { association: "directories" },
          { association: "applications" },
          { association: "access_tokens" },
          { association: "refresh_tokens" },
          { association: "audits" },
          {
            association: "creator",
            attributes: {
              exclude: [
                "email",
                "phone",
                "password_hash",
                "email_verified",
                "phone_verified",
                "created_at",
                "updated_at",
                "is_active",
              ],
            },
          },
        ],
        attributes: {
          exclude: ["created_by", "updated_at", "created_at"],
        },
      },
      withMeta: {
        attributes: {
          exclude: [],
        },
      },
      defaultScope: {
        attributes: {
          exclude: ["created_at", "updated_at", "is_active", "created_by"],
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

  static initModel(sequelize: Sequelize): typeof Client {
    Client.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
        description: DataTypes.TEXT,
        logo_url: DataTypes.STRING,
        theme_color: DataTypes.STRING(10),
        support_email: DataTypes.STRING(100),
        created_by: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        is_active: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Client",
        tableName: "clients",
        timestamps: false,
        underscored: true,
        defaultScope: this.mergedScopes["defaultScope"],
        hooks: {
          beforeCreate: (client: Client) => {
            if (!client.logo_url) {
              client.logo_url = `https://avatar.iran.liara.run/username?username=${client.name}`;
            }

            if (!client.theme_color) {
              const colorArray = [
                "#F87171",
                "#FBBF24",
                "#34D399",
                "#60A5FA",
                "#A78BFA",
                "#F472B6",
                "#FCD34D",
                "#4ADE80",
                "#38BDF8",
                "#C084FC",
              ];

              client.theme_color =
                colorArray[Math.floor(Math.random() * colorArray.length)];
            }
          },
        },
      }
    );

    Object.entries(this.scopes()).forEach(([name, scope]) => {
      if (name !== "defaultScope") {
        Client.addScope(name, scope);
      }
    });

    return Client;
  }
}
