import {
  AccountContact,
  AuthenticatedUser,
  AuthenticatedUserPrivilege,
  Avatar,
  Opportunity,
  Vendor,
  VendorContact,
} from '@shared/models';
import { UserPrivilegeEnum } from '@shared/enums';
import { VendorContactService } from '@modules/vendorContact/service/vendorContact.service';
import { AuthenticatedUserService } from '@modules/authenticatedUser/service/authenticatedUser.service';

export class VendorService {
  static async grantVendor(authenticatedUserId: string, vendorName: string) {
    const authenticatedUser = await AuthenticatedUser.findOne({
      where: { authenticatedUserId },
      include: { model: AuthenticatedUserPrivilege },
    });

    for (let privilege of authenticatedUser.authenticatedUserPrivileges) {
      if (privilege.userPrivileges === UserPrivilegeEnum.VENDOR) {
        throw new Error('User already vendor');
      }
    }

    const vendor = await VendorService.create({ name: vendorName });
    const vendorContact = await VendorContactService.create({ sendEmailOnBehalf: vendorName });

    await vendor.$set('vendorContacts', [vendorContact]);
    await authenticatedUser.$set('vendorContact', vendorContact);

    await AuthenticatedUserService.grantPrivilege(authenticatedUserId, UserPrivilegeEnum.VENDOR);

    return AuthenticatedUser.findOne({
      where: { authenticatedUserId },
      include: [{ model: VendorContact, include: [Vendor] }, { model: AuthenticatedUserPrivilege }],
    });
  }

  static async getAccountContacts(vendorId) {
    const vendor = await Vendor.findOne({
      where: { vendorId },
      include: [
        {
          model: VendorContact,
          include: [
            {
              model: AccountContact,
              required: false,
              include: [
                {
                  model: Opportunity,
                },
                {
                  model: AuthenticatedUser,
                },
              ],
            },
          ],
        },
      ],
    });

    const accountContacts = vendor?.vendorContacts.map((vendorContact) => {
      return vendorContact.accountContacts;
    });

    return accountContacts?.flat();
  }

  static async getReferences(vendorId: string, limit?: number): Promise<AccountContact[]> {
    const vendor = await Vendor.findOne({
      where: { vendorId },
      include: [
        {
          model: VendorContact,
          include: [
            {
              limit,
              model: AccountContact,
              attributes: {
                exclude: ['authenticatedUserId'],
              },
              include: [
                {
                  required: true,
                  model: AuthenticatedUser,
                  include: [
                    {
                      model: Avatar,
                    },
                    {
                      required: true,
                      model: AuthenticatedUserPrivilege,
                      where: { userPrivileges: UserPrivilegeEnum.REFERENCE },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    const accountContacts = vendor?.vendorContacts.map((vendorContact) => {
      return vendorContact.accountContacts;
    });

    return accountContacts?.flat();
  }

  static async calculateRecommendedReferences(vendorId: string, limit: number) {
    return this.getReferences(vendorId, limit);
  }

  static async create(data): Promise<Vendor> {
    return await Vendor.create(data);
  }

  static async delete(vendorId: string): Promise<number> {
    return await Vendor.destroy({ where: { vendorId } });
  }

  static async getById(vendorId: string, params?): Promise<Vendor> {
    if (params?.includeAvatar) {
      return Vendor.findOne({ where: { vendorId }, include: [{ model: Avatar }] });
    } else {
      return Vendor.findOne({ where: { vendorId } });
    }
  }

  static async update(data): Promise<Vendor> {
    const vendor = await this.getById(data.vendorId);
    if (!vendor) {
      throw new Error('Cannot find vendor');
    }

    vendor.name = data.name ?? vendor.name;
    return await vendor.save();
  }
}
