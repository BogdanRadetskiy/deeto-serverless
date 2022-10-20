import { CreateAuthenticatedUserType } from '@modules/authenticatedUser/types';

export type CreateAuthenticatedUserWithCognitoType = CreateAuthenticatedUserType & {
  cognitoUserId: string;
};
