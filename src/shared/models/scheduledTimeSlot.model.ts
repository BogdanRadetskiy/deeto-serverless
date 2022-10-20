import {
  BeforeCreate,
  Column,
  DataType,
  Default,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ScheduledTimeSlotStatusEnum } from '../enums';
import { Meeting } from '@shared/models/meeting.model';
import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedUser } from './authenticatedUser.model';

@Table
export class ScheduledTimeSlot extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  scheduledTimeSlotId: string;

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

  @AllowNull(false)
  @ForeignKey(() => AuthenticatedUser)
  @Column({
    type: DataType.UUID,
  })
  authenticatedUserId: string;

  @BelongsTo(() => AuthenticatedUser)
  suggestedBy: AuthenticatedUser;

  @AllowNull(false)
  @ForeignKey(() => Meeting)
  @Column({
    type: DataType.UUID,
  })
  meetingId: string;

  @BelongsTo(() => Meeting)
  meeting: Meeting;

  @Default(ScheduledTimeSlotStatusEnum.PROPOSED)
  @Column({
    type: DataType.ENUM,
    values: Object.values(ScheduledTimeSlotStatusEnum),
  })
  status: ScheduledTimeSlotStatusEnum;

  @BeforeCreate
  static addUuidId(instance: ScheduledTimeSlot) {
    instance.scheduledTimeSlotId = uuidv4();
  }
}
