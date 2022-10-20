import { MessageUtil } from '@shared/utils/message';
import { registerPasswordlessRequestSchema } from '../validationShemas';
import { parseUserAgent, buildDateNow } from '@shared/utils';
import { buildBrowserDetails } from '@shared/utils/buildBrowserDetails';

export async function buildInputData(event) {
  const body = JSON.parse(event.body);

  // validate body
  const validateResult = registerPasswordlessRequestSchema.validate(body);
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
    destination: '/register',
  };

  return MessageUtil.forward(event, statePack);
}
