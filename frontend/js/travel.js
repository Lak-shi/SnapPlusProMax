async function generateItinerary() {
    const destination = document.getElementById("destination").value;
    const budget = document.getElementById("budget").value;
    const preferences = document.getElementById("preferences").value;

    const response = await fetch("/api/ai/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: destination, budget, preferences }),
    });

    const data = await response.json();
    document.getElementById("itinerary-result").innerHTML = `<p>${data.itinerary.itinerary}</p>`;
}
