import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  SECRET_PASSPORT: process.env.SECRET_PASSPORT,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  MERCADOPAGO_ACCESS_TOKEN: process.env.MERCADOPAGO_ACCESS_TOKEN,
  MP_PRODUCT_TITLE: process.env.MP_PRODUCT_TITLE,
  APP_DOMAIN: process.env.APP_DOMAIN,
  BACK_SUCCESS_URL_MP: process.env.BACK_SUCCESS_URL_MP,
  SMSPVA_API_KEY: process.env.SMSPVA_API_KEY,
  AR_COUNTRY_CODE: process.env.AR_COUNTRY_CODE,
  WPP_SERVICE_CODE: process.env.WPP_SERVICE_CODE,
  SMS_VALUE_ARS: process.env.SMS_VALUE_ARS
};
