import { loadSequelize } from '@shared/sequelize/sequelize';
import { NotificationService } from '@modules/notification/service/notification.service';
import { MessageUtil } from '@shared/utils/message';

export async function createNotificationHandler(event) {
  await loadSequelize();

  const body = JSON.parse(event.body);

  const cognitoUserId = event.requestContext?.authorizer?.userId;
  const data = {
    heading: body.heading,
    caption: body.caption,
    cognitoUserId: cognitoUserId,
  };

  const result = await NotificationService.create(data);
  return MessageUtil.success(result);
}

export async function getNotificationsHandler(event) {
  await loadSequelize();

  const cognitoUserId = event.requestContext?.authorizer?.userId;

  const result = await NotificationService.getAll(cognitoUserId);
  return MessageUtil.success(result);
}

export async function getNotificationByIdHandler(event) {
  await loadSequelize();

  const cognitoUserId = event.requestContext?.authorizer?.userId;
  const notificationId = event.pathParameters.notificationId;

  const result = await NotificationService.getById(cognitoUserId, notificationId);
  return MessageUtil.success(result);
}

export async function updateNotification(event) {
  await loadSequelize();
  const body = JSON.parse(event.body);

  const cognitoUserId = event.requestContext?.authorizer?.userId;
  const notificationId = event.pathParameters.notificationId;
  const data = {
    notificationId,
    cognitoUserId,
    heading: body.heading,
    caption: body.caption,
  };

  const result = await NotificationService.update(data);
  return MessageUtil.success(result);
}

export async function markAsReadNotification(event) {
  await loadSequelize();

  const cognitoUserId = event.requestContext?.authorizer?.userId;
  const notificationId = event.pathParameters.notificationId;

  const data = {
    notificationId,
    cognitoUserId,
    isMarkedAsRead: true,
  };

  const result = await NotificationService.update(data);
  return MessageUtil.success(result);
}
