import { CognitoService } from '@modules/cognito/service/cognito.service';
import generatePassword from 'generate-password';
import { MessageUtil } from '@shared/utils/message';
import { loadSequelize } from '@shared/sequelize/sequelize';

/**
 *  takes in a valid refresh token and returns new tokens
 * */
export async function refreshTokenHandler(event) {
  const body = JSON.parse(event.body);
  const refreshToken = body.refreshToken;

  if (!refreshToken) {
    return MessageUtil.error(400, 'Missing refreshToken');
  }

  try {
    const result = await CognitoService.refreshToken(refreshToken);
    return MessageUtil.success(result);
  } catch (e) {
    return MessageUtil.error(e.code, e.message);
  }
}

/**
 * is user exist in Cognito user pool
 */
export async function isUserExistHandler(event) {
  const body = event.body;

  const email = body.email;
  if (!email) {
    throw new Error('Email required');
  }

  const result = await CognitoService.isUserExist(email);
  return MessageUtil.forward(event, result);
}

/**
 * Creates user in Cognito user pool by email
 */
export async function createUserHandler(event) {
  const body = event.body;

  const email = body.email;
  if (!email) {
    throw new Error('Email required');
  }

  const password = generatePassword.generate({
    length: 15,
    numbers: true,
    uppercase: true,
  });
  const result = await CognitoService.createUser(email, password);

  return MessageUtil.forward(event, { cognitoUserId: result.UserSub });
}

/**
 * login passwordless in Cognito
 */
export async function loginPasswordlessHandler(event) {
  await loadSequelize();

  const body = event.body;
  const linkId = body?.linkId || body?.statePack?.linkId;
  const result = await CognitoService.loginPasswordless(linkId);
  return MessageUtil.forward(event, result);
}
