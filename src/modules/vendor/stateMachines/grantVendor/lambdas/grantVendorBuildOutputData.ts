import { MessageUtil } from '@shared/utils/message';

export async function grantVendorBuildOutputData(event) {
  const body = event.body;
  return MessageUtil.success({ result: body.statePack });
}
