import { MessageUtil } from '@shared/utils/message';

export async function buildOutputData() {
  return MessageUtil.success({ success: true });
}
