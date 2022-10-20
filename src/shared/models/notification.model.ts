import {
  AllowNull,
  BeforeCreate,
  BelongsToMany,
  Column,
  DataType,
  Default,
  IsUUID,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { AccountContact } from '@shared/models/accountContact.model';
import { NotificationAccountContact } from '@shared/models/notificationAccountContact.model';
import { EmailActivity } from './emailActivity.model';

@Table
export class Notification extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  notificationId: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  heading: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  timestamp: Date;

  @Column({
    type: DataType.STRING,
  })
  caption: string;

  @AllowNull(false)
  @Column({
    type: DataType.DATE,
  })
  sendAt: Date;

  @AllowNull(false)
  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isMarkedAsRead: boolean;

  @Column({
    type: DataType.UUID,
  })
  emailActivityId: string;

  @HasOne(() => EmailActivity, 'emailActivityId')
  email: EmailActivity;

  @BelongsToMany(() => AccountContact, () => NotificationAccountContact)
  accountContacts: AccountContact[];

  @BeforeCreate
  static addUuidId(instance: Notification) {
    instance.notificationId = uuidv4();
  }
}
