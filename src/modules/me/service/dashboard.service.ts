import { Op } from 'sequelize';

import {
  AuthenticatedUser,
  Avatar,
  Vendor,
  Meeting,
  ScheduledTimeSlot,
  AccountContact,
  VendorContact,
  Account,
  MeetingStage,
  MeetingFeedback,
  CallStatistics,
  EmailActivity,
  MeetingCredit,
  CallLog,
} from '@shared/models';

export class DashboardService {
  static async getDashboardMeetingsForVendor(vendorId: string): Promise<Meeting[]> {
    return Meeting.findAll({
      include: [
        {
          model: AccountContact,
          as: 'prospectContact',
          include: [
            {
              model: Account,
              include: [
                {
                  model: Vendor,
                  where: { vendorId: vendorId },
                },
              ],
            },
          ],
        },
        {
          model: AccountContact,
          as: 'referenceContact',
          include: [
            {
              model: Account,
              include: [
                {
                  model: Vendor,
                  where: { vendorId: vendorId },
                },
              ],
            },
          ],
        },
        {
          model: MeetingStage,
        },
        {
          model: ScheduledTimeSlot,
        },
        {
          model: EmailActivity,
        },
        {
          model: CallStatistics,
          include: [
            {
              model: CallLog,
            },
          ],
        },
        {
          model: MeetingFeedback,
        },
        {
          model: MeetingCredit,
        },
      ],
    });
  }

  static async getDashboardMeetingsForAccountContact(accountContactId: string): Promise<Meeting[]> {
    return Meeting.findAll({
      where: {
        [Op.or]: [{ prospectContactId: accountContactId }, { referenceContactId: accountContactId }],
      },
      include: [
        {
          model: AccountContact,
          as: 'prospectContact',
          include: [
            {
              model: Account,
              include: [
                {
                  model: Vendor,
                },
              ],
            },
          ],
        },
        {
          model: AccountContact,
          as: 'referenceContact',
          include: [
            {
              model: Account,
              include: [
                {
                  model: Vendor,
                },
              ],
            },
          ],
        },
        {
          model: MeetingStage,
        },
        {
          model: ScheduledTimeSlot,
        },
        {
          model: EmailActivity,
        },
        {
          model: CallStatistics,
          include: [
            {
              model: CallLog,
            },
          ],
        },
        {
          model: MeetingFeedback,
        },
        {
          model: MeetingCredit,
        },
      ],
    });
  }
  static async getTopReferences(): Promise<AccountContact[]> {
    return AccountContact.findAll({
      limit: 5,
      order: [['updatedAt', 'DESC']],
      include: [{ model: AuthenticatedUser, include: [{ model: Avatar }] }],
    });
  }
}
