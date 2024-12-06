function getRandomData(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function updateSensors() {
    document.getElementById("airQuality").textContent = `${getRandomData(50, 150)} AQI`;
    document.getElementById("soilMoisture").textContent = `${getRandomData(20, 60)} %`;
    document.getElementById("temperature").textContent = `${getRandomData(25, 35)} °C`;
    document.getElementById("humidity").textContent = `${getRandomData(40, 80)} %`;
}

setInterval(updateSensors, 5000);

updateSensors();
