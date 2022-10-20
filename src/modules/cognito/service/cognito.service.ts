import { env } from '@shared/config/config';
import { cognitoIdentityServiceProvider } from '@shared/config/aws.sdk.config';

import { LinkService } from '@modules/magicLink/service/link.service';
import { AuthenticatedUserService } from '@modules/authenticatedUser/service/authenticatedUser.service';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import {
  CreateUserRespondType,
  IsUserExistRespondType,
  LoginPasswordlessRespondType,
  RefreshTokenRespondType,
} from '@modules/cognito/types';

export class CognitoService {
  /**
   * takes in a valid refresh token and returns new tokens
   * */
  static async refreshToken(refreshToken): Promise<RefreshTokenRespondType> {
    const params = {
      ClientId: env.CLIENT_ID /* required */,
      AuthFlow: 'REFRESH_TOKEN_AUTH' /* required */,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken /* required */,
      },
    };

    const refreshResult: CognitoIdentityServiceProvider.Types.InitiateAuthResponse = await new Promise(
      (resolve, reject) => {
        cognitoIdentityServiceProvider.initiateAuth(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      },
    );

    return {
      AccessToken: refreshResult.AuthenticationResult.AccessToken,
      IdToken: refreshResult.AuthenticationResult.IdToken,
    };
  }

  /**
   * Validate is user exist
   * @return 1 if user exist | 0 if user not exits | throw err in case of errors
   * */
  static async isUserExist(email): Promise<IsUserExistRespondType> {
    const params = {
      UserPoolId: env.USER_POOL_ID /* required */,
      Username: email /* required */,
    };

    try {
      await new Promise((resolve, reject) => {
        cognitoIdentityServiceProvider.adminGetUser(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
      return { isUserExist: true };
    } catch (e) {
      if (e.message === 'User does not exist.') {
        return { isUserExist: false };
      } else {
        throw new Error(e);
      }
    }
  }

  /**
   * Creates user in Cognito user pool by email and password
   * @return {
   *   email,
   *   password
   * }
   */
  static async createUser(email, password): Promise<CreateUserRespondType> {
    const params = {
      ClientId: '4mqv26k164pfrfo2c6694sbkde' /* required */,
      Password: password /* required */,
      Username: email /* required */,
      UserAttributes: [
        {
          Name: 'email' /* required */,
          Value: email,
        },
      ],
      ValidationData: [
        {
          Name: 'email' /* required */,
          Value: email,
        },
      ],
    };

    const signUpResult: CognitoIdentityServiceProvider.Types.SignUpResponse = await new Promise((resolve, reject) => {
      cognitoIdentityServiceProvider.signUp(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    return {
      UserSub: signUpResult.UserSub,
      email,
      password,
    };
  }

  static async loginPasswordless(linkId): Promise<LoginPasswordlessRespondType> {
    // here we get the destination and the email,
    // the validation of the link happens in verifyAuthChallengeResponse
    const link = await LinkService.getById(linkId);

    const email = link.getDataValue('email');
    const destination = link.getDataValue('destination');

    // set User status to confirmed when he uses link
    await AuthenticatedUserService.setUserStatusToConfirmed(email);

    const initiateAuthParams = {
      AuthFlow: 'CUSTOM_AUTH',
      ClientId: env.CLIENT_ID,

      AuthParameters: {
        USERNAME: email,
      },
    };

    const initiateAuthResponse: CognitoIdentityServiceProvider.Types.InitiateAuthResponse = await new Promise(
      (resolve, reject) => {
        cognitoIdentityServiceProvider.initiateAuth(initiateAuthParams, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      },
    );

    const respondToAuthChallengeParams = {
      ChallengeName: 'CUSTOM_CHALLENGE',
      ClientId: env.CLIENT_ID,
      ChallengeResponses: {
        USERNAME: initiateAuthResponse.ChallengeParameters.email,
        ANSWER: linkId, // this field is required but not used
      },
      Session: initiateAuthResponse.Session,
    };

    const respondToAuthChallengeResponse: CognitoIdentityServiceProvider.Types.RespondToAuthChallengeResponse =
      await new Promise((resolve, reject) => {
        cognitoIdentityServiceProvider.respondToAuthChallenge(respondToAuthChallengeParams, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

    const authenticationResult = respondToAuthChallengeResponse.AuthenticationResult;
    if (!authenticationResult) {
      throw new Error('Link invalid');
    }

    return {
      authenticationResult: {
        accessToken: authenticationResult.AccessToken,
        refreshToken: authenticationResult.RefreshToken,
        idToken: authenticationResult.IdToken,
        tokenType: authenticationResult.TokenType,
      },
      destination,
    };
  }
}
