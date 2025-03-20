const { exec } = require("child_process");
const path = require("path");

exports.processSketch = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No image uploaded." });
        }

        const imagePath = req.file.path; // Path of the uploaded image
        const pythonScript = path.join(__dirname, "../process_sketch.py");

        console.log(`📷 Processing Sketch: ${imagePath}`);

        // Execute Python script to process the sketch
        exec(`python3 ${pythonScript} ${imagePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Processing Error: ${stderr}`);
                return res.status(500).json({ error: "Failed to process the sketch." });
            }

            const outputImagePath = stdout.trim();
            console.log(`✅ Sketch processed successfully: ${outputImagePath}`);

            res.json({ 
                message: "Sketch received and processed", 
                imagePath: outputImagePath 
            });
        });

    } catch (err) {
        console.error("❌ Server error:", err);
        res.status(500).json({ error: "Server error" });
    }
};
