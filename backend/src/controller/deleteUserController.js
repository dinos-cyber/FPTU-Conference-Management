exports.deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { id: req.user.id } });
    await Paper.destroy({ where: { user_id: req.user.id } });
    return res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
