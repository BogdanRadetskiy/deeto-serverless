import { Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table
export class CreditPayment extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
  id: string;
}
