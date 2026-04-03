const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ─────────────────────────────────────────────
// MIDDLEWARE
// ─────────────────────────────────────────────

// Allow requests from your Next.js frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",          // local development
      "https://www.traversalhub.in",     // replace with your actual live URL
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// Parse incoming JSON request bodies
app.use(express.json());

// ROUTES
const registrationRoutes = require("./routes/registration");
app.use("/api", registrationRoutes);

// Root route — just a sanity check
app.get("/", (req, res) => {
  res.send("Traversal Backend API is live ✓");
});

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✓ Connected to MongoDB Atlas");

    // Start server only after DB is connected
    app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Health check → http://localhost:${PORT}/api/health`);
      console.log(`✓ Export Excel → http://localhost:${PORT}/api/admin/export?key=YOUR_SECRET_KEY`);
    });
  })
  .catch((error) => {
    console.error("✗ MongoDB connection failed:", error.message);
    process.exit(1);
  });