import { AuthenticatedUserType } from '@modules/account/types';

export type CreateAuthenticatedUserType = AuthenticatedUserType & {
  avatarURL?: string;
  username?: string;
};
