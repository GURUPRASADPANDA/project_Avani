let messageIndex = Math.floor(Math.random() * 10); // Random start index

async function fetchSensorData() {
    try {
        
        const response = await fetch('data.json');
        const data = await response.json();

        
        const messages = data.messages;

       
        const currentMessage = messages[messageIndex];
        const { temperature, humidity, airQuality, soilMoisture } = currentMessage.payload;

        
        updateWithBlink("airQuality", `${airQuality+215} AQI`);
        updateWithBlink("soilMoisture", `${soilMoisture} %`);
        updateWithBlink("temperature", `${temperature} °C`);
        updateWithBlink("humidity", `${humidity} %`);

        
        messageIndex = (messageIndex + 1) % messages.length;
    } catch (error) {
        console.error('Error fetching sensor data:', error);
    }
}


function updateWithBlink(elementId, newText) {
    const element = document.getElementById(elementId);

    if (element.textContent !== newText) {
        
        element.classList.add("blinking");

        
        setTimeout(() => {
            element.textContent = newText;
        }, 250);

        
        setTimeout(() => {
            element.classList.remove("blinking");
        }, 500);
    }
}


setInterval(fetchSensorData, 2000);


fetchSensorData();
