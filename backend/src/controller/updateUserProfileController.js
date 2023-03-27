import { User } from "../models/index";
exports.updateUserProfile = async (req, res) => {
  try {
    const { first_name, last_name, email, password, country, address, phone } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.update(
      {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        country,
        address,
        phone,
      },
      { where: { id: req.user.id } }
    );
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
