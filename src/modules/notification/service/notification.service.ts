import { Notification } from '@shared/models';

import { CreateNotificationType } from '@modules/notification/types';
import { Op } from 'sequelize';

export class NotificationService {
  static async create(data: CreateNotificationType): Promise<Notification> {
    // TODO additional account contacts.
    return Notification.create(data);
  }

  /**
   * return notification By ID
   * @param authenticatedUserId
   * @param notificationId
   */
  static async getById(authenticatedUserId: string, notificationId: string): Promise<Notification> {
    return Notification.findOne({
      where: {
        notificationId,
        authenticatedUserId,
      },
    });
  }

  /**
   * returns a list of the last 100 notifications that their timestamp is not in the future.
   * sorted from newest to oldest.
   * @param authenticatedUserId
   */
  static async getHundredRecentNotifications(authenticatedUserId: string): Promise<any> {
    return Notification.findAll({
      where: {
        authenticatedUserId,
        sendAt: {
          [Op.lt]: new Date(),
        },
      },
      limit: 100,
      order: [['sendAt', 'DESC']],
    });
  }

  /**
   * Change the flag Notifications.isMarkedAsRead to true
   * returns false if notification in future
   * @param authenticatedUserId
   * @param notificationId
   */
  static async markAsRead(authenticatedUserId: string, notificationId: string): Promise<Notification | null> {
    const notification = await Notification.findOne({
      where: {
        notificationId,
        authenticatedUserId,
        sendAt: {
          [Op.lt]: new Date(),
        },
      },
    });
    if (!notification) {
      return null;
    }
    notification.isMarkedAsRead = true;
    return notification.save();
  }

  /**
   * delete notification by ID
   * user cannot delete future notifications
   * */
  static async deleteById(authenticatedUserId: string, notificationId: string) {
    const notification = await Notification.findOne({
      where: {
        notificationId,
        authenticatedUserId,
        sendAt: {
          [Op.lt]: new Date(),
        },
      },
    });
    if (!notification) {
      return null;
    }
    await notification.destroy();
    return { delete: notificationId };
  }
}
