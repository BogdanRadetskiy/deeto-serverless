import { env } from '@shared/config/config';
import confirmationEmailTemplate from '../templates/confirmationEmail.template';
import { prospectInvitationEmailTemplate, referenceInvitationEmailTemplate } from '@modules/email/templates';

import sgMail from '@sendgrid/mail';
sgMail.setApiKey(env.SENDGRID_API_KEY);

export class EmailService {
  static async sendProspectInvitationEmail(to, from, emailBody, referencesEmailData, magicLink) {
    const HTML = prospectInvitationEmailTemplate(emailBody, referencesEmailData, magicLink);
    return await this.sendEmail(to, from, 'Confirmation Email', 'Confirmation Email', HTML);
  }

  static async sendReferenceInvitationEmail(to, from, link, emailBody) {
    const HTML = referenceInvitationEmailTemplate(link, emailBody);
    await this.sendEmail(to, from, 'Confirmation Email', 'Confirmation Email', HTML);
    return HTML;
  }

  static async sendConfirmationEmail(to, from, link, browserDetails) {
    const HTML = confirmationEmailTemplate(link, to, browserDetails);
    return await this.sendEmail(to, from, 'Confirmation Email', 'Confirmation Email', HTML);
  }

  static async sendEmail(to, from, subject, text, html) {
    if (!from) {
      from = env.SENDGRID_FROM;
    }
    if (!to || !from || !subject || !text || !html) {
      throw new Error('sendEmail: Invalid arguments');
    }

    const message = { to, from, subject, text, html };
    return await sgMail.send(message);
  }
}
