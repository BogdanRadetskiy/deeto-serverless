import { AllowNull, BeforeCreate, Column, DataType, IsUUID, Model, PrimaryKey, Table } from 'sequelize-typescript';

import { v4 as uuidv4 } from 'uuid';
import { UserPrivilegeEnum } from '@shared/enums';

@Table
export class AuthenticatedUserPrivilege extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.STRING,
  })
  privilegeId: string;

  @AllowNull(false)
  @Column({
    type: DataType.ENUM,
    values: Object.values(UserPrivilegeEnum),
  })
  userPrivileges: UserPrivilegeEnum;

  @BeforeCreate
  static addUuidId(instance: AuthenticatedUserPrivilege) {
    instance.privilegeId = uuidv4();
  }
}
