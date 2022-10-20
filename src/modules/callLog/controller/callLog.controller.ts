import { loadSequelize } from '@shared/sequelize/sequelize';
import { MessageUtil } from '@shared/utils/message';
import { AuthenticatedUserService } from '@modules/authenticatedUser/service/authenticatedUser.service';
import { CallLogService } from '@modules/callLog/service/callLog.service';

export async function getCalllogCalllogIdHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  // Todo- check that authenticated user is allowed to perfom this action (association to meeting)
  const AuthenticatedUserObject = await AuthenticatedUserService.getById(authenticatedUserId);

  // query string params:
  const callLogID = event.pathParameters.callLogID;

  const callLogDetails = await CallLogService.getById(callLogID);
  return MessageUtil.success(callLogDetails);
}
export async function patchCalllogCalllogIdHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  // Todo- check that authenticated user is allowed to perfom this action (association to meeting)
  const AuthenticatedUserObject = await AuthenticatedUserService.getById(authenticatedUserId);

  // query string params:
  const callLogID = event.pathParameters.callLogID;

  // body info
  const body = JSON.parse(event.body);

  const result = await CallLogService.update(callLogID, body);
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function deleteCalllogCalllogIdHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration
  // Todo- check that authenticated user is allowed to perfom this action (association to meeting)
  const AuthenticatedUserObject = await AuthenticatedUserService.getById(authenticatedUserId);

  // query string params:
  const callLogID = event.pathParameters.callLogID;

  try {
    const result = await CallLogService.delete(callLogID);

    if (result == 0) {
      return MessageUtil.error(400, 'No object found');
    }
    return MessageUtil.success({ deleted: result });
  } catch (error) {
    throw MessageUtil.error(400, 'No object found');
  }
}
