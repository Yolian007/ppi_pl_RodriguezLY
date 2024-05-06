// Definición de la clave de API para acceder a OpenWeatherMap
const apiKey = "81d9c12b722363543ca649636d0ea70d";

// Función para obtener el clima
function getWeather() {
    // Obtiene el valor ingresado en el campo de ciudad
    const city = document.getElementById("cityInput").value;
    // Obtiene el valor ingresado en el campo de código de país
    const country = document.getElementById("countryInput").value;
    // Construye la URL para realizar la solicitud al API de OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric&lang=es`;

    // Realiza la solicitud al API utilizando fetch
    fetch(url)
        .then(response => response.json()) // Convierte la respuesta a formato JSON
        .then(data => {
            // Obtiene el contenedor donde se mostrará la información del clima
            const display = document.getElementById("weatherDisplay");
            // Verifica si la solicitud fue exitosa (código 200)
            if (data.cod === 200) {
                // Si la solicitud fue exitosa, muestra la información del clima
                display.innerHTML = `
                    <h3>Clima en ${data.name}, ${data.sys.country}</h3>
                    <p>Temperatura: ${data.main.temp}°C</p>
                    <p>Humedad: ${data.main.humidity}%</p>
                    <p>Descripción: ${data.weather[0].description}</p>
                `;
            } else {
                // Si la solicitud no fue exitosa, muestra el mensaje de error recibido del API
                display.innerHTML = `<p>${data.message}</p>`;
            }
        })
        // Maneja cualquier error que ocurra durante la solicitud
        .catch(error => console.error("Error al obtener el clima:", error));
}
