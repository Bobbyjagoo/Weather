document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city').value.trim();
    if (city) {
        getWeather(city);
    } else {
        document.getElementById('result').innerHTML = `<p style="color:red;">Please enter a city name</p>`;
    }
});

async function getWeather(city) {
    const apiKey = `f8088640740217a93747191cbbb50704`; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            if (response.status === 404 ) {
                throw Error('City not found');
            } else {
                throw Error('An error occurred');
            }
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('result').innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}

function displayWeather(data) {
    const weatherInfo = `
        <h2>Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    document.getElementById('result').innerHTML = weatherInfo;
}
