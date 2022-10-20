import { AccountContactService } from '../../service/accountContact.service';

export default async function createAccountContact(data) {
  return await AccountContactService.create(data);
}
