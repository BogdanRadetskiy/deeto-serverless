import { GuiSettings } from '@shared/models';

export class GuiSettingService {
  static async create(data): Promise<GuiSettings> {
    return GuiSettings.create(data);
  }

  static async getByUserId(authenticatedUserId: string): Promise<GuiSettings> {
    return GuiSettings.findOne({ where: { authenticatedUserId } });
  }
}
