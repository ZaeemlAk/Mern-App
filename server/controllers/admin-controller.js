const User = require("../models/user-model");
const Contact = require("../models/contact-model");

// *-------------------------------
//* getAllUsers
// *-------------------------------
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, { password: 0 });
    return res.status(200).json(users || []);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* get single user
// *-------------------------------
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* update user
// *-------------------------------
const updateUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUserData = req.body;

    const updatedData = await User.findByIdAndUpdate(
      id,
      { $set: updatedUserData },
      { new: true }
    ).select("-password");

    return res.status(200).json(updatedData);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* delete user
// *-------------------------------
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* getAllContacts
// *-------------------------------
const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    return res.status(200).json(contacts || []);
  } catch (error) {
    next(error);
  }
};

// *-------------------------------
//* delete contact
// *-------------------------------
const deleteContactById = async (req, res, next) => {
  try {
    const id = req.params.id;
    await Contact.findByIdAndDelete(id);
    return res.status(200).json({ message: "Contact Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
  deleteContactById,
};
