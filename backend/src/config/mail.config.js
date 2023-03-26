require("dotenv/config");

module.exports = {
  MAILER: process.env.MAILER,
  HOST: process.env.MAILHOST,
  PORT: process.env.MAILPORT,
  USERNAME: process.env.MAIL_USERNAME,
  PASSWORD: process.env.MAIL_PASSWORD,
  ECRYPTION: process.env.MAIL_ENCRYPTION,
  FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
  FROM_NAME: process.env.MAIL_FROM_ADDRESS,
};
