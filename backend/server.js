const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { createItineraryTable } = require("./models/itinerary");
const { createSketchTable } = require("./models/sketch");

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (for uploaded images)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Import Routes
const aiRoutes = require("./routes/aiRoutes");
const mapRoutes = require("./routes/mapRoutes");
const sketchRoutes = require("./routes/sketchRoutes");

// ✅ Use Routes
app.use("/api/ai", aiRoutes);
app.use("/api/map", mapRoutes);
app.use("/api/sketch", sketchRoutes);

// ✅ Start Server & Ensure Tables Exist
app.listen(port, async () => {
    console.log(`🚀 Server running on port ${port}`);

    try {
        await createItineraryTable();  // ✅ Creates Itinerary Table
        await createSketchTable();    // ✅ Creates Sketch Table

    } catch (error) {
        console.error("❌ Error creating tables:", error.message);
    }
});
