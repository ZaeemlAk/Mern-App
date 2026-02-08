require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Routes
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");

// Utils
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

// =======================
// CORS CONFIG
// =======================
const corsOptions = {
  origin: [
    "https://mern-app-frontend-pwxp.onrender.com",
    "http://localhost:4173",
    "https://thapatechnical.site",
    "https://www.thapatechnical.site",
  ],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

// =======================
// MIDDLEWARES
// =======================
app.use(express.json());

// =======================
// ROUTES
// =======================
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);

// 🔥 FIXED: service API
app.use("/api", serviceRoute);

// Admin routes
app.use("/api/admin", adminRoute);

// Error middleware
app.use(errorMiddleware);

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error);
  });
