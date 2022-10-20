import { loadSequelize } from '@shared/sequelize/sequelize';
import { MessageUtil } from '@shared/utils/message';

export async function getEmailactivityHandler(event) {
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
export async function postEmailactivityHandler(event) {
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
export async function getEmailactivityEmailactivityIdHandler(event) {
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
export async function patchEmailactivityEmailactivityIdHandler(event) {
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
export async function deleteEmailactivityEmailactivityIdHandler(event) {
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
