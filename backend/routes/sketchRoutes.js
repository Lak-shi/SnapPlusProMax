const express = require("express");
const multer = require("multer");
const path = require("path");
const { processSketch } = require("../controllers/sketchController");

const router = express.Router();

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// Define the API endpoint
router.post("/", upload.single("image"), processSketch);

module.exports = router;
