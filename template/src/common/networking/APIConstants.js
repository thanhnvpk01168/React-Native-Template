import { AppMode } from "../ConfigApp";

export const DEV_MODE_API = 'https://xxx.com/dev/';
export const STAGING_MODE_API = 'https://xxx.com/stag/';
export const PROD_MODE_API = 'https://xxx.com/prod/';

export const APP_MODE_URL = {
  dev: DEV_MODE_API,
  prod: PROD_MODE_API,
  stag: STAGING_MODE_API,
};

export const SERVER_URL = APP_MODE_URL[AppMode];

export const ApiConstants = {
  VERIFY_OTP: 'v1/api/xxxxxx'
};
