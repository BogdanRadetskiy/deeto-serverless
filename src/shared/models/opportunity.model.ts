import {
  BeforeCreate,
  BelongsTo,
  BelongsToMany,
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

import { v4 as uuidv4 } from 'uuid';

import { Meeting, AccountContact, RecommendedReference, EmailActivity, OpportunityEmailActivity } from '@shared/models';

@Table
export class Opportunity extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  opportunityId: string;

  @Column({
    type: DataType.STRING,
  })
  description: string;

  @Column({
    type: DataType.DOUBLE,
  })
  dollarValue: number;

  @Column({
    type: DataType.DOUBLE,
  })
  budget: number;

  @ForeignKey(() => AccountContact)
  @Column({
    type: DataType.UUID,
  })
  accountContactId: string;

  @BelongsTo(() => AccountContact)
  accountContact: AccountContact;

  @HasOne(() => Meeting, 'opportunityId')
  meeting: Meeting;

  @HasMany(() => RecommendedReference, 'opportunityId')
  recommendedReferences: RecommendedReference[];

  @BelongsToMany(() => EmailActivity, () => OpportunityEmailActivity)
  emailActivities: EmailActivity[];

  @BeforeCreate
  static addUuidId(instance: Opportunity) {
    instance.opportunityId = uuidv4();
  }
}
