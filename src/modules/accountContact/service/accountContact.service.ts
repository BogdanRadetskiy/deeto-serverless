import { AuthenticatedUser, AccountContact, Avatar } from '@shared/models';

export class AccountContactService {
  static async getByAuthenticatedUser(authenticatedUser: AuthenticatedUser): Promise<AccountContact> {
    return AccountContact.findOne({
      where: { authenticatedUserId: authenticatedUser.authenticatedUserId },
    });
  }

  static async create(data): Promise<AccountContact> {
    return await AccountContact.create(data);
  }

  static async delete(id: string): Promise<number> {
    return await AccountContact.destroy({ where: { id } });
  }

  static async getById(accountContactId: string): Promise<AccountContact> {
    return await AccountContact.findOne({
      where: { accountContactId },
      include: [
        {
          model: AuthenticatedUser,
          include: [
            {
              model: Avatar,
            },
          ],
        },
      ],
    });
  }

  static async getFew(limit): Promise<AccountContact[]> {
    return await AccountContact.findAll({ limit });
  }
}
