import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { mergeDefaultExcludesIntoScopes } from "../utils";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare name: string | null;
  declare email: string;
  declare password_hash: string;
  declare phone: string | null;
  declare avatar_url: string | null;
  declare email_verified: boolean;
  declare phone_verified: boolean;
  declare is_active: boolean;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static associate(models: any) {
    this.hasMany(models.UserRole, {
      foreignKey: "user_id",
      as: "roles",
      onDelete: "CASCADE",
    });

    this.belongsToMany(models.Group, {
      through: models.UserGroup,
      foreignKey: "user_id",
      otherKey: "group_id",
      as: "groups",
    });

    this.hasMany(models.Session, {
      foreignKey: "user_id",
      as: "sessions",
      onDelete: "CASCADE",
    });

    this.hasMany(models.RefreshToken, {
      foreignKey: "user_id",
      as: "refresh_tokens",
      onDelete: "CASCADE",
    });

    this.hasMany(models.AccessToken, {
      foreignKey: "user_id",
      as: "access_tokens",
      onDelete: "CASCADE",
    });

    this.hasMany(models.PasswordReset, {
      foreignKey: "user_id",
      as: "password_resets",
      onDelete: "CASCADE",
    });

    this.hasMany(models.LinkedProvider, {
      foreignKey: "user_id",
      as: "linked_providers",
      onDelete: "CASCADE",
    });

    this.hasMany(models.EmailVerification, {
      foreignKey: "user_id",
      as: "email_verifications",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Consent, {
      foreignKey: "user_id",
      as: "consents",
      onDelete: "CASCADE",
    });

    this.hasMany(models.ClientAudit, {
      foreignKey: "user_id",
      as: "client_audits",
      onDelete: "CASCADE",
    });

    this.hasMany(models.AuthorizationCode, {
      foreignKey: "user_id",
      as: "authorization_codes",
      onDelete: "CASCADE",
    });
  }

  static scopes() {
    return {
      withRoles: {
        include: [{ association: "roles" }],
      },
      withGroups: {
        include: [{ association: "groups" }],
      },
      withSessions: {
        include: [{ association: "sessions" }],
      },
      withTokens: {
        include: [
          { association: "access_tokens" },
          { association: "refresh_tokens" },
        ],
      },
      withSecurity: {
        include: [
          { association: "password_resets" },
          { association: "email_verifications" },
          { association: "linked_providers" },
        ],
      },
      withAuthorization: {
        include: [
          { association: "authorization_codes" },
          { association: "consents" },
        ],
      },
      fullProfile: {
        include: [
          { association: "roles" },
          { association: "groups" },
          { association: "sessions" },
          { association: "access_tokens" },
          { association: "refresh_tokens" },
          { association: "password_resets" },
          { association: "linked_providers" },
          { association: "email_verifications" },
          { association: "authorization_codes" },
          { association: "consents" },
        ],
      },
      defaultScope: {
        attributes: {
          exclude: [
            "password_hash",
            "email_verified",
            "phone_verified",
            "created_at",
            "updated_at",
            "is_active",
          ],
        },
        where: {
          is_active: true,
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

  static initModel(sequelize: Sequelize): typeof User {
    User.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: DataTypes.STRING,
        email: DataTypes.STRING(150),
        password_hash: DataTypes.STRING,
        phone: DataTypes.STRING,
        avatar_url: DataTypes.STRING,
        email_verified: DataTypes.BOOLEAN,
        phone_verified: DataTypes.BOOLEAN,
        is_active: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: false,
        underscored: true,
        hooks: {
          beforeCreate: (user: User) => {
            if (!user.avatar_url) {
              user.avatar_url = `https://avatar.iran.liara.run/username?username=${user.name}`;
            }
          },
        },
      }
    );

    Object.entries(this.scopes()).forEach(([name, scope]) => {
      if (name !== "defaultScope") {
        User.addScope(name, scope);
      }
    });

    return User;
  }
}
