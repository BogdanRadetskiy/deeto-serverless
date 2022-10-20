import { MessageUtil } from '@shared/utils/message';

export async function buildOutputData(event) {
  const body = event.body;
  const result = body.statePack;
  return MessageUtil.success(result);
}
