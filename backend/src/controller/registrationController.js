import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import { transporter } from "../service/transporter";
import mailConfig from "../config/mail.config";
import nodemailer from "nodemailer";
import db from "../models/index";

let registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    console.log(req.body);
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword.toString(),
      // add more infomation here
    });
    if (newUser) {
      (async () => {
        const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
        console.log(`${process.env.APP_URL}/activate/${token}`);

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
          <h2 style="font-size: 24px; color: #333; margin-bottom: 20px; font-weight: bold;">Welcome to the Iconf Website</h2>
          <p style="font-size: 16px; color: #666; line-height: 24px; margin-bottom: 30px;">With our website, you can easily manage your conference schedule, view detailed information about speakers and sessions, and connect with other attendees.</p>
          <h3 style="font-size: 20px; color: #333; margin-bottom: 20px; font-weight: bold;">Features</h3>
          <ul style="font-size: 16px; color: #666; line-height: 24px; margin-bottom: 30px;">
            <li>Manage your conference schedule with ease</li>
            <li>View detailed information about speakers and sessions</li>
            <li>Connect with other attendees and build your network</li>
            <li>Get real-time updates on the conference schedule and announcements</li>
            <li>Participate in live polls and surveys</li>
            <li>Access conference materials and resources</li>
          </ul>
          <h3 style="font-size: 20px; color: #333; margin-bottom: 20px; font-weight: bold;">Get Started</h3>
          <p style="font-size: 16px; color: #666; line-height: 24px;">To get started with our website, simply create an account and register for the conference. Once you're registered, you can start building your schedule, connecting with other attendees, and accessing all of the great features our app has to offer.</p>
          <a href="${process.env.APP_URL}/activate/${token}" style="display: inline-block; background-color: #4CAF50; color: #fff; text-decoration: none; font-size: 16px; font-weight: bold; padding: 12px 30px; border-radius: 6px; margin-top: 30px;">Create an Account</a>
        </div>

        `,
        };
        await transport.sendMail(mailOptions);
      })();
    } else res.status(400).json({ message: "Registration fail!" });

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = registerUser;
