const pool = require("../config/db");

const createSketchTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS sketches (
                id SERIAL PRIMARY KEY,
                image_path TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ Sketches table verified"); // ✅ Only one log
    } catch (err) {
        console.error("❌ Error creating sketches table:", err.message);
    }
};

module.exports = { createSketchTable };
