import { AllowNull, BeforeCreate, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';

@Table
export class MeetingFeedback extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  meetingFeedbackId: string;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  rateCall: number;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  goodMatch: boolean;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  helpful: boolean;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(255),
  })
  comment: string;

  @BeforeCreate
  static addUuidId(instance: MeetingFeedback) {
    instance.meetingFeedbackId = uuidv4();
  }
}
