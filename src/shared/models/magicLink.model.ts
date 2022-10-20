import { Table, Column, Model, DataType, IsUUID, PrimaryKey, Default, BeforeCreate } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table
export class MagicLink extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  id: string;

  @Column({
    type: DataType.STRING,
  })
  email: string;

  @Column({
    type: DataType.STRING,
  })
  destination: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  isValid: boolean;

  @BeforeCreate
  static addUuidId(instance: MagicLink) {
    instance.id = uuidv4();
  }
}
