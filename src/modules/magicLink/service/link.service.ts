import { MagicLink } from '@shared/models';
import buildLink from '@modules/magicLink/helpers/buildLink';

export class LinkService {
  static async create(email, destination): Promise<MagicLink> {
    return MagicLink.create({ email, destination });
  }

  static async generateLink(email, destination) {
    const link = await this.create(email, destination);
    const linkId = link.getDataValue('id');
    return buildLink(linkId);
  }

  static async invalidateLink(link: MagicLink) {
    link.isValid = false;
    return link.save();
  }

  static async getById(uuid: string): Promise<MagicLink> {
    return MagicLink.findOne({ where: { id: uuid } });
  }
}
