function findNearbyPlaces() {
    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const response = await fetch(`/api/map/places?lat=${lat}&lon=${lon}`);
        const data = await response.json();

        document.getElementById("nearby-places").innerHTML = data.results
            .map(place => `<p>${place.name} - ${place.vicinity}</p>`)
            .join("");
    });
}
