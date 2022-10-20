import { AccountWithContactType } from '@modules/account/types/createProspect.type';

export type CreateAccountWithContactType = AccountWithContactType & {
  authenticatedUserId: string;
  vendorId: string;
  vendorContactId: string;
};
