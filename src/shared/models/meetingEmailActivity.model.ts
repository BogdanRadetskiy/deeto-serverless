import {
  AllowNull,
  BeforeCreate,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';

import { EmailActivity, Meeting } from '@shared/models';

@Table
export class MeetingEmailActivity extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  meetingEmailActivityId: string;

  @ForeignKey(() => Meeting)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  meetingId: string;

  @ForeignKey(() => EmailActivity)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  emailActivityId: string;

  @BeforeCreate
  static addUuidId(instance: MeetingEmailActivity) {
    instance.meetingEmailActivityId = uuidv4();
  }
}
