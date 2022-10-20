import { BeforeCreate, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { text } from 'aws-sdk/clients/customerprofiles';

@Table
export class StatisticsDashboard extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  statisticsDashboardId: string;

  @Column({
    type: DataType.STRING,
  })
  name: string;

  @Column({
    type: DataType.INTEGER,
  })
  order: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  isDefault: boolean;

  @Column({
    type: DataType.TEXT,
  })
  fakeData: text;

  @BeforeCreate
  static addUuidId(instance: StatisticsDashboard) {
    instance.statisticsDashboardId = uuidv4();
  }
}
