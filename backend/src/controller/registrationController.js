import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { transporter } from "../service/transporter";
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
    });
    if (newUser) {
      (() => {
        const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY);
        console.log(
          `${process.env.APP_URL}/activate?email=${email}&token=${token}`
        );
        const mailOptions = {
          from: process.env.MAIL_USERNAME,
          to: email,
          subject: "Activate your account",
          html: `
          <div style="background-color: #f2f2f2; padding: 20px;">
            <h2 style="color: #333;">Verify your account</h2>
            <p style="color: #333;">Dear user,</p>
            <p style="color: #333;">Click <a href="http://localhost:3000/activate?email=${email}&token=${token}">here</a> to activate your account</p>
            <a href="#" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none;">Verify</a>
            <p style="color: #333;">Thank you for using our service!</p>
          </div>
        `,
        };

        transporter(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      })();
    } else res.status(400).json({ message: "Registration fail!" });

    return res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = registerUser;
