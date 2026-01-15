const Service = require("../models/service-model");

// =======================
// GET ALL SERVICES (PUBLIC)
// =======================
const getServices = async (req, res) => {
  try {
    const services = await Service.find();

    if (!services || services.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    res.status(200).json(services);
  } catch (error) {
    console.error("GET SERVICES ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getServices,
};
