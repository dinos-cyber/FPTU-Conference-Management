import db from "../models/index";
import bcrypt from "bcrypt";
module.exports = async (req, res) => {
  try {
    const { first_name, last_name, email, password, is_admin, is_organizer } =
      req.body;
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      is_admin,
      is_organizer,
    });
    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
