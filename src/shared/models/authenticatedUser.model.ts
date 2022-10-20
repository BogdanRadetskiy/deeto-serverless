import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserStatusEnum } from '@shared/enums';

import { v4 as uuidv4 } from 'uuid';

import {
  Avatar,
  GuiSettings,
  VendorContact,
  Notification,
  AuthenticatedUserPrivilege,
  AccountContact,
} from '@shared/models';

@Table
export class AuthenticatedUser extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  authenticatedUserId: string;

  @Column({
    type: DataType.STRING,
  })
  username: string;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @AllowNull(false)
  @Column({
    type: DataType.UUID,
  })
  cognitoUserId: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  approvedEULA: boolean;

  @Default(UserStatusEnum.PENDING)
  @Column({
    type: DataType.ENUM,
    values: Object.values(UserStatusEnum),
  })
  userStatus: UserStatusEnum;

  @Column({
    type: DataType.STRING,
  })
  preferredTimezone: string;

  @ForeignKey(() => Avatar)
  @Column({
    type: DataType.UUID,
  })
  avatarId: string;

  @BelongsTo(() => Avatar)
  avatar: Avatar;

  @HasOne(() => VendorContact, 'authenticatedUserId')
  vendorContact: VendorContact;

  @HasMany(() => Notification, 'authenticatedUserId')
  notifications: Notification[];

  @HasMany(() => AuthenticatedUserPrivilege, 'authenticatedUserId')
  authenticatedUserPrivileges: AuthenticatedUserPrivilege[];

  @HasMany(() => AccountContact, 'authenticatedUserId')
  accountContacts: AccountContact[];

  @HasOne(() => GuiSettings, 'authenticatedUserId')
  guiSettings: GuiSettings;

  @BeforeCreate
  static addUuidId(instance: AuthenticatedUser) {
    instance.authenticatedUserId = uuidv4();
  }
}
