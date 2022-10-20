import { MessageUtil } from '@shared/utils/message';
import { loadSequelize } from '@shared/sequelize/sequelize';

import { MeetingService } from '@modules/meeting/service/meeting.service';
import { AuthenticatedUserService } from '@modules/authenticatedUser/service/authenticatedUser.service';
import { CallLogService } from '@modules/callLog/service/callLog.service';
import { AccountContactService } from '@modules/accountContact/service/accountContact.service';
import validator from 'validator';
import isUUID = validator.isUUID;

// create meeting | endpoint available for vendorContact
export async function createMeetingHandler(event) {
  await loadSequelize();
  const body = JSON.parse(event.body);

  const vendorContactId = event?.requestContext?.authorizer?.vendorContactId;
  if (!vendorContactId) {
    return MessageUtil.error(400, 'User must be vendorContact');
  }

  const data = {
    opportunityId: body.opportunityId,
    referenceContactId: body.referenceContactId,
    referenceAccountId: body.referenceAccountId,
    prospectContactId: body.prospectContactId,
    initiatorId: vendorContactId, // vendor id
  };

  try {
    const result = await MeetingService.createMeetingWithStage(data);
    return MessageUtil.success(result);
  } catch (e) {
    return MessageUtil.error(500, e);
  }
}

// TODO add authorization
export async function deleteMeetingHandler(event) {
  await loadSequelize();
  const body = JSON.parse(event.body);
  const id = body.id;

  if (!id) {
    throw new Error('Id required');
  }

  const result = await MeetingService.delete(id);

  return MessageUtil.success({ delete: result });
}

// TODO add authorization
export async function updateMeetingHandler(event) {
  await loadSequelize();
  const body = JSON.parse(event.body);

  const data = {
    id: body.id,
    description: body.description,
  };

  if (!data.id) {
    throw new Error('Id required');
  }

  const result = await MeetingService.update(data);

  return MessageUtil.success(result);
}

export async function postMeetingsSearchHandler(event) {
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

// TODO Q: For whom get/meeting is available ?
export async function getMeetingByIdHandler(event) {
  await loadSequelize();

  const meetingId = event?.pathParameters?.meetingId;
  if (!meetingId || !isUUID(meetingId)) {
    return MessageUtil.error(400, 'meetingId must be uuid');
  }

  const meeting = await MeetingService.getMeetingFullContext(meetingId);
  return MessageUtil.success(meeting);
}

// TODO add zoom api || Q: who can patch meeting ?
export async function patchMeetingsMeetingIdHandler(event) {
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

export async function getMeetingEmailActivityByIdHandler(event) {
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

export async function patchMeetingsMeetingIdEmailactivityHandler(event) {
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
export async function postMeetingsMeetingIdEmailactivityHandler(event) {
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
export async function deleteMeetingsMeetingIdEmailactivityHandler(event) {
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
export async function getMeetingsMeetingIdStagesHandler(event) {
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
export async function patchMeetingsMeetingIdStagesHandler(event) {
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
export async function postMeetingsMeetingIdStagesHandler(event) {
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
export async function getMeetingsMeetingIdStagesLabelHandler(event) {
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
export async function patchMeetingsMeetingIdStagesLabelHandler(event) {
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
export async function patchMeetingsMeetingIdCallstatisticsHandler(event) {
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
export async function patchMeetingsMeetingIdCallstatisticsCalculateHandler(event) {
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
export async function getMeetingsMeetingIdMeetingcreditHandler(event) {
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
export async function patchMeetingsMeetingIdMeetingcreditHandler(event) {
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
export async function postMeetingsMeetingIdMeetingcreditHandler(event) {
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
export async function deleteMeetingsMeetingIdMeetingcreditHandler(event) {
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
export async function getMeetingsMeetingIdCallstatisticsLogHandler(event) {
  await loadSequelize();

  const authenticatedUserId = '00000000-0000-0000-0000-000000060002'; // replace after debug -- event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  // Todo- check that authenticated user is allowed to perfom this action (association to meeting)
  const AuthenticatedUserObject = await AuthenticatedUserService.getById(authenticatedUserId);

  // query string params:
  const meetingID = event.pathParameters.meetingID;

  const result = await MeetingService.getCallStatisticsLogs(meetingID);

  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function postMeetingsMeetingIdCallstatisticsLogHandler(event) {
  // inserts a call log to a meeting
  await loadSequelize();
  // Authentication varification
  // tslint:disable-next-line: max-line-length
  const authenticatedUserId = '00000000-0000-0000-0000-000000060002'; // replace after debug -- event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  // Todo- check that authenticated user is allowed to perfom this action (association to meeting)
  const AuthenticatedUserObject = await AuthenticatedUserService.getById(authenticatedUserId);

  // query string params:
  const meetingID = event.pathParameters.meetingID;

  // body info
  const body = JSON.parse(event.body);

  // calculate values:
  const participant = await AccountContactService.getByAuthenticatedUser(AuthenticatedUserObject);
  const participantID = participant.accountContactId;
  const callStatisticsId = (await MeetingService.getCallStatistics(meetingID)).callStatisticsId;

  // insert object of call log
  let objectStructure = {
    meetingId: meetingID,
    participantId: participantID,
    callStatisticsId: callStatisticsId,
    event: body.event,
    timestamp: !body.timestamp || body.timestamp === '' ? new Date() : body.timestamp,
    channel: body.channel,
  };

  // todo - normalize dates.
  // todo - caculate Call Statitsics

  const callLog = await CallLogService.create(objectStructure);
  return MessageUtil.success(callLog);
}
export async function patchMeetingsMeetingIdFoucestatusStatusHandler(event) {
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
export async function getMeetingsMeetingIdFeedbackHandler(event) {
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
export async function patchMeetingsMeetingIdFeedbackHandler(event) {
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
export async function postMeetingsMeetingIdFeedbackHandler(event) {
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
export async function getMeetingsMeetingIdScheduledtimeslotsHandler(event) {
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
export async function postMeetingsMeetingIdScheduledtimeslotsHandler(event) {
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
