import { Avatar } from '@shared/models';

export class AvatarService {
  static async create(data): Promise<Avatar> {
    return Avatar.create(data);
  }
}
