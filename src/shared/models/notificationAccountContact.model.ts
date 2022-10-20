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

import { AccountContact, Notification } from '.';

import { v4 as uuidv4 } from 'uuid';

@Table
export class NotificationAccountContact extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  notificationAccountContactId: string;

  @ForeignKey(() => Notification)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  notificationId: string;

  @ForeignKey(() => AccountContact)
  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  accountContactId: string;

  @BeforeCreate
  static addUuidId(instance: NotificationAccountContact) {
    instance.notificationAccountContactId = uuidv4();
  }
}
