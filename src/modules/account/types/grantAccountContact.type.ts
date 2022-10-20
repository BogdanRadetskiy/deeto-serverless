import { AccountWithContactType, AuthenticatedUserType } from '@modules/account/types/createProspect.type';

export type GrantAccountContactType = {
  authenticatedUser: AuthenticatedUserType;
  accountWithContact: AccountWithContactType;

  vendorId: string;
  vendorContactId: string;
};
