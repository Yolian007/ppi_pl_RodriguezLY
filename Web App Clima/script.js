const apiKey = "81d9c12b722363543ca649636d0ea70d";

function getWeather() {
    const city = document.getElementById("cityInput").value;
    const country = document.getElementById("countryInput").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=es`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const display = document.getElementById("weatherDisplay");
            if (data.cod === 200) {
                display.innerHTML = `
                    <h3>Clima en ${data.name}, ${data.sys.country}</h3>
                    <p>Temperatura: ${data.main.temp}°C</p>
                    <p>Humedad: ${data.main.humidity}%</p>
                    <p>Descripción: ${data.weather[0].description}</p>
                `;
            } else {
                display.innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => console.error("Error al obtener el clima:", error));
}

