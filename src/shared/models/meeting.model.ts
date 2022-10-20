import {
  Default,
  AllowNull,
  BeforeCreate,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  HasMany,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import {
  Opportunity,
  AccountContact,
  VendorContact,
  Account,
  MeetingStage,
  MeetingFeedback,
  CallStatistics,
  MeetingCredit,
  EmailActivity,
  MeetingEmailActivity,
  ScheduledTimeSlot,
} from '@shared/models';
import { MeetingStatusEnum } from '@shared/enums';

@Table
export class Meeting extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  meetingId: string;

  @HasMany(() => MeetingStage, 'meetingId')
  stage: MeetingStage[];

  @HasMany(() => ScheduledTimeSlot, 'meetingId')
  scheduledTimeSlots: ScheduledTimeSlot[];

  @HasOne(() => CallStatistics)
  callStatistics: CallStatistics;

  @HasMany(() => MeetingFeedback, 'meetingId')
  feedback: MeetingFeedback[];

  @HasMany(() => MeetingCredit, 'meetingId')
  meetingCredit: MeetingCredit[];

  @Default(MeetingStatusEnum.INITIATE)
  @Column({
    type: DataType.ENUM,
    values: Object.values(MeetingStatusEnum),
  })
  vendorAggregatedStage: MeetingStatusEnum;

  @Default(MeetingStatusEnum.INITIATE)
  @Column({
    type: DataType.ENUM,
    values: Object.values(MeetingStatusEnum),
  })
  prospectAggregatedStage: MeetingStatusEnum;

  @Default(MeetingStatusEnum.INITIATE)
  @Column({
    type: DataType.ENUM,
    values: Object.values(MeetingStatusEnum),
  })
  referenceAggregatedStage: MeetingStatusEnum;

  @Column({
    type: DataType.BIGINT,
  })
  zoomMeetingId: number;

  @Column({
    type: DataType.STRING,
  })
  zoomMeetingUUID: string;

  @Column({
    type: DataType.STRING,
  })
  zoomMeetingJoinUrl: string;

  @Column({
    type: DataType.DATE,
  })
  zoomMeetingStartTime: string;

  @AllowNull(false)
  @ForeignKey(() => Opportunity)
  @Column({
    type: DataType.UUID,
  })
  opportunityId: string;

  @BelongsTo(() => Opportunity)
  opportunity: Opportunity;

  @AllowNull(false)
  @ForeignKey(() => AccountContact)
  @Column({
    type: DataType.UUID,
  })
  referenceContactId: string;

  @BelongsTo(() => AccountContact)
  referenceContact: AccountContact;

  @AllowNull(false)
  @ForeignKey(() => AccountContact)
  @Column({
    type: DataType.UUID,
  })
  prospectContactId: string;

  @BelongsTo(() => AccountContact)
  prospectContact: AccountContact;

  @AllowNull(false)
  @ForeignKey(() => VendorContact)
  @Column({
    type: DataType.UUID,
  })
  initiatorId: string;

  @BelongsTo(() => VendorContact)
  initiator: VendorContact;

  @AllowNull(false)
  @ForeignKey(() => Account)
  @Column({
    type: DataType.UUID,
  })
  referenceAccountId: string;

  @BelongsTo(() => Account)
  account: Account;

  @BelongsToMany(() => EmailActivity, () => MeetingEmailActivity)
  emailActivities: EmailActivity[];

  @BeforeCreate
  static addUuidId(instance: Meeting) {
    instance.meetingId = uuidv4();
  }
}
