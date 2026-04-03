const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const ExcelJS = require("exceljs");


// ─────────────────────────────────────────────
// ROUTE 1 — Status Check
// GET /api/status
// Frontend calls this on load to check if
// registration is open or closed.
// Controlled by REGISTRATION_OPEN in .env /
// Render environment dashboard.
// ─────────────────────────────────────────────
router.get("/status", (req, res) => {
  const isOpen = process.env.REGISTRATION_OPEN === "true";
  res.status(200).json({
    success: true,
    registrationOpen: isOpen,
  });
});


// ─────────────────────────────────────────────
// ROUTE 2 — Health Check
// GET /api/health
// Just to confirm the server is running
// ─────────────────────────────────────────────
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Traversal backend is running ✓",
  });
});


// ─────────────────────────────────────────────
// ROUTE 3 — Register
// POST /api/register
// Saves registration to MongoDB
// Blocks duplicate emails
// Also blocked if REGISTRATION_OPEN is false
// ─────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {

    // Block submission if registration is closed
    // Extra safety — even if someone bypasses the frontend
    const isOpen = process.env.REGISTRATION_OPEN === "true";
    if (!isOpen) {
      return res.status(403).json({
        success: false,
        message: "Registrations are currently closed.",
      });
    }

    const { name, email, phone, branch, year, event } = req.body;

    // Basic presence check
    if (!name || !email || !phone || !branch || !year || !event) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // Check for duplicate email
    const existingUser = await Registration.findOne({
      email: email.toLowerCase().trim(),
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered. You cannot register twice.",
      });
    }

    // Save to MongoDB
    const newRegistration = new Registration({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      branch,
      year,
      event,
    });

    await newRegistration.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful! We'll see you at the event.",
    });

  } catch (error) {
    console.error("Registration error:", error);

    // Handle mongoose duplicate key error as fallback
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered. You cannot register twice.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});


// ─────────────────────────────────────────────
// ROUTE 4 — Admin Export
// GET /api/admin/export?key=YOUR_SECRET_KEY
// Downloads fresh Excel with ALL registrations
// Only accessible with the correct secret key
// ─────────────────────────────────────────────
router.get("/admin/export", async (req, res) => {
  try {
    // Verify secret key
    const { key } = req.query;

    if (!key || key !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Invalid or missing secret key.",
      });
    }

    // Fetch all registrations from MongoDB, sorted by newest first
    const registrations = await Registration.find({}).sort({ createdAt: -1 });

    if (registrations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No registrations found yet.",
      });
    }

    // ── Build Excel file ──
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Traversal";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet("Registrations");

    // Column definitions
    worksheet.columns = [
      { header: "S.No",          key: "sno",       width: 8  },
      { header: "Full Name",     key: "name",      width: 25 },
      { header: "Email",         key: "email",     width: 32 },
      { header: "Phone",         key: "phone",     width: 16 },
      { header: "Branch",        key: "branch",    width: 14 },
      { header: "Year",          key: "year",      width: 10 },
      { header: "Event",         key: "event",     width: 28 },
      { header: "Registered At", key: "createdAt", width: 22 },
    ];

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF7A00" }, // Traversal orange
      };
      cell.font = {
        bold: true,
        color: { argb: "FFFFFFFF" },
        size: 11,
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
      cell.border = {
        bottom: { style: "medium", color: { argb: "FF000000" } },
      };
    });
    headerRow.height = 22;

    // Add data rows
    registrations.forEach((reg, index) => {
      const row = worksheet.addRow({
        sno:       index + 1,
        name:      reg.name,
        email:     reg.email,
        phone:     reg.phone,
        branch:    reg.branch,
        year:      reg.year,
        event:     reg.event,
        createdAt: new Date(reg.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      // Alternate row colors for readability
      if (index % 2 === 0) {
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFF5F5F5" },
          };
        });
      }

      row.eachCell((cell) => {
        cell.alignment = { vertical: "middle", horizontal: "left" };
      });
    });

    // Freeze the header row
    worksheet.views = [{ state: "frozen", ySplit: 1 }];

    // ── Stream Excel to browser as download ──
    const fileName = `Traversal_Registrations_${new Date()
      .toISOString()
      .slice(0, 10)}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${fileName}"`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error("Export error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to generate Excel. Try again.",
    });
  }
});


module.exports = router;