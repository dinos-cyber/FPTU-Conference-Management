import db from "../models/index";
module.exports = async (req, res) => {
  try {
    const papers = await db.Paper.findAll({ where: { user_id: req.user.id } });
    return res.status(200).json({ papers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
