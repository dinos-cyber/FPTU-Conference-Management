const path = require("path");
import db from "../models/index";

module.exports = async (req, res) => {
  try {
    const pathPaperFile = req.params.path;
    const paper = await db.Paper.findOne({ where: { user_id: req.user.id } });
    if (!paper) {
      return res.status(400).json({ message: "No paper found!" });
    }
    const filePath = path.join(__dirname, "../public/uploads/", paper.path);
    return res.download(filePath);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
