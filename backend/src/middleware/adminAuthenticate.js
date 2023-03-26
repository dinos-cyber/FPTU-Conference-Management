exports.adminAuthenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = User.findOne({ where: { id: decoded.id } });
    if (!user || !user.is_admin) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
