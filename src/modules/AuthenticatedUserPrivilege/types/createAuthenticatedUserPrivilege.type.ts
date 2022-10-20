import { UserPrivilegeEnum } from '@shared/enums';

export type CreateAuthenticatedUserPrivilegeType = {
  userPrivileges: UserPrivilegeEnum;
  authenticatedUserId: string;
};
