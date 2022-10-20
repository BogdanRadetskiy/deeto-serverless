export type CreateMeetingType = {
  opportunityId: string;
  referenceContactId: string;
  prospectContactId: string;
  initiatorId: string;
  referenceAccountId: string;
  zoomMeetingStartTime?: string;
  zoomMeetingJoinUrl?: string;
  zoomMeetingUUID?: string;
  zoomMeetingId?: number;
};
