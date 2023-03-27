import jwt from "jsonwebtoken";
import db from "../models/index";

const activateUser = async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token);

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await db.User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }
    if (user.is_active) {
      return res.status(400).json({ message: "Account already activated" });
    }
    await db.User.update({ is_active: true }, { where: { id: decoded.id } });
    return res.status(200).json({ message: "Account activated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = activateUser;
