import { SelectedReferenceType } from '@modules/account/types/createProspect.type';

export type CreateOpportunityWithSelectedReferencesType = {
  selectedReferences: [SelectedReferenceType];
  accountContactId: string;
  accountId: string;
  ownerId: string;
};
