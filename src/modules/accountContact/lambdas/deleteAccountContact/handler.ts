import { Handler } from 'aws-lambda';

import deleteAccountContact from './deleteAccountContact';
import { MessageUtil } from '../../../../shared/utils/message';

export const deleteAccountContactHandler: Handler = async (event) => {
  const body = JSON.parse(event.body);

  const id = body.id;

  const result = await deleteAccountContact(id);

  return MessageUtil.success({ delete: result });
};
