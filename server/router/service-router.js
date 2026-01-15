const express = require("express");
const router = express.Router();

const { getServices } = require("../controllers/service-controller");

// PUBLIC
router.get("/service", getServices);

module.exports = router;
