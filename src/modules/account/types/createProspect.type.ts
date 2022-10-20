export type AuthenticatedUserType = {
  email: string;
  firstName: string;
  lastName: string;
};

export type AccountWithContactType = {
  companyName: string;
  companySize: string;
  linkedInProfile: string;
  industry: string;
  title?: string;
  avatarURL?: string;
};

export type SelectedReferenceType = {
  referenceId: string;
  personalEmailQuote: string;
};

export type CreateProspectType = {
  authenticatedUser: AuthenticatedUserType;
  accountWithContact: AccountWithContactType;
  selectedReferences: [SelectedReferenceType];

  vendorId?: string;
  vendorContactId?: string;
};
