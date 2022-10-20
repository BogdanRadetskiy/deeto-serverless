import { BeforeCreate, Column, DataType, Default, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { AvatarTypeEnum } from '@shared/enums';

import { v4 as uuidv4 } from 'uuid';

@Table
export class Avatar extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  avatarId: string;

  @Default(AvatarTypeEnum.DEFAULT)
  @Column({
    type: DataType.ENUM,
    values: Object.values(AvatarTypeEnum),
  })
  type: AvatarTypeEnum;

  @Column({
    type: DataType.STRING,
  })
  url: string;

  @BeforeCreate
  static addUuidId(instance: Avatar) {
    instance.avatarId = uuidv4();
  }
}
