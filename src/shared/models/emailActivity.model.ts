import { BeforeCreate, BelongsToMany, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { Opportunity } from '@shared/models/opportunity.model';
import { OpportunityEmailActivity } from '@shared/models/opportunityEmailActivity.model';
import { Meeting } from '@shared/models/meeting.model';
import { MeetingEmailActivity } from '@shared/models/meetingEmailActivity.model';

@Table
export class EmailActivity extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  emailActivityId: string;

  @Column({
    type: DataType.TEXT,
  })
  emailTemplate: string;

  @Column({
    type: DataType.DATE,
  })
  sentTimeStamp: Date;

  @Column({
    type: DataType.STRING,
  })
  toAddress: string;

  @Column({
    type: DataType.STRING,
  })
  fromAddress: string;

  @Column({
    type: DataType.STRING,
  })
  subject: string;

  @Column({
    type: DataType.TEXT,
  })
  body: string;

  @BelongsToMany(() => Opportunity, () => OpportunityEmailActivity)
  opportunities: Opportunity[];

  @BelongsToMany(() => Meeting, () => MeetingEmailActivity)
  meetings: Meeting[];

  @BeforeCreate
  static addUuidId(instance: EmailActivity) {
    instance.emailActivityId = uuidv4();
  }
}
