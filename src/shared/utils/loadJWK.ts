import fetch from 'node-fetch';
import { JwkLoadType } from '@shared/utils/types/jwk.type';

// TODO move to AWS security manager
// https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html
export async function loadJWK(region, poolId): Promise<JwkLoadType> {
  if (!region) {
    throw new Error('Region cannot be empty');
  }
  if (!poolId) {
    throw new Error('UserPoolId cannot be empty');
  }

  const addr = `https://cognito-idp.${region}.amazonaws.com/${poolId}/.well-known/jwks.json`;
  const response = await fetch(addr, { method: 'GET' });
  return (await response.json()) as JwkLoadType;
}
