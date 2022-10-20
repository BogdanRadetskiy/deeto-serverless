import { ObjectLogService } from '@modules/objectLog/service/objectLog.service';
import { objectLogClassNamesEnum } from '@shared/enums';
import { AccountContact, AuthenticatedUser, CallLog } from '@shared/models';

export class CallLogService {
  static async create(data): Promise<CallLog> {
    const callLog = await CallLog.create(data);

    return callLog;
  }

  static async delete(callLogID: string): Promise<number> {
    return CallLog.destroy({ where: { callLogId: callLogID } });
  }

  static async getByIdAndAuthenticatedUserId(authenticatedUserId: string, callLogId: string): Promise<CallLog> {
    const res = await AuthenticatedUser.findOne({
      where: { authenticatedUserId },
      include: [
        {
          model: AccountContact,
          include: [
            {
              model: CallLog,
              where: { callLogId },
            },
          ],
        },
      ],
    });
    return res?.accountContacts[0]?.callLog;
  }

  static async getById(callLogID: string): Promise<CallLog> {
    return CallLog.findOne({ where: { callLogId: callLogID } });
  }

  // TODO create data type
  static async update(callLogID: string, data): Promise<CallLog> {
    const callLog = await CallLogService.getById(callLogID);
    callLog.event = data.event;
    callLog.channel = data.channel;
    callLog.timestamp = data.timestamp;
    return await callLog.save();
  }
}
