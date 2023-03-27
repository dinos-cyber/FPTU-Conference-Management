import jwt from "jsonwebtoken";
import db from "../models/index";
import bcrypt from "bcrypt";

module.exports = async (req, res) => {
  try {
    const { token, newpasswd } = req.params;
    console.log(token);
    const decoded = jwt.verify(
      token,
      "[23413ASDJZCX<>><SADF@#$ASD;'FBVX!@%^$&$%@#234@==6234"
    );
    const user = await db.User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    user.password = await bcrypt.hash(newpasswd, 10);
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
