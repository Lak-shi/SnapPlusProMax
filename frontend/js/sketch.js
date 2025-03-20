async function uploadSketch() {
    const fileInput = document.getElementById("sketchUpload");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please upload a sketch first!");
        return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
        const response = await fetch("/api/sketch", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        
        if (data.imagePath) {
            document.getElementById("sketch-result").innerHTML = `
                <p>Sketch uploaded successfully!</p>
                <img src="${data.imagePath}" alt="Animated Avatar">
            `;
        } else {
            throw new Error("Failed to generate an animated avatar.");
        }
    } catch (error) {
        console.error("Error uploading sketch:", error);
        alert("Error processing your sketch. Please try again.");
    }
}
