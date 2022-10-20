import { Handler } from 'aws-lambda';

import createAccountContact from './createAccountContact';
import { MessageUtil } from '@shared/utils';

export const createAccountContactHandler: Handler = async (event) => {
  const body = event.body;

  const data = {
    accountId: body.accountId,
  };

  const result = await createAccountContact(data);

  return MessageUtil.success(result);
};
