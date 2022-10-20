import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { Meeting } from '@shared/models/meeting.model';

@Table
export class MeetingCredit extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  meetingCreditId: string;

  @Column({
    type: DataType.INTEGER,
  })
  amount: string;

  @Column({
    type: DataType.DATE,
  })
  timeStamp: Date;

  @AllowNull(false)
  @ForeignKey(() => Meeting)
  @Column({
    type: DataType.UUID,
  })
  meetingId: string;

  @BelongsTo(() => Meeting)
  meeting: Meeting;

  @BeforeCreate
  static addUuidId(instance: MeetingCredit) {
    instance.meetingCreditId = uuidv4();
  }
}
