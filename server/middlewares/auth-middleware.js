const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized. Token not provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findById(decoded.userId).select("-password");

    if (!userData) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = userData;
    req.userId = userData._id;

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
