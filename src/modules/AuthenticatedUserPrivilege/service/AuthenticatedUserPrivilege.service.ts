import { AuthenticatedUserPrivilege } from '@shared/models';
import { CreateAuthenticatedUserPrivilegeType } from '@modules/AuthenticatedUserPrivilege/types';

export class AuthenticatedUserPrivilegeService {
  static async create(data: CreateAuthenticatedUserPrivilegeType) {
    return AuthenticatedUserPrivilege.create(data);
  }
}
