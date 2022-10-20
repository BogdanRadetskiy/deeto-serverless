import * as _AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import nodeFetch from 'node-fetch';
global.fetch = nodeFetch;

import { env } from './config';

const poolData = {
  UserPoolId: env.USER_POOL_ID,
  ClientId: env.CLIENT_ID,
};

export const userPoolConfig = new _AmazonCognitoIdentity.CognitoUserPool(poolData);
export const AmazonCognitoIdentity = _AmazonCognitoIdentity;
