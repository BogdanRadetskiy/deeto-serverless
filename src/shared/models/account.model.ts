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
import { AccountContact, Vendor, Opportunity, Meeting } from '@shared/models';

@Table
export class Account extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  accountId: string;

  @Column({
    type: DataType.STRING,
  })
  companyName: string;

  @Column({
    type: DataType.STRING,
  })
  companySize: string;

  @Column({
    type: DataType.STRING,
  })
  linkedInProfile: string;

  @Column({
    type: DataType.STRING,
  })
  industry: string;

  @ForeignKey(() => Vendor)
  @Column({
    type: DataType.UUID,
  })
  vendorId: string;

  @BelongsTo(() => Vendor)
  vendor: Vendor;

  @HasMany(() => Opportunity, 'accountId')
  opportunities: Opportunity[];

  @HasMany(() => AccountContact, 'accountId')
  accountContacts: AccountContact[];

  @HasMany(() => Meeting, 'referenceAccountId')
  meetings: Meeting[];

  @BeforeCreate
  static addUuidId(instance: Account) {
    instance.accountId = uuidv4();
  }
}
