import {
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
import { AccountContact, AuthenticatedUser, Meeting, Opportunity, Vendor } from '@shared/models';

@Table
export class VendorContact extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  vendorContactId: string;

  @Column({
    type: DataType.STRING,
  })
  sendEmailOnBehalf: string;

  @HasMany(() => AccountContact, 'adminId')
  accountContacts: AccountContact[];

  @HasMany(() => Meeting, 'initiatorId')
  meeting: Meeting[];

  @ForeignKey(() => AuthenticatedUser)
  @Column({
    type: DataType.UUID,
  })
  authenticatedUserId: string;

  @BelongsTo(() => AuthenticatedUser)
  authenticatedUser: AuthenticatedUser;

  @ForeignKey(() => Vendor)
  @Column({
    type: DataType.UUID,
  })
  vendorId: string;

  @HasMany(() => Opportunity, 'ownerId')
  opportunities: Opportunity[];

  @BelongsTo(() => Vendor)
  vendor: Vendor;

  @BeforeCreate
  static addUuidId(instance: VendorContact) {
    instance.vendorContactId = uuidv4();
  }
}
