import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { AccountContact } from '@shared/models/accountContact.model';
import { Meeting } from '@shared/models/meeting.model';

@Table
export class RecommendedReference extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  recommendedReferenceId: string;

  @Column({
    type: DataType.INTEGER,
  })
  recommendationLevel: number;

  @AllowNull(false)
  @ForeignKey(() => AccountContact)
  @Column({
    type: DataType.UUID,
  })
  referenceId: string;

  @BelongsTo(() => AccountContact)
  accountContact: AccountContact;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isSelected: boolean;

  @Column({
    type: DataType.STRING,
  })
  personalEmailQuote: string;

  @AllowNull(true)
  @ForeignKey(() => Meeting)
  @Column({
    type: DataType.UUID,
  })
  meetingId: string;

  @BelongsTo(() => Meeting)
  meeting: Meeting;

  @BeforeCreate
  static addUuidId(instance: RecommendedReference) {
    instance.recommendedReferenceId = uuidv4();
  }
}
