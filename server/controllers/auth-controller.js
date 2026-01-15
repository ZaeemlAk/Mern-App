const User = require("../models/user-model");

// =======================
// HOME
// =======================
const home = (req, res) => {
  res.status(200).json({ message: "Welcome to Auth API" });
};

// =======================
// REGISTER
// =======================
const register = async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      username,
      email,
      phone,
      password,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

// =======================
// LOGIN
// =======================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = user.generateToken();

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin, // 🔥 REQUIRED
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Login failed" });
  }
};

// =======================
// CURRENT USER
// =======================
const currentUser = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 🔥 ALWAYS fetch fresh user from DB
    const user = await User.findById(req.user._id).select("-password");

    return res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin, // 🔥 REQUIRED
      },
    });
  } catch (error) {
    console.error("USER ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};

module.exports = {
  home,
  register,
  login,
  currentUser,
};
