export const preSignUpTrigger = async (event) => {
  event.response.autoConfirmUser = true;
  return event;
};
