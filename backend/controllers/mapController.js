const axios = require("axios");

exports.getNearbyPlaces = async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=1500&type=tourist_attraction&key=${apiKey}`;
        
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
