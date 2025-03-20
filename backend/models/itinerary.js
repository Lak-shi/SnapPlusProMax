const pool = require("../config/db");

const createItineraryTable = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS itineraries (
                id SERIAL PRIMARY KEY,
                location TEXT NOT NULL,
                budget TEXT NOT NULL,
                preferences TEXT NOT NULL,
                itinerary TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log("✅ Itinerary table verified"); // ✅ Only one log
    } catch (err) {
        console.error("❌ Error creating itineraries table:", err.message);
    }
};

module.exports = { createItineraryTable };
