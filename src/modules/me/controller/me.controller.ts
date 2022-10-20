import { loadSequelize } from '@shared/sequelize/sequelize';
import { MessageUtil } from '@shared/utils/message';
import { NotificationService } from '@modules/notification/service/notification.service';
import { ObjectLogService } from '@modules/objectLog/service/objectLog.service';
import { AuthenticatedUserService } from '@modules/authenticatedUser/service/authenticatedUser.service';
import { DashboardService } from '@modules/me/service/dashboard.service';
import { GuiSettingService } from '@modules/guiSettings/service/guiSetting.service';
import {
  mockFixedCompanySizeList,
  mockFixedIndustryList,
  mockFixedReferenceOftenList,
  mockFixedRegionList,
  mockFixedRoleList,
  mockStatisticsResults,
} from '@shared/constants';

import { AccountContact } from '@shared/models';
import {
  CallLogEventEnum,
  MeetingStatusEnum,
  MeetingStageStatusEnum,
  MeetingStageTypeEnum,
  ScheduledTimeSlotStatusEnum,
  UserPrivilegeEnum,
  UserStatusEnum,
  VendorAccountLevelEnum,
  objectLogClassNamesEnum,
} from '@shared/enums';
import { enumToObject } from '@shared/helpers';
import validator from 'validator';
import isUUID = validator.isUUID;

export async function getMeHandler(event) {
  await loadSequelize();
  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  const result = await AuthenticatedUserService.getMe(authenticatedUserId);

  await ObjectLogService.viewed(objectLogClassNamesEnum.AuthenticatedUser, authenticatedUserId, authenticatedUserId);

  return MessageUtil.success(result);
}

export async function putMeApprovedEULA(event) {
  await loadSequelize();
  const authenticatedUserId = event.requestContext.authorizer.authenticatedUserId; // using Lambda proxy Integration
  const result = await AuthenticatedUserService.setUserApprovedEula(authenticatedUserId);

  await ObjectLogService.updated(objectLogClassNamesEnum.AuthenticatedUser, authenticatedUserId, authenticatedUserId);

  return MessageUtil.success(result);
}

export async function getMeSchedulingHandler(event) {
  // note - currently supports only prospect.
  // note 2 - missing: recommendedReference information

  await loadSequelize();
  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId;

  //const authenticatedUserObj = await AuthenticatedUserService.getMe(authenticatedUserId);

  const accountContactId = event.requestContext?.authorizer?.accountContactId;

  // todo- error handling:
  if (!accountContactId) {
    // return emtpy object
  }

  const meetingList = (await DashboardService.getDashboardMeetingsForAccountContact(accountContactId)).map((el) =>
    el.get({ plain: true }),
  );

  const result = {
    meetings: meetingList,
    availableReferences: meetingList.filter((data) => data.prospectAggregatedStage === MeetingStatusEnum.INITIATE),
    completedCalls: meetingList.filter((data) => data.prospectAggregatedStage === MeetingStatusEnum.COMPLETED),
    cancelled: meetingList.filter((data) => data.prospectAggregatedStage === MeetingStatusEnum.STUCK),
  };

  return MessageUtil.success(result);
}

export async function getMeDashboardHandler(event) {
  await loadSequelize();

  const authorizerContext = event.requestContext.authorizer;

  const vendorId = authorizerContext?.vendorId;
  const vendorContactId = authorizerContext?.vendorContactId;
  const accountContactId = authorizerContext?.accountContactIds;

  // step 1: find out if the user is a vendor, prospect or a reference.
  let queuesList;

  if (vendorContactId) {
    // step 2 - build all queues
    // the user is a vendor user.

    const meetingList = (await DashboardService.getDashboardMeetingsForVendor(vendorId)).map((el) =>
      el.get({ plain: true }),
    );

    queuesList = [
      {
        queueOrder: 1,
        meetingStatus: MeetingStatusEnum.STUCK,
        queueLabel: 'Attention',
        meetings: meetingList.filter((data) => data.vendorAggregatedStage === MeetingStatusEnum.STUCK),
      },
      {
        queueOrder: 2,
        meetingStatus: MeetingStatusEnum.IN_PROGRESS,
        queueLabel: 'In Scheduling',
        meetings: meetingList.filter((data) => data.vendorAggregatedStage === MeetingStatusEnum.IN_PROGRESS),
      },
      {
        queueOrder: 3,
        meetingStatus: MeetingStatusEnum.SCHEDULED,
        queueLabel: 'Confirmed',
        meetings: meetingList.filter((data) => data.vendorAggregatedStage === MeetingStatusEnum.SCHEDULED),
      },
      {
        queueOrder: 4,
        meetingStatus: MeetingStatusEnum.LIVE,
        queueLabel: 'Live',
        meetings: meetingList.filter((data) => data.vendorAggregatedStage === MeetingStatusEnum.LIVE),
      },
      {
        queueOrder: 5,
        meetingStatus: MeetingStatusEnum.COMPLETED,
        queueLabel: 'Completed',
        meetings: meetingList.filter((data) => data.vendorAggregatedStage === MeetingStatusEnum.COMPLETED),
      },
    ];
  } else if (accountContactId) {
    const meetingList = (await DashboardService.getDashboardMeetingsForAccountContact(accountContactId)).map((el) =>
      el.get({ plain: true }),
    );

    queuesList = [
      {
        queueOrder: 1,
        meetingStatus: MeetingStatusEnum.IN_PROGRESS,
        queueLabel: 'Meeting Requests',
        meetings: meetingList.filter((data) => data.vendorAggregatedStage === MeetingStatusEnum.IN_PROGRESS),
      },
      {
        queueOrder: 2,
        meetingStatus: MeetingStatusEnum.STUCK,
        queueLabel: 'Pending',
        meetings: meetingList.filter((data) => data.vendorAggregatedStage === MeetingStatusEnum.STUCK),
      },

      {
        queueOrder: 3,
        meetingStatus: MeetingStatusEnum.SCHEDULED,
        queueLabel: 'Confirmed',
        meetings: meetingList.filter((data) => data.vendorAggregatedStage === MeetingStatusEnum.SCHEDULED),
      },
      {
        queueOrder: 4,
        meetingStatus: MeetingStatusEnum.COMPLETED,
        queueLabel: 'Completed',
        meetings: meetingList.filter((data) => data.vendorAggregatedStage === MeetingStatusEnum.COMPLETED),
      },
    ];
  } else {
    return MessageUtil.error(403, 'Dashboard unavailable for this user type');
  }

  // step 3 - assign meetings to queues, and calculate their Canban text (text in the middle of the box) - Had to loop through object to get raw data using .get() function
  queuesList.forEach((queueElement) => {
    queueElement.meetings.forEach((meetingElement) => {
      meetingElement.canbanText = 'Text of Canban coming soon';
    });
  });

  const topReferences: AccountContact[] = await DashboardService.getTopReferences();

  // step 4 - calculate statistics
  const results = {
    queuesMeetingStatuses: queuesList,
    statistics: mockStatisticsResults,
    topReferences: topReferences,
  };

  return MessageUtil.success(results);
}

