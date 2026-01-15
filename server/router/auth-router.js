// *----------------------
//* express.Router
// *----------------------

const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth-controller");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

// =======================
// ROUTES
// =======================

router.get("/", authControllers.home);

router.post(
  "/register",
  validate(signupSchema),
  authControllers.register
);

router.post(
  "/login",
  validate(loginSchema),
  authControllers.login
);

// 🔥 IMPORTANT: use currentUser (not user)
router.get(
  "/user",
  authMiddleware,
  authControllers.currentUser
);

module.exports = router;
