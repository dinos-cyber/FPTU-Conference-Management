import nodemailer from "nodemailer";
import mailConfig from "../config/mail.config";
import db from "../models/index";
import jwt from "jsonwebtoken";

module.exports = async (req, res) => {
  const email = req.body.email;
  const user = db.User.findOne({ where: { email } });

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
  console.log(`${process.env.APP_URL}/reset/${token}`);

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

  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: email,
    subject: "Activate your account",
    html: `
    <div style="background-color: #f2f2f2; padding: 30px; border-radius: 10px;">
      <h2 style="font-size: 24px; color: #333; margin-bottom: 20px; font-weight: bold;">Reset Your Password</h2>
      <p style="font-size: 16px; color: #666; line-height: 24px; margin-bottom: 30px;">We received a request to reset your password. If you did not request a password reset, please ignore this message.</p>
      <p style="font-size: 16px; color: #666; line-height: 24px; margin-bottom: 30px;">To reset your password, click the button below and follow the instructions.</p>
      <a href="${process.env.APP_URL}/reset/${token}" style="display: inline-block; background-color: #4CAF50; color: #fff; text-decoration: none; font-size: 16px; font-weight: bold; padding: 12px 30px; border-radius: 6px; margin-bottom: 30px;">Reset Password</a>
      <p style="font-size: 16px; color: #666; line-height: 24px;">If you did not request a password reset, please contact our support team immediately at ${process.env.MAIL_FROM_ADDRESS}.</p>
      <p style="font-size: 16px; color: #666; line-height: 24px;">Thank you for using our service!</p>
    </div>
  `,
  };
  await transport.sendMail(mailOptions);
  res.status(200).json({ message: "Email send to user!" });
};
