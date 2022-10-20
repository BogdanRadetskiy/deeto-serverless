import { ObjectLog } from '@shared/models';

import { ObjectLogActionEnum, objectLogClassNamesEnum } from '@shared/enums';

export class ObjectLogService {
  static async create(
    className: objectLogClassNamesEnum,
    objectId: string,
    authenticatedUserId: string,
    action: ObjectLogActionEnum,
  ): Promise<ObjectLog> {
    // TODO additional account contacts.
    const data = {
      className: className,
      objectId: objectId,
      authenticatedUserId: authenticatedUserId,
      action: action,
    };

    return ObjectLog.create(data);
  }

  static async created(
    className: objectLogClassNamesEnum,
    objectId: string,
    authenticatedUserId: string,
  ): Promise<ObjectLog> {
    return this.create(className, objectId, authenticatedUserId, ObjectLogActionEnum.CREATED);
  }

  static async viewed(
    className: objectLogClassNamesEnum,
    objectId: string,
    authenticatedUserId: string,
  ): Promise<ObjectLog> {
    return this.create(className, objectId, authenticatedUserId, ObjectLogActionEnum.VIEWED);
  }

  static async updated(
    className: objectLogClassNamesEnum,
    objectId: string,
    authenticatedUserId: string,
  ): Promise<ObjectLog> {
    return this.create(className, objectId, authenticatedUserId, ObjectLogActionEnum.UPDATED);
  }

  static async deleted(
    className: objectLogClassNamesEnum,
    objectId: string,
    authenticatedUserId: string,
  ): Promise<ObjectLog> {
    return this.create(className, objectId, authenticatedUserId, ObjectLogActionEnum.DELETED);
  }
}
