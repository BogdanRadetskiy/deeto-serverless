import {
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
import { AuthenticatedUser } from '@shared/models/authenticatedUser.model';

@Table
export class GuiSettings extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
  })
  guiSettingsId: string;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  showDashBoard: boolean;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  showReferences: boolean;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  showProspects: boolean;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  showStatistics: boolean;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  showNotifications: boolean;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  showSettings: boolean;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  showFirstSteps: boolean;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  showScheduling: boolean;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  showPromotionBannerPoints: boolean;

  @Default(true)
  @Column({
    type: DataType.BOOLEAN,
  })
  showAwards: boolean;

  @ForeignKey(() => AuthenticatedUser)
  @Column({
    type: DataType.UUID,
  })
  authenticatedUserId: string;

  @BelongsTo(() => AuthenticatedUser)
  authenticatedUser: AuthenticatedUser;

  @BeforeCreate
  static addUuidId(instance: GuiSettings) {
    instance.guiSettingsId = uuidv4();
  }
}
