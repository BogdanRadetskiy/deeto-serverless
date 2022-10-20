import { loadSequelize } from '@shared/sequelize/sequelize';
import { MessageUtil } from '@shared/utils/message';
import { VendorContactService } from '@modules/vendorContact/service/vendorContact.service';

export async function createVendorContactHandler(event) {
  await loadSequelize();

  const vendorId = event.pathParameters.vendorId;
  const data = {
    vendorId: vendorId,
  };

  const result = await VendorContactService.create(data);
  return MessageUtil.success(result);
}

export async function getVendorContactByIdHandler(event) {
  await loadSequelize();

  const vendorContactId = event.pathParameters.contactId;
  const result = await VendorContactService.getById(vendorContactId);
  return MessageUtil.success(result);
}
export async function getVendorcontactsHandler(event) {
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
export async function getVendorcontactsVendorcontactIdHandler(event) {
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
export async function patchVendorcontactsVendorcontactIdHandler(event) {
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
export async function deleteVendorcontactsVendorcontactIdHandler(event) {
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
export async function patchVendorcontactsVendorcontactIdActivateHandler(event) {
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
