import { MessageUtil } from '@shared/utils';

export async function grantVendorBuildInputData(event) {
  const body = JSON.parse(event.body);

  // TODO validate data

  event.body = body;

  return MessageUtil.forward(event, {});
}
