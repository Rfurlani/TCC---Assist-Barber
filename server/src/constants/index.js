import { config } from 'dotenv';

config();

export const DB = process.env.APP_DB;
export const DOMAIN = process.env.APP_DOMAIN;
export const PORT = process.env.PORT || process.env.APP_PORT;
export const SECRET = process.env.APP_SECRET;
export const HOST_EMAIL = process.env.APP_HOST_EMAIL;
export const HOST_EMAIL_PASSWORD = process.env.APP_HOST_EMAIL_PASSWORD;
export const REQ_PORT = process.env.REQUEST_PORT;

