import { BeforeCreate, Column, DataType, Default, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { MeetingStageStatusEnum, MeetingStageTypeEnum } from '@shared/enums';

@Table
export class MeetingStage extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  meetingStageId: string;

  @Default(MeetingStageTypeEnum.INVITED)
  @Column({
    type: DataType.ENUM,
    values: Object.values(MeetingStageTypeEnum),
  })
  label: MeetingStageTypeEnum;

  @Default(MeetingStageStatusEnum.NOT_STARTED)
  @Column({
    type: DataType.ENUM,
    values: Object.values(MeetingStageStatusEnum),
  })
  status: MeetingStageStatusEnum;

  @Column({
    type: DataType.INTEGER,
  })
  order: number;

  @BeforeCreate
  static addUuidId(instance: MeetingStage) {
    instance.meetingStageId = uuidv4();
  }
}
