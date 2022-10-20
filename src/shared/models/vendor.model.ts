import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { VendorAccountLevelEnum } from '@shared/enums';
import { Avatar, VendorContact, StatisticsDashboard, MeetingCredit, Opportunity, Account } from '@shared/models';

import { v4 as uuidv4 } from 'uuid';

@Table
export class Vendor extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  vendorId: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(VendorAccountLevelEnum),
  })
  accountLevel: VendorAccountLevelEnum;

  @Column({
    type: DataType.DATE,
  })
  activationDate: Date;

  @Column({
    type: DataType.INTEGER,
  })
  defaultCreditAmountPerMeeting: number;

  @HasOne(() => StatisticsDashboard, 'vendorId')
  statisticsDashboard: StatisticsDashboard;

  @HasMany(() => VendorContact, 'vendorId')
  vendorContacts: VendorContact[];

  @ForeignKey(() => Avatar)
  @Column({
    type: DataType.UUID,
  })
  avatarId: string;

  @BelongsTo(() => Avatar)
  avatar: Avatar;

  @HasMany(() => Account, 'vendorId')
  accounts: Account[];

  @HasMany(() => MeetingCredit, 'vendorId')
  meetingCredits: MeetingCredit[];

  @BeforeCreate
  static addUuidId(instance: Vendor) {
    instance.vendorId = uuidv4();
  }
}
