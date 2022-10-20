import { Handler } from 'aws-lambda';

import { createAuthChallenge } from './create-auth-challenge/create-auth-challenge';
import { defineAuthChallenge } from './define-auth-challenge/define-auth-challenge';
import { verifyAuthChallengeResponse } from './verify-auth-challenge-response/verify-auth-challenge-response';
import { preSignUpTrigger } from './pre-sign-up/pre-sign-up';
import { authorizer } from './authorizer/authorizer';
import { loadSequelize } from '@shared/sequelize/sequelize';

export const authorizerHandler: Handler = async (event, context, callback) => {
  loadSequelize();
  return await authorizer(event, context, callback);
};

export const createAuthChallengeHandler: Handler = (event: any) => {
  return createAuthChallenge(event);
};

export const defineAuthChallengeHandler: Handler = (event: any) => {
  return defineAuthChallenge(event);
};

export const verifyAuthChallengeResponseHandler: Handler = (event: any) => {
  return verifyAuthChallengeResponse(event);
};

export const preSignUpTriggerHandler: Handler = (event: any) => {
  return preSignUpTrigger(event);
};
