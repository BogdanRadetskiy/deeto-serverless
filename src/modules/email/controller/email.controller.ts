import { EmailService } from '@modules/email/service/email.service';
import { MessageUtil } from '@shared/utils';

export async function sendConfirmationEmailHandler(event) {
  const body = event.body;

  const to = body.email;
  const link = body.magicLink || body.statePack.magicLink;
  const browserDetails = body.statePack.browserDetails;

  return await EmailService.sendConfirmationEmail(to, null, link, browserDetails);
}

export async function sendReferenceInvitationEmailHandler(event) {
  const body = event;

  const to = body.email;
  const link = body.magicLink;
  const emailBody = body.emailBody;

  const emailSentResult = await EmailService.sendReferenceInvitationEmail(to, null, link, emailBody);

  return await MessageUtil.success({ emailHTML: emailSentResult });
}
