import { MessageUtil } from '@shared/utils/message';
import { OpportunityService } from '@modules/opportunity/service/opportunity.service';
import { loadSequelize } from '@shared/sequelize/sequelize';
import { CreateOpportunityType } from '@modules/opportunity/types';

export async function createOpportunityHandler(event) {
  await loadSequelize();

  const body = event.body;
  const data: CreateOpportunityType = {
    accountContactId: body.accountContactId || body?.statePack?.account?.accountContacts[0]?.accountContactId,
    accountId: body.accountId || body?.statePack?.account?.accountId,
    ownerId: body.vendorId || body?.statePack?.vendorId,
    description: body.description,
    dollarValue: body.dollarValue,
  };

  const opportunity = await OpportunityService.createWithRecommendedReferences(data);

  return MessageUtil.forward(event, { opportunity });
}

export async function deleteOpportunityHandler(event) {
  await loadSequelize();

  const body = event.body;
  const id = body.id;
  const result = await OpportunityService.delete(id);
  return MessageUtil.success({ delete: result });
}

export async function getOpportunityByIdHandler(event) {
  await loadSequelize();

  const id = event.queryStringParameters.id;
  const result = await OpportunityService.getById(id);
  return MessageUtil.success(result);
}

export async function updateOpportunityHandler(event) {
  await loadSequelize();

  const body = event.body;
  const data = {
    id: body.id,
    description: body.description,
    dollarValue: body.dollarValue,
  };

  const result = await OpportunityService.update(data);
  return MessageUtil.success(result);
}

export async function getOpportunitiesHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function postOpportunitiesHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function getOpportunitiesOpportunityIdHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function patchOpportunitiesOpportunityIdHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function deleteOpportunitiesOpportunityIdHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function patchOpportunitiesCreatewithprospectHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function postOpportunitiesCreatewithprospectHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function getOpportunitiesOpportunityIdRecommendedreferencesHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function patchOpportunitiesOpportunityIdRecommendedreferencesHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  // step 3.1 - assign also opprotonities that did not turn into a meeting. todo - maybe all recommended references turns into a meeting? !!!

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function getOpportunitiesOpportunityIdSelectedreferencesHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function getOpportunitiesOpportunityIdEmailactivityHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function postOpportunitiesOpportunityIdEmailactivityHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
export async function postOpportunitiesOpportunityIdMeetingsHandler(event) {
  await loadSequelize();

  const authenticatedUserId = event.requestContext?.authorizer?.authenticatedUserId; // using Lambda proxy Integration

  const result = {
    notImplemented: true,
  };
  if (result == null) {
    throw new Error('Error Body');
  }

  return MessageUtil.success(result);
}
