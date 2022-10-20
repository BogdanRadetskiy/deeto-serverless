import { AccountContact, AuthenticatedUser, Avatar, GuiSettings, Vendor, VendorContact } from '@shared/models';

import { CreateAuthenticatedUserType } from '@modules/authenticatedUser/types';
import { GuiSettingService } from '@modules/guiSettings/service/guiSetting.service';
import { AvatarService } from '@modules/avatar/service/avatar.service';
import { AuthenticatedUserPrivilegeService } from '@modules/AuthenticatedUserPrivilege/service/AuthenticatedUserPrivilege.service';
import { AvatarTypeEnum, UserPrivilegeEnum, UserStatusEnum } from '@shared/enums';
import { CognitoService } from '@modules/cognito/service/cognito.service';
import generatePassword from 'generate-password';
import { VendorService } from '@modules/vendor/service/vendor.service';
import { CreateAuthenticatedUserWithCognitoType } from '@modules/account/types';

export class AuthenticatedUserService {
  static async findByEmailOrCreate(data: CreateAuthenticatedUserType): Promise<AuthenticatedUser> {
    let authenticatedUser = await AuthenticatedUserService.getByEmail(data.email);
    if (!authenticatedUser) {
      authenticatedUser = await AuthenticatedUserService.createWithCognito(data);
    }
    return authenticatedUser;
  }

  static async createWithCognito(data: CreateAuthenticatedUserType): Promise<AuthenticatedUser> {
    // create cognito user
    const password = generatePassword.generate({
      length: 25,
      numbers: true,
      uppercase: true,
    });

    const cognitoUser = await CognitoService.createUser(data.email, password);

    return this.create({ ...data, cognitoUserId: cognitoUser.UserSub });
  }

  static async create(data: CreateAuthenticatedUserWithCognitoType): Promise<AuthenticatedUser> {
    // create user in DB
    const user = await AuthenticatedUser.create(data);
    const avatarData = data.avatarURL ? { type: AvatarTypeEnum.PICTURE, url: data.avatarURL } : null;
    const avatar = await AvatarService.create(avatarData);
    await user.$set('avatar', avatar);
    await GuiSettingService.create({ authenticatedUserId: user.authenticatedUserId });
    return user;
  }

  static async isAvailableForVendor(vendorId, invitedUserEmail) {
    const authenticatedUser = await this.getByEmail(invitedUserEmail);
    if (!authenticatedUser) {
      return {
        isAvailable: true,
      };
    }
    const vendorAccountContacts = await VendorService.getAccountContacts(vendorId);

    if (!vendorAccountContacts || !vendorAccountContacts.length) {
      return {
        isAvailable: false,
        cause: 'vendorAccountContacts(employees) is empty',
      };
    }

    const filteredAccountContacts = vendorAccountContacts.filter((vendorAccountContact) => {
      return vendorAccountContact.authenticatedUser.email === invitedUserEmail;
    });

    if (filteredAccountContacts.length > 0) {
      return {
        isAvailable: false,
        cause: 'User already reference or prospect',
      };
    }

    return {
      isAvailable: true,
    };
  }

  static async getMe(authenticatedUserId: string): Promise<AuthenticatedUser> {
    return AuthenticatedUser.findOne({
      where: { authenticatedUserId },
      include: [VendorContact, AccountContact, Avatar],
    });
  }

  static async getGuiSettings(cognitoUserId: string) {
    const userWithSettings = await AuthenticatedUser.findOne({ where: { cognitoUserId }, include: GuiSettings });
    return userWithSettings.guiSettings;
  }

  static async getById(authenticatedUserId: string): Promise<AuthenticatedUser> {
    return AuthenticatedUser.findOne({ where: { authenticatedUserId } });
  }

  static async getByEmail(email: string): Promise<AuthenticatedUser> {
    return AuthenticatedUser.findOne({ where: { email } });
  }

  static async getByCognitoId(cognitoUserId: string): Promise<AuthenticatedUser> {
    return AuthenticatedUser.findOne({ where: { cognitoUserId } });
  }

  static async getVendorContact(authenticatedUserId: string) {
    const data = await AuthenticatedUser.findOne({
      where: { authenticatedUserId },
      include: [{ model: VendorContact }],
    });

    return data?.vendorContact;
  }

  static async getVendor(authenticatedUserId: string) {
    const data = await AuthenticatedUser.findOne({
      where: { authenticatedUserId },
      include: [{ model: VendorContact, include: [Vendor] }],
    });

    return data?.vendorContact?.vendor;
  }

  static async setUserStatusToConfirmed(email: string) {
    const user = await this.getByEmail(email);
    user.userStatus = UserStatusEnum.CONFIRMED;
    return user.save();
  }

  static async setUserApprovedEula(authenticatedUserId: string) {
    const user = await this.getById(authenticatedUserId);
    user.approvedEULA = true;
    return user.save();
  }

  static async grantPrivilege(authenticatedUserId: string, privilegeType: UserPrivilegeEnum) {
    return await AuthenticatedUserPrivilegeService.create({
      authenticatedUserId: authenticatedUserId,
      userPrivileges: privilegeType,
    });
  }
}
