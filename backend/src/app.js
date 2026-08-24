const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const authRoutes = require("./routes/authRoutes");
const opportunityRoutes = require("./routes/opportunityRoutes");
// const applicationRoutes = require("./routes/applicationRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const employmentProfileRoutes = require("./routes/employmentProfileRoutes");
const cvRequestRoutes = require("./routes/cvRequestRoutes");
const publicationRoutes = require("./routes/publicationRoutes");

const app = express();

// ============================
// Middleware
// ============================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nshcda.vercel.app/",
       "https://www.nshcda.com.ng",
        "https://nshcda.com.ng",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ============================
// API Routes
// ============================

app.use("/api/auth", authRoutes);
app.use("/api/opportunities", opportunityRoutes);
// app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/employment-profiles", employmentProfileRoutes);
app.use("/api/cv-requests", cvRequestRoutes);
app.use("/api/publications", publicationRoutes );

// ============================
// Health Check
// ============================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "NSHCDA Backend API is running.",
    });
});

// ============================
// Handle Unknown Routes
// ============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found.",
    });
});

// ============================
// Global Error Handler
// ============================

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;