import { MessageUtil } from '@shared/utils/message';
import { loginPasswordlessRequestSchema } from '@modules/auth/stateMachines/loginPasswordless/validationSchemas';
import { buildBrowserDetails, buildDateNow, parseUserAgent } from '@shared/utils';

export async function buildInputData(event) {
  const body = JSON.parse(event.body);

  const validateResult = loginPasswordlessRequestSchema.validate(body);
  if (validateResult.error) {
    throw new Error('' + validateResult.error);
  }
  event.body = validateResult.value;

  // build statePack
  const userAgent = parseUserAgent(event.headers['User-Agent']);
  let browserDetails;
  try {
    browserDetails = buildBrowserDetails(userAgent.browser, userAgent.system, buildDateNow());
  } catch (e) {
    browserDetails = 'Unknown browser';
  }

  const statePack = {
    browserDetails: browserDetails,
    destination: '/login',
  };

  return MessageUtil.forward(event, statePack);
}
