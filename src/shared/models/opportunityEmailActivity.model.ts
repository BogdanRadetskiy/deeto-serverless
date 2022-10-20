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

import { Opportunity, EmailActivity } from '@shared/models';

@Table
export class OpportunityEmailActivity extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  notificationAccountContactId: string;

  @ForeignKey(() => Opportunity)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  opportunityId: string;

  @ForeignKey(() => EmailActivity)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  emailActivityId: string;

  @BeforeCreate
  static addUuidId(instance: OpportunityEmailActivity) {
    instance.notificationAccountContactId = uuidv4();
  }
}
