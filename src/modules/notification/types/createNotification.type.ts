import { NotificationHeadingEnum } from '@shared/enums';

export type CreateNotificationType = {
  heading: NotificationHeadingEnum;
  caption: string;
  sendAt: Date;
  authenticatedUserId: string;
};
