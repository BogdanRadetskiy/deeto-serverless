import { BeforeCreate, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';

@Table
export class InfoTab extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  infoTabId: string;

  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.STRING,
  })
  value: string;

  @BeforeCreate
  static addUuidId(instance: InfoTab) {
    instance.infoTabId = uuidv4();
  }
}
