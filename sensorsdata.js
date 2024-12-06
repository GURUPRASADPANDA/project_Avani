let messageIndex = Math.floor(Math.random() * 10); // Random start index

async function fetchSensorData() {
    try {
        // Fetch data from the JSON file
        const response = await fetch('data.json.json');
        const data = await response.json();

        // Get the array of messages
        const messages = data.messages;

        // Update the message index to loop through all messages
        const currentMessage = messages[messageIndex];
        const { temperature, humidity, airQuality, soilMoisture } = currentMessage.payload;

        // Update the HTML elements with the fetched data and apply the blinking effect
        updateWithBlink("airQuality", `${airQuality} AQI`);
        updateWithBlink("soilMoisture", `${soilMoisture} %`);
        updateWithBlink("temperature", `${temperature} °C`);
        updateWithBlink("humidity", `${humidity} %`);

        // Move to the next message, loop back to the start if at the end
        messageIndex = (messageIndex + 1) % messages.length;
    } catch (error) {
        console.error('Error fetching sensor data:', error);
    }
}

// Function to update element content with a blinking effect
function updateWithBlink(elementId, newText) {
    const element = document.getElementById(elementId);

    if (element.textContent !== newText) {
        // Add blinking class
        element.classList.add("blinking");

        // Update content after the blink starts
        setTimeout(() => {
            element.textContent = newText;
        }, 250);

        // Remove blinking class after the blink ends
        setTimeout(() => {
            element.classList.remove("blinking");
        }, 500);
    }
}

// Run fetchSensorData every 2 seconds in a never-ending loop
setInterval(fetchSensorData, 2000);

// Initial fetch
fetchSensorData();
