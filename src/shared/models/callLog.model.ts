import {
  AllowNull,
  BeforeCreate,
  Default,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { CallStatistics } from '@shared/models/callStatistics.model';
import { CallLogEventEnum } from '@shared/enums/';

@Table
export class CallLog extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  callLogId: string;

  @Column({
    type: DataType.DATE,
  })
  timestamp: Date;

  @Default(CallLogEventEnum.JOIN)
  @Column({
    type: DataType.ENUM,
    values: Object.values(CallLogEventEnum),
  })
  event: string;

  @Column({
    type: DataType.STRING,
  })
  channel: string;

  @AllowNull(false)
  @ForeignKey(() => CallStatistics)
  @Column({
    type: DataType.UUID,
  })
  callStatisticsId: string;

  @BelongsTo(() => CallStatistics)
  callStatistics: CallStatistics;

  @BeforeCreate
  static addUuidId(instance: CallLog) {
    instance.callLogId = uuidv4();
  }
}
