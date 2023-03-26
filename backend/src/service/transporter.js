const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail.config");
require("dotenv/config");

exports.transporter = (to, subject, htmlContent) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: mailConfig.HOST,
    port: mailConfig.PORT,
    secure: false,
    auth: {
      type: "login",
      user: mailConfig.USERNAME,
      pass: mailConfig.PASSWORD,
    },
  });
  const options = {
    from: mailConfig.FROM_ADDRESS,
    to: to,
    subject: subject,
    html: htmlContent,
  };
  return transport.sendMail(options);
};
