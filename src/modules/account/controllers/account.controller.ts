import { loadSequelize } from '@shared/sequelize/sequelize';
import { MessageUtil } from '@shared/utils';
import { AccountService } from '@modules/account/service/account.service';

import { SearchAccountContactOptionsType } from '@modules/account/types';
import { LinkService } from '@modules/magicLink/service/link.service';
import { AuthenticatedUserService } from '@modules/authenticatedUser/service/authenticatedUser.service';

import validator from 'validator';
import isUUID = validator.isUUID;

import { inviteReferenceRequestSchema } from '@modules/account/stateMachines/inviteReference/validationsSchemas';
import { createProspectRequestSchema } from '@modules/account/validationSchemas';
import { EmailService } from '@modules/email/service/email.service';
import isEmail = validator.isEmail;
import { AccountContactService } from '@modules/accountContact/service/accountContact.service';

export async function inviteReferenceHandler(event) {
  await loadSequelize();
  const body = JSON.parse(event.body);

  const validateResult = inviteReferenceRequestSchema.validate(body);
  if (validateResult.error) {
    throw new Error(validateResult.error.message);
  }

  const authenticatedUserId = event?.requestContext?.authorizer?.authenticatedUserId;
  if (!authenticatedUserId) {
    throw new Error('Cannot parse authenticatedUserId');
  }

  const vendorContactId = event?.requestContext?.authorizer?.vendorContactId;
  const vendorId = event?.requestContext?.authorizer?.vendorId;
  if (!vendorId || !vendorContactId) {
    throw new Error('User must be Vendor');
  }

  const isUserAvailable = await AuthenticatedUserService.isAvailableForVendor(vendorId, body.authenticatedUser.email);

  if (isUserAvailable.isAvailable === false) {
    throw new Error(isUserAvailable.cause);
  }

  try {
    await AccountService.createReference({
      ...body,
      vendorId,
      vendorContactId,
    });

    return {
      email: body.authenticatedUser.email,
      magicLink: await LinkService.generateLink(body.authenticatedUser.email, '/dashboard'),
      emailBody: body.emailBody,
    };
  } catch (e) {
    throw new Error(e.message);
  }
}

export async function inviteProspectPreValidationHandler(event) {
  await loadSequelize();

  const body = JSON.parse(event.body);
  const email = body.email;

  if (!email || !isEmail(email)) {
    return MessageUtil.error(400, `"email" is required and must be valid email"`);
  }

  const vendorId = event?.requestContext?.authorizer?.vendorId;
  if (!vendorId) {
    throw new Error('User must be Vendor');
  }

  try {
    const isUserAvailableForVendor = await AuthenticatedUserService.isAvailableForVendor(vendorId, email);
    return MessageUtil.success({ isAvailable: isUserAvailableForVendor.isAvailable });
  } catch (e) {
    return MessageUtil.error(500, e);
  }
}

export async function inviteProspectHandler(event) {
  await loadSequelize();
  const body = JSON.parse(event.body);

  const validateResult = createProspectRequestSchema.validate(body);
  if (validateResult.error) {
    return MessageUtil.error(400, validateResult.error.message);
  }

  const authorizerContext = event.requestContext.authorizer;
  const { vendorId, vendorContactId, authenticatedUserId } = authorizerContext;

  if (!authenticatedUserId) {
    return MessageUtil.error(400, 'Cannot parse authenticatedUserId');
  } else if (!vendorId || !vendorContactId) {
    return MessageUtil.error(400, 'User must be Vendor');
  }

  const isUserAvailable = await AuthenticatedUserService.isAvailableForVendor(vendorId, body.authenticatedUser.email);

  if (!isUserAvailable.isAvailable) {
    return MessageUtil.error(400, isUserAvailable.cause);
  }

  try {
    const account = await AccountService.createProspect({ ...body, vendorId, vendorContactId });
    const vendorContactEmail = await AuthenticatedUserService.getMe(authenticatedUserId);

    const referencesIds = account.opportunities[0].recommendedReferences.map((el) => el.referenceId);

    const references = await Promise.all(
      referencesIds.map(async (referenceId) => {
        return AccountContactService.getById(referenceId);
      }),
    );

    const referencesEmailData = references.map((accountContact) => {
      const authenticatedUser = accountContact.authenticatedUser;
      return {
        fullName: `${authenticatedUser.firstName} ${authenticatedUser.lastName}`,
        avatar: authenticatedUser.avatar.url,
        title: accountContact.title,
      };
    });

    const magicLink = await LinkService.generateLink(body.authenticatedUser.email, '/dashboard');

    await EmailService.sendProspectInvitationEmail(
      body.authenticatedUser.email,
      vendorContactEmail.email,
      body.emailBody,
      referencesEmailData,
      magicLink,
    );
    return MessageUtil.success({ success: true });
  } catch (e) {
    return MessageUtil.error(500, e.message);
  }
}

export async function getAccountsHandler(event) {
  await loadSequelize();
  const vendorId = event.requestContext?.authorizer?.vendorId; // using Lambda proxy Integration

  if (!vendorId) {
    return MessageUtil.error(404, 'User is not a Vendor');
  }

  const accounts = await AccountService.getAllByVendorId(vendorId);
  return MessageUtil.success(accounts);
}

export async function getAccountContactsByIdHandler(event) {
  await loadSequelize();
  const accountId = event?.pathParameters?.accountId;

  if (!accountId || !isUUID(accountId)) {
    return MessageUtil.error(400, 'AccountId must be uuid');
  }

  const accountContacts = await AccountService.getAccountContacts(accountId);
  return MessageUtil.success(accountContacts);
}

export async function postAccountContactsByIdSearchHandler(event) {
  await loadSequelize();

  const accountId = event?.pathParameters?.accountId;
  if (!accountId || !isUUID(accountId)) {
    return MessageUtil.error(400, 'AccountId must be uuid');
  }

  const body = JSON.parse(event.body);
  const searchOptions: SearchAccountContactOptionsType = {
    title: body?.title,
    publicNote: body?.publicNote,
    selectedReviewQuote: body?.selectedReviewQuote,
    often: body?.often,
  };

  const accountContacts = await AccountService.getAccountContactsSearch(accountId, searchOptions);
  return MessageUtil.success(accountContacts);
}
