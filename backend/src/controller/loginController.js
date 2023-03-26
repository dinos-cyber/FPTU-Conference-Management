import db from "../models/index";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (!user.is_activate)
      return res
        .status(400)
        .json({ message: "Please verify your email first!" });
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
