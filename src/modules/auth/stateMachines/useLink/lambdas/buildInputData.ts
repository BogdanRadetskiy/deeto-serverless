import { MessageUtil } from '@shared/utils/message';
import { useLinkRequestSchema } from '../validationSchemas';

export async function buildInputData(event) {
  const body = JSON.parse(event.body);

  const validateResult = useLinkRequestSchema.validate(body);

  if (validateResult.error) {
    throw new Error('' + validateResult.error);
  }
  event.body = validateResult.value;

  return MessageUtil.forward(event, {});
}
