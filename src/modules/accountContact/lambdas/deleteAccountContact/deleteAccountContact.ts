import { AccountContactService } from '../../service/accountContact.service';

export default async function deleteAccountContact(id: string) {
  return await AccountContactService.delete(id);
}
