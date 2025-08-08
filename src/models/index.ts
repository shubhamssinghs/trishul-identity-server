import { sequelize } from "../config";
import { AccessToken } from "./access-token.model";
import { Application } from "./application.model";
import { AuthorizationCode } from "./authorization-code.model";
import { ClientAudit } from "./client-audit.model";
import { Client } from "./client.model";
import { Consent } from "./consents.model";
import { Directory } from "./directories.model";
import { EmailVerification } from "./email-verification.model";
import { GroupRole } from "./group-role.model";
import { Group } from "./group.model";
import { LinkedProvider } from "./linked-provider.model";
import { PasswordReset } from "./password-reset.model";
import { RefreshToken } from "./refresh-token.model";
import { Role } from "./role.model";
import { Session } from "./session.model";
import { UserGroup } from "./user-group.model";
import { UserRole } from "./user-role.model";
import { User } from "./user.model";

AccessToken.initModel(sequelize);
Application.initModel(sequelize);
AuthorizationCode.initModel(sequelize);
ClientAudit.initModel(sequelize);
Client.initModel(sequelize);
Consent.initModel(sequelize);
Directory.initModel(sequelize);
EmailVerification.initModel(sequelize);
GroupRole.initModel(sequelize);
Group.initModel(sequelize);
LinkedProvider.initModel(sequelize);
PasswordReset.initModel(sequelize);
RefreshToken.initModel(sequelize);
Role.initModel(sequelize);
Session.initModel(sequelize);
UserGroup.initModel(sequelize);
UserRole.initModel(sequelize);
User.initModel(sequelize);

const models = {
  AccessToken,
  Application,
  AuthorizationCode,
  ClientAudit,
  Client,
  Consent,
  Directory,
  EmailVerification,
  GroupRole,
  Group,
  LinkedProvider,
  PasswordReset,
  RefreshToken,
  Role,
  Session,
  UserGroup,
  UserRole,
  User,
};

export function registerAssociations(): void {
  Object.values(models).forEach((model: any) => {
    if (typeof model.associate === "function") {
      model.associate(models);
    }
  });
}

export {
  sequelize,
  AccessToken,
  Application,
  AuthorizationCode,
  ClientAudit,
  Client,
  Consent,
  Directory,
  EmailVerification,
  GroupRole,
  Group,
  LinkedProvider,
  PasswordReset,
  RefreshToken,
  Role,
  Session,
  UserGroup,
  UserRole,
  User,
};
