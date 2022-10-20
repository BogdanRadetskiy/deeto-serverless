import { loadSequelize } from '@shared/sequelize/sequelize';
import { addDays, addHours } from '@shared/utils';
import { MessageUtil } from '@shared/utils/message';

export async function getScheduledtimeslotsScheduledtimeslotIdHandler(event) {
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
export async function patchScheduledtimeslotsScheduledtimeslotIdHandler(event) {
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
export async function deleteScheduledtimeslotsScheduledtimeslotIdHandler(event) {
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
export async function postScheduledtimeslotsBlackoutdatesHandler(event) {
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
export async function getScheduledtimeslotsBlackoutdatesFromdateTodateHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  const fromDateInput = event.pathParameters.fromDate.toLowerCase();
  const toDateInput = event.pathParameters.toDate.toLowerCase();

  const fromDate = new Date(fromDateInput);
  const toDate = new Date(toDateInput);

  const startHour = 9;
  const endHour = 17;

  const outputBlackDays = [];
  const blackoutHours = [];
  const blackoutRanges = [];

  let loop = new Date(fromDate);
  while (loop <= toDate) {
    // blackout weekends
    if (loop.getDay() === 0 || loop.getDay() === 5) {
      outputBlackDays.push(loop);
      blackoutRanges.push({
        rangeStart: loop,
        RangeEnd: addDays(loop, 1),
      });
    } else {
      // blackout hours (working hours)
      blackoutRanges.push({
        rangeStart: loop,
        RangeEnd: addHours(loop, startHour),
      });
      blackoutRanges.push({
        rangeStart: addHours(loop, endHour),
        RangeEnd: addHours(loop, 24),
      });

      for (let i = 0; i < startHour; i++) {
        const newLoopDate = addHours(loop, i);
        blackoutHours.push(newLoopDate);
      }
      for (let i = endHour; i < 24; i++) {
        const newLoopDate = addHours(loop, i);
        blackoutHours.push(newLoopDate);
      }
    }

    const newDate = addDays(loop, 1);
    loop = new Date(newDate);
  }

  const result = {
    outputBlackDays: outputBlackDays,
    blackoutHours: blackoutHours,
    blackoutRanges: blackoutRanges,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}

export async function patchScheduledtimeslotsScheduledtimeslotIdMarkasacceptedHandler(event) {
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
