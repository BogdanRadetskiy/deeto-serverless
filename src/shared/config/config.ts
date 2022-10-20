import dotenv from 'dotenv';

dotenv.config();

export const env = {
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_NAME: process.env.POSTGRES_NAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  USER_POOL_ID: process.env.USER_POOL_ID,
  CLIENT_ID: process.env.CLIENT_ID,
  REGION: process.env.REGION,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_FROM: process.env.SENDGRID_FROM,
  CLIENT_ADDR: process.env.CLIENT_ADDR,
  S3_PHOTOS_BUCKET: process.env.S3_PHOTOS_BUCKET,
  ZOOM_CLIENT_ID: process.env.ZOOM_CLIENT_ID,
  ZOOM_CLIENT_SECRET: process.env.ZOOM_CLIENT_SECRET,
  ZOOM_ROOT_USER: process.env.ZOOM_ROOT_USER,
};
