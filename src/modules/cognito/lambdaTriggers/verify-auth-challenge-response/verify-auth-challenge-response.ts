import { LinkService } from '../../../magicLink/service/link.service';
import { loadSequelize } from '@shared/sequelize/sequelize';

const TWENTY_MINUTES = 20 * 60000;

export const verifyAuthChallengeResponse = async (event) => {
  await loadSequelize();

  let isAnswerCorrect = true;
  const uuid = event.request.challengeAnswer;

  const link = await LinkService.getById(uuid);
  if (!link) {
    isAnswerCorrect = false;
  }

  const createdAt = link.getDataValue('createdAt').getTime();
  if (createdAt + TWENTY_MINUTES < Date.now()) {
    isAnswerCorrect = false;
  }

  const isValid: boolean = link.getDataValue('isValid');
  if (!isValid) {
    isAnswerCorrect = false;
  }
  // set link to invalid after one use
  await LinkService.invalidateLink(link);

  event.response.answerCorrect = isAnswerCorrect;
  return event;
};
