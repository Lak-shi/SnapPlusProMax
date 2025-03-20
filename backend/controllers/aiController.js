const pool = require("../config/db");
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateItinerary = async (req, res) => {
    try {
        const { location, budget, preferences } = req.body;
        const prompt = `Generate a cost-optimized travel itinerary for a trip to ${location} with a budget of ${budget} USD. Consider interests: ${preferences}.`;

        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }],
            max_tokens: 300,
        });

        const itinerary = response.choices[0].message.content.trim();

        // Store in PostgreSQL
        const result = await pool.query(
            "INSERT INTO itineraries (location, budget, preferences, itinerary) VALUES ($1, $2, $3, $4) RETURNING *",
            [location, budget, preferences, itinerary]
        );

        res.json({ itinerary: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