export async function getMeDropdownListsHandler() {
  await loadSequelize();

  const result = [
    'industry',
    'companySize',
    'referenceOften',
    'region',
    'role',
    'callLogEvents',
    'meetingStagesStatuses',
    'meetingStagesTypes',
    'meetingStatus',
    'scheduledTimeslotStatus',
    'userPrivileges',
    'userStatus',
    'vendorAccountLevel',
  ];

  return MessageUtil.success(result);
}

export async function getMeDropdownListByIdHandler(event) {
  await loadSequelize();

  const dropDownType = event.pathParameters.dropdownID.toLowerCase();

  switch (dropDownType) {
    case 'industry':
      return MessageUtil.success(mockFixedIndustryList);
    case 'companysize':
      return MessageUtil.success(mockFixedCompanySizeList);
    case 'referenceoften':
      return MessageUtil.success(mockFixedReferenceOftenList);
    case 'region':
      return MessageUtil.success(mockFixedRegionList);
    case 'role':
      return MessageUtil.success(mockFixedRoleList);
    case 'calllogevents':
      return MessageUtil.success(enumToObject(CallLogEventEnum));
    case 'meetingstagesstatuses':
      return MessageUtil.success(enumToObject(MeetingStageStatusEnum));
    case 'meetingstagestypes':
      return MessageUtil.success(enumToObject(MeetingStageTypeEnum));
    case 'meetingstatus':
      return MessageUtil.success(enumToObject(MeetingStatusEnum));
    case 'scheduledtimeslotstatus':
      return MessageUtil.success(enumToObject(ScheduledTimeSlotStatusEnum));
    case 'userprivilages':
      return MessageUtil.success(enumToObject(UserPrivilegeEnum));
    case 'userstatus':
      return MessageUtil.success(enumToObject(UserStatusEnum));
    case 'vendoraccountlevel':
      return MessageUtil.success(enumToObject(VendorAccountLevelEnum));
    default:
      return MessageUtil.error(404, 'Dropdown not found');
  }
}

export async function postMeDashboardSearchHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}

export async function getMeGuiSettingsHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  const result = await GuiSettingService.getByUserId(authenticatedUserId);
  return MessageUtil.success(result);
}

// --------------- *Statistics dashboard* ---------------

export async function getMeStatisticsDashboardsHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}

// --------------- *Notifications* ---------------

/**
 * returns a list of the last 100 notifications that their timestamp is not in the future.
 * sorted from newest to oldest.
 */
export async function getMeNotificationsHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  const notifications = await NotificationService.getHundredRecentNotifications(authenticatedUserId);
  return MessageUtil.success(notifications);
}

export async function getMeNotificationByIdHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  const notificationId = event.pathParameters.notificationId;

  if (!isUUID(notificationId, '4')) {
    return MessageUtil.error(400, 'Invalid notificationId');
  }

  const result = await NotificationService.getById(authenticatedUserId, notificationId);
  return MessageUtil.success(result);
}

export async function deleteMeNotificationsNotificationIdHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  const notificationId = event.pathParameters.notificationId;

  if (!isUUID(notificationId, '4')) {
    return MessageUtil.error(400, 'Invalid notificationId');
  }

  const result = await NotificationService.deleteById(authenticatedUserId, notificationId);
  return MessageUtil.success(result);
}

export async function getMeNotificationsByIdMarkAsReadHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  const notificationId = event.pathParameters.notificationId;

  if (!isUUID(notificationId, '4')) {
    return MessageUtil.error(400, 'Invalid notificationId');
  }

  const notification = await NotificationService.markAsRead(authenticatedUserId, notificationId);
  return MessageUtil.success(notification);
}
