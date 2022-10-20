import { Sequelize } from 'sequelize-typescript';
import pg from 'pg';

import { env } from '../config/config';

import {
  Redemption,
  AccountContact,
  Account,
  AuthenticatedUser,
  VendorContact,
  Opportunity,
  ScheduledTimeSlot,
  Vendor,
  CreditPayment,
  Meeting,
  MagicLink,
  Avatar,
  GuiSettings,
  Notification,
  EmailActivity,
  RecommendedReference,
  InfoTab,
  MeetingCredit,
  StatisticsDashboard,
  CallStatistics,
  CallLog,
  MeetingFeedback,
  MeetingStage,
  NotificationAccountContact,
  AuthenticatedUserPrivilege,
  OpportunityEmailActivity,
  MeetingEmailActivity,
  ObjectLog,
} from '../models';

/**
 * returns sequelize instance to load to runtime
 * https://sequelize.org/docs/v6/other-topics/aws-lambda/
 * */
export function loadSequelize() {
  return new Sequelize({
    host: env.POSTGRES_HOST,
    database: env.POSTGRES_NAME,
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    dialectModule: pg,
    dialect: 'postgres',
    schema: 'public',
    models: [
      Meeting,
      MagicLink,
      Redemption,
      AccountContact,
      Account,
      AuthenticatedUser,
      VendorContact,
      Opportunity,
      ScheduledTimeSlot,
      Vendor,
      CreditPayment,
      Avatar,
      GuiSettings,
      Notification,
      EmailActivity,
      RecommendedReference,
      InfoTab,
      MeetingCredit,
      StatisticsDashboard,
      CallStatistics,
      CallLog,
      MeetingFeedback,
      MeetingStage,
      NotificationAccountContact,
      AuthenticatedUserPrivilege,
      OpportunityEmailActivity,
      MeetingEmailActivity,
      ObjectLog,
    ],
    logging: false,
  });
}

const sequelize = loadSequelize();

// TODO create migrations
const doSequelizeSync = false;

if (doSequelizeSync) {
  (async () => {
    try {
      await sequelize.sync({
        alter: true,
      });
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  })();
}

// Now we create two connections
// TODO remove export default and move tot logic to handler of each lambda
export default sequelize;
