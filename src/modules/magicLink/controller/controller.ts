import { loadSequelize } from '@shared/sequelize/sequelize';
import { MessageUtil } from '@shared/utils/message';
import { LinkService } from '@modules/magicLink/service/link.service';
import buildLink from '@modules/magicLink/helpers/buildLink';

export async function generateLinkHandler(event) {
  await loadSequelize();

  const body = event.body;
  const email = body.email;
  const destination = body.destination || body.statePack.destination || '/'; // dest by default to root front route

  if (!email) {
    throw new Error('Email required');
  }

  const link = await LinkService.create(email, destination);
  const linkId = link.getDataValue('id');
  const wrappedLink = buildLink(linkId);
  return MessageUtil.forward(event, { magicLink: wrappedLink });
}
