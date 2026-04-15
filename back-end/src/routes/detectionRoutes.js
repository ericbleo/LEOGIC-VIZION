const express = require("express");
const multer = require("multer");
const DetectionController = require("../constollers/detectionController");

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limit file size to 10MB
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

const router = express.Router();

// Initialize controller
const detectionController = new DetectionController();

// Routes
router.post("/detect", upload.single("image_file"), (req, res) =>
  detectionController.detectObjects(req, res)
);

// Error handling middleware
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    // Handle Multer-specific errors
    return res.status(400).json({
      success: false,
      message: "File upload error",
      error: error.message,
    });
  } else if (error) {
    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
  next();
});

module.exports = router;
