import { loadSequelize } from '@shared/sequelize/sequelize';
import { MessageUtil } from '@shared/utils/message';
import { AuthenticatedUserService } from '../service/authenticatedUser.service';
import { CreateAuthenticatedUserType } from '@modules/authenticatedUser/types';

export async function createAuthenticatedUserWithCognitoHandler(event) {
  await loadSequelize();
  const body = event.body;

  const data: CreateAuthenticatedUserType = {
    username: body.username,
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    cognitoUserId: body.cognitoUserId || body?.statePack?.cognitoUserId,
  };

  const result = await AuthenticatedUserService.createWithCognito(data);

  return MessageUtil.forward(event, { authenticatedUser: result.get({ plain: true, clone: false }) });
}

export async function getGuiSettingsHandler(event) {
  await loadSequelize();

  const cognitoUserId = event.requestContext.authorizer.userId; // using Lambda proxy Integration
  const result = AuthenticatedUserService.getGuiSettings(cognitoUserId);
  return MessageUtil.success(result);
}

export async function getAuthenticatedUserHandler(event) {
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

export async function getAuthenticateduserAuthenticateduserIdHandler(event) {
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

export async function patchAuthenticateduserAuthenticateduserIdHandler(event) {
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

export async function patchAuthenticateduserAuthenticateduserIdChangeuserstatusUserstatusHandler(event) {
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

export async function getAuthenticateduserAuthenticateduserIdGuisettingsHandler(event) {
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

export async function patchAuthenticateduserAuthenticateduserIdGuisettingsHandler(event) {
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
