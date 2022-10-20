import { Account, AccountContact, Opportunity, RecommendedReference } from '@shared/models';
import { CreateAccountWithContactType } from '@modules/account/types/createAccountWithContact.type';
import { Op, WhereOptions } from 'sequelize';
import {
  CreateProspectType,
  GrantAccountContactType,
  InviteReferenceType,
  SearchAccountContactOptionsType,
} from '@modules/account/types';
import { AuthenticatedUserService } from '@modules/authenticatedUser/service/authenticatedUser.service';
import { OpportunityService } from '@modules/opportunity/service/opportunity.service';
import { AuthenticatedUserPrivilegeService } from '@modules/AuthenticatedUserPrivilege/service/AuthenticatedUserPrivilege.service';
import { UserPrivilegeEnum } from '@shared/enums';

export class AccountService {
  static async createAccountWithContact(data: CreateAccountWithContactType): Promise<Account> {
    return Account.create(
      {
        vendorId: data.vendorId,
        linkedInProfile: data.linkedInProfile,
        companyName: data.companyName,
        companySize: data.companySize,
        industry: data.industry,
        accountContacts: [
          {
            authenticatedUserId: data.authenticatedUserId,
            adminId: data.vendorContactId,
            title: data.title,
          },
        ],
      },
      {
        include: [AccountContact],
      },
    );
  }

  static async getAllByVendorId(vendorId: string) {
    return Account.findAll({
      where: { vendorId },
    });
  }

  static async getAccountContacts(accountId: string) {
    const accountWithContacts = await Account.findOne({ where: { accountId }, include: [AccountContact] });
    return accountWithContacts?.accountContacts;
  }

  // creates prospect
  static async createProspect(data: CreateProspectType): Promise<Account> {
    const accountWithContact = await this.grantAccountContact({
      authenticatedUser: {
        ...data.authenticatedUser,
      },
      accountWithContact: {
        ...data.accountWithContact,
      },
      vendorId: data.vendorId,
      vendorContactId: data.vendorContactId,
    });

    // append opportunity
    await OpportunityService.createWithSelectedReferences({
      accountContactId: accountWithContact.accountContacts[0].accountContactId,
      accountId: accountWithContact.accountId,
      selectedReferences: data.selectedReferences,
      ownerId: data.vendorContactId,
    });

    // append role
    await AuthenticatedUserPrivilegeService.create({
      authenticatedUserId: accountWithContact.accountContacts[0].authenticatedUserId,
      userPrivileges: UserPrivilegeEnum.PROSPECT,
    });

    return Account.findOne({
      where: { accountId: accountWithContact.accountId },
      include: [AccountContact, { model: Opportunity, include: [RecommendedReference] }],
    });
  }

  // creates reference
  static async createReference(data: InviteReferenceType): Promise<Account> {
    const accountWithContact = await this.grantAccountContact(data);

    // append role
    await AuthenticatedUserPrivilegeService.create({
      authenticatedUserId: accountWithContact.accountContacts[0].authenticatedUserId,
      userPrivileges: UserPrivilegeEnum.REFERENCE,
    });

    return accountWithContact;
  }

  // creates account contact that belongs to vendor
  static async grantAccountContact(data: GrantAccountContactType): Promise<Account> {
    const authenticatedUser = await AuthenticatedUserService.findByEmailOrCreate(data.authenticatedUser);

    return this.createAccountWithContact({
      ...data.accountWithContact,
      authenticatedUserId: authenticatedUser.authenticatedUserId,
      vendorId: data.vendorId,
      vendorContactId: data.vendorContactId,
    });
  }

  static async getAccountContactsSearch(accountId: string, searchOptions: SearchAccountContactOptionsType) {
    let whereOptions: WhereOptions = {};
    if (searchOptions.title) {
      whereOptions.title = { [Op.iLike]: '%' + searchOptions.title + '%' };
    }
    if (searchOptions.publicNote) {
      whereOptions.publicNote = { [Op.iLike]: '%' + searchOptions.publicNote + '%' };
    }
    if (searchOptions.selectedReviewQuote) {
      whereOptions.selectedReviewQuote = { [Op.iLike]: '%' + searchOptions.selectedReviewQuote + '%' };
    }
    if (searchOptions.often) {
      whereOptions.often = { [Op.iLike]: '%' + searchOptions.often + '%' };
    }

    const accountWithContacts = await Account.findOne({
      where: { accountId },
      include: [{ model: AccountContact, where: whereOptions }],
    });

    return accountWithContacts?.accountContacts;
  }

  static async create(data): Promise<Account> {
    return Account.create(data);
  }
}
