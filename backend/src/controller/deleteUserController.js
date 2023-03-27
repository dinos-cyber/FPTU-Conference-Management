import db from "../models/index";
module.exports = async (req, res) => {
  try {
    await db.User.destroy({ where: { id: req.params.user_id } });
    await db.Paper.destroy({ where: { user_id: req.params.user_id } });
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
