type authenticationResult = {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  tokenType: string;
};

export type LoginPasswordlessRespondType = {
  authenticationResult: authenticationResult;
  destination: string;
};
