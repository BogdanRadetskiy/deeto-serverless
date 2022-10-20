import { BeforeCreate, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';

@Table
export class Redemption extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  redemptionId: string;

  @Column({
    type: DataType.INTEGER,
  })
  amount: number;

  @Column({
    type: DataType.DATE,
  })
  timestamp: Date;

  @Column({
    type: DataType.STRING,
  })
  channel: string;

  @BeforeCreate
  static addUuidId(instance: Redemption) {
    instance.redemptionId = uuidv4();
  }
}
