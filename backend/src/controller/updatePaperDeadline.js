import { Paper } from "../models/index";

exports.updatePaperDeadline = async (req, res) => {
  try {
    const { id } = req.params;
    const { deadline } = req.body;
    const paper = await Paper.findOne({ where: { id } });
    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }
    if (req.user.is_admin || req.user.is_organizer) {
      await Paper.update({ deadline }, { where: { id } });
      return res
        .status(200)
        .json({ message: "Paper deadline updated successfully" });
    }
    return res.status(401).json({ message: "Unauthorized" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
