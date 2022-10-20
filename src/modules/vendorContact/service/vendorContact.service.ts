import { VendorContact } from '@shared/models';

export class VendorContactService {
  static async create(data): Promise<VendorContact> {
    return await VendorContact.create(data);
  }

  static async getById(vendorContactId): Promise<VendorContact> {
    return await VendorContact.findOne({ where: { vendorContactId } });
  }
}
