exports.deletePaper = async (req, res) => {
  try {
    const { id } = req.params;
    const paper = await Paper.findOne({ where: { id, user_id: req.user.id } });
    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }
    await Paper.destroy({ where: { id } });
    return res.status(200).json({ message: "Paper deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
