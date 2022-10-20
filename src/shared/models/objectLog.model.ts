import {
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
  Column,
  DataType,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { AuthenticatedUser } from './authenticatedUser.model';
import { ObjectLogActionEnum, objectLogClassNamesEnum } from '../enums';
@Table
export class ObjectLog extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  objectLogId: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(objectLogClassNamesEnum),
  })
  className: objectLogClassNamesEnum;

  @Column({
    type: DataType.UUID,
  })
  objectId: string;

  @AllowNull(false)
  @ForeignKey(() => AuthenticatedUser)
  @Column({
    type: DataType.UUID,
  })
  authenticatedUserId: string;

  @BelongsTo(() => AuthenticatedUser)
  performedBy: AuthenticatedUser;

  @Default(ObjectLogActionEnum.CREATED)
  @Column({
    type: DataType.ENUM,
    values: Object.values(ObjectLogActionEnum),
  })
  action: ObjectLogActionEnum;

  @BeforeCreate
  static addUuidId(instance: ObjectLog) {
    instance.objectLogId = uuidv4();
  }
}
