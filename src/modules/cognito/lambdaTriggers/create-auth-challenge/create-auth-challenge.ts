export const createAuthChallenge = async (event) => {
  event.response.publicChallengeParameters = { email: event.request.userAttributes.email };
  return event;
};
