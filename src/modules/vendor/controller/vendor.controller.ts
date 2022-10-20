import { loadSequelize } from '@shared/sequelize/sequelize';
import { MessageUtil } from '@shared/utils';
import { VendorService } from '@modules/vendor/service/vendor.service';
import { calculateRecommendedReferencesRequestSchema } from '@modules/vendor/validationSchemas';

export async function getAccountContactsHandler(event) {
  await loadSequelize();
  const body = event.body;

  const vendorId = body.vendorId || body?.statePack?.vendorId;

  const result = await VendorService.getAccountContacts(vendorId);

  return MessageUtil.forward(event, { vendorAccountContacts: result });
}

// references - all AccountContacts without opportunity
export async function getReferencesHandler(event) {
  await loadSequelize();

  const vendorId = event?.requestContext?.authorizer?.vendorId;
  if (!vendorId) {
    throw new Error('User must be Vendor');
  }

  const references = await VendorService.getReferences(vendorId);

  return MessageUtil.success(references);
}

export async function calculateRecommendedReferencesHandler(event) {
  await loadSequelize();
  const body = JSON.parse(event.body);

  const validateResult = calculateRecommendedReferencesRequestSchema.validate(body);
  if (validateResult.error) {
    return MessageUtil.error(400, validateResult.error.message);
  }

  const vendorId = event?.requestContext?.authorizer?.vendorId;
  if (!vendorId) {
    throw new Error('User must be Vendor');
  }

  // for now, we don't need any data to return recommendedReferences
  const result = await VendorService.calculateRecommendedReferences(vendorId, 3);

  if (!result) {
    return MessageUtil.error(400, 'Vendor must have at least one reference');
  }

  return MessageUtil.success(result);
}

export async function grantVendorHandler(event) {
  await loadSequelize();
  const body = event.body;

  const authenticatedUserId = event?.requestContext?.authorizer?.authenticatedUserId;
  const vendorName = body.vendorName;

  const result = await VendorService.grantVendor(authenticatedUserId, vendorName);

  return MessageUtil.forward(event, { result });
}

export async function getByIdHandler(event) {
  await loadSequelize();

  const vendorId = event.pathParameters.vendorId;

  const params = {
    includeAvatar: !!event?.queryStringParameters?.includeAvatar || false,
  };

  const result = await VendorService.getById(vendorId, params);

  return MessageUtil.success(result);
}

export async function getVendorsVendorIdContactsHandler(event) {
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

export async function postVendorsVendorIdContactsHandler(event) {
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

export async function getVendorsHandler(event) {
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

export async function postVendorsHandler(event) {
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

export async function getVendorsVendorIdHandler(event) {
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

export async function patchVendorsVendorIdHandler(event) {
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

export async function deleteVendorsVendorIdHandler(event) {
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

export async function patchVendorsVendorIdActivateHandler(event) {
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

export async function getVendorsVendorIdMeetingcreditHandler(event) {
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
