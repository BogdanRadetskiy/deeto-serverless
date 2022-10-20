import { env } from '@shared/config/config';

export default function buildLink(linkId): string {
  return `${env.CLIENT_ADDR}?l=${linkId}`;
}
