import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
} from "sequelize";

export class Application extends Model<
  InferAttributes<Application>,
  InferCreationAttributes<Application>
> {
  declare id: CreationOptional<string>;
  declare client_id: ForeignKey<string>;
  declare name: string;
  declare client_id_value: string;
  declare client_secret: string | null;
  declare redirect_uris: string | null;
  declare post_logout_redirect_uris: string | null;
  declare grant_types: string | null;
  declare scopes: string | null;
  declare is_confidential: boolean;
  declare require_pkce: boolean;
  declare access_token_lifetime: number;
  declare refresh_token_lifetime: number;
  declare allowed_identity_providers: string | null;
  declare allowed_cors_origins: string | null;
  declare terms_url: string | null;
  declare privacy_url: string | null;
  declare type: string | null;
  declare auth_method: string | null;
  declare logo_url: string | null;
  declare description: string | null;
  declare login_url: string | null;
  declare logout_url: string | null;
  declare is_active: boolean;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  static associate(models: any) {
    this.belongsTo(models.Client, {
      foreignKey: "client_id",
      as: "client",
      onDelete: "CASCADE",
    });

    this.hasMany(models.AuthorizationCode, {
      foreignKey: "application_id",
      as: "authorization_codes",
      onDelete: "CASCADE",
    });

    this.hasMany(models.AccessToken, {
      foreignKey: "application_id",
      as: "access_tokens",
      onDelete: "CASCADE",
    });

    this.hasMany(models.RefreshToken, {
      foreignKey: "application_id",
      as: "refresh_tokens",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Consent, {
      foreignKey: "application_id",
      as: "consents",
      onDelete: "CASCADE",
    });

    this.hasMany(models.Session, {
      foreignKey: "application_id",
      as: "sessions",
      onDelete: "SET NULL",
    });
  }

  static scopes() {
    return {
      confidential: {
        where: {
          is_confidential: true,
        },
      },
      public: {
        where: {
          is_confidential: false,
        },
      },
      forClient(clientId: string) {
        return {
          where: {
            client_id: clientId,
          },
        };
      },
    };
  }

  static initModel(sequelize: Sequelize): typeof Application {
    Application.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        client_id: DataTypes.UUID,
        name: DataTypes.STRING(100),
        client_id_value: DataTypes.STRING(100),
        client_secret: DataTypes.STRING(255),
        redirect_uris: DataTypes.TEXT,
        post_logout_redirect_uris: DataTypes.TEXT,
        grant_types: DataTypes.TEXT,
        scopes: DataTypes.TEXT,
        is_confidential: DataTypes.BOOLEAN,
        require_pkce: DataTypes.BOOLEAN,
        access_token_lifetime: DataTypes.INTEGER,
        refresh_token_lifetime: DataTypes.INTEGER,
        allowed_identity_providers: DataTypes.TEXT,
        allowed_cors_origins: DataTypes.TEXT,
        terms_url: DataTypes.STRING,
        privacy_url: DataTypes.STRING,
        type: DataTypes.STRING(50),
        auth_method: DataTypes.STRING(50),
        logo_url: DataTypes.STRING,
        description: DataTypes.TEXT,
        login_url: DataTypes.STRING,
        logout_url: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: "Application",
        tableName: "applications",
        timestamps: false,
        underscored: true,
      }
    );

    return Application;
  }
}
