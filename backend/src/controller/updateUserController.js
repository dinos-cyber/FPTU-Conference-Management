import { User } from "../models/index";

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password, is_admin, is_organizer } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update(
      {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        is_admin,
        is_organizer,
      },
      { where: { id } }
    );
    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
