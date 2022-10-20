import { AccountWithContactType, AuthenticatedUserType } from '@modules/account/types/createProspect.type';

export type InviteReferenceType = {
  authenticatedUser: AuthenticatedUserType;
  accountWithContact: AccountWithContactType;

  vendorId: string;
  vendorContactId: string;
};
