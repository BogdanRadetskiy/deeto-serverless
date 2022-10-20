import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { Notification } from '@shared/models/notification.model';
import {
  NotificationAccountContact,
  Account,
  AuthenticatedUser,
  InfoTab,
  Opportunity,
  Redemption,
  RecommendedReference,
  Meeting,
  MeetingFeedback,
  CallLog,
} from '@shared/models';

@Table
export class AccountContact extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  accountContactId: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  publicNote: string;

  @Column({
    type: DataType.STRING,
  })
  selectedReviewQuote: string;

  @Column({
    type: DataType.STRING,
  })
  often: string;

  @HasOne(() => InfoTab, 'accountContactId')
  infoTab: InfoTab;

  @HasOne(() => Redemption, 'accountContactId')
  redemption: Redemption;

  @HasOne(() => CallLog, 'participantId')
  callLog: CallLog;

  @HasMany(() => Opportunity, 'accountContactId')
  opportunities: Opportunity[];

  @HasMany(() => RecommendedReference, 'referenceId')
  recommendedReferences: RecommendedReference[];

  @HasMany(() => MeetingFeedback, 'reviewerId')
  meetingFeedbacks: MeetingFeedback[];

  @HasMany(() => Meeting, 'referenceContactId')
  referenceMeetings: Meeting[];

  @HasMany(() => Meeting, 'prospectContactId')
  prospectMeetings: Meeting[];

  @AllowNull(false)
  @ForeignKey(() => AuthenticatedUser)
  @Column({
    type: DataType.UUID,
  })
  authenticatedUserId: string;

  @BelongsTo(() => AuthenticatedUser)
  authenticatedUser: AuthenticatedUser;

  @AllowNull(false)
  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
  })
  accountId: string;

  @BelongsTo(() => Account)
  account: Account;

  @BelongsToMany(() => Notification, () => NotificationAccountContact)
  notifications: Notification[];

  @BeforeCreate
  static addUuidId(instance: AccountContact) {
    instance.accountContactId = uuidv4();
  }
}
