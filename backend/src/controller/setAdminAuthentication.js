import { User } from "../models/index";
exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await User.update({ is_admin: true }, { where: { id } });
    return res
      .status(200)
      .json({ message: "Admin permission granted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
