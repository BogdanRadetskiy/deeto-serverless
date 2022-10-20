import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { Meeting, CallLog } from '@shared/models';

@Table
export class CallStatistics extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  callStatisticsId: string;

  @Column({
    type: DataType.INTEGER,
  })
  duration: number;

  @Column({
    type: DataType.DATE,
  })
  startTime: Date;

  @Column({
    type: DataType.DATE,
  })
  endTime: Date;

  @HasMany(() => CallLog, 'callStatisticsId')
  callLog: CallLog[];

  @AllowNull(false)
  @ForeignKey(() => Meeting)
  @Column({
    type: DataType.UUID,
  })
  meetingId: string;

  @BelongsTo(() => Meeting)
  meeting: Meeting;

  @BeforeCreate
  static addUuidId(instance: CallStatistics) {
    instance.callStatisticsId = uuidv4();
  }
}
