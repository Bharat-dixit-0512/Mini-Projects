function weatherEmoji(condition) {
    const cond = condition.toLowerCase();
    if (cond.includes("clear")) return "☀️";
    if (cond.includes("clouds")) return "☁️";
    if (cond.includes("rain")) return "🌧️";
    if (cond.includes("thunder")) return "⛈️";
    if (cond.includes("snow")) return "❄️";
    if (cond.includes("mist") || cond.includes("fog") || cond.includes("haze")) return "🌫️";
    return "🌈"; 
}

function setWeatherBackground(condition) {
    const body = document.body;
    const cond = condition.toLowerCase();

    if (cond.includes("clear")) {
        body.style.background = "linear-gradient(to top, #2980B9, #6DD5FA)"; 
    } else if (cond.includes("clouds")) {
        body.style.background = "linear-gradient(to top, #606c88, #3f4c6b)"; 
    } else if (cond.includes("rain") || cond.includes("drizzle")) {
        body.style.background = "linear-gradient(to top, #2c3e50, #4ca1af)";
    } else if (cond.includes("thunder")) {
        body.style.background = "linear-gradient(to top, #141E30, #243B55)"; 
    } else if (cond.includes("snow")) {
        body.style.background = "linear-gradient(to top, #e6dada, #274046)"; 
    } else if (cond.includes("mist") || cond.includes("fog") || cond.includes("haze")) {
        body.style.background = "linear-gradient(to top, #757f9a, #d7dde8)"; 
    } else {
        body.style.background = "#161B22"; 
    }
}

async function getWeather() {
    const city = document.getElementById('cityname').value;
    const api_keys = 'af9582de5baf552d53bd50d7b9f11369';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_keys}&units=metric`;

    const weatherResult = document.getElementById('weatherResult');
    weatherResult.innerHTML = `<p>🌐 Fetching weather data...</p>`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const temp = data.main.temp;
            const condition = data.weather[0].main; 
            const description = data.weather[0].description;
            const cityName = data.name;
            const humidity = data.main.humidity;
            const wind = data.wind.speed;
            const emoji = weatherEmoji(condition);

            setWeatherBackground(condition);

            weatherResult.innerHTML = `
            <div class="card">
                <h2>${emoji} ${description.replace(/\b\w/g, l => l.toUpperCase())}</h2>
                <p><strong>City:</strong> ${cityName}</p>
                <p><strong>Temperature:</strong> ${temp.toFixed(1)} °C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>Wind Speed:</strong> ${wind} m/s</p>
            </div>
            `;
        } else {
            weatherResult.innerHTML = `<p>😕 City not found. Please try again.</p>`;
            document.body.style.background = "#161B22"; 
        }
    } catch (error) {
        weatherResult.innerHTML = `<p>⚠️ An error occurred. Please check your connection.</p>`;
        document.body.style.background = "#161B22"; 
    }
}

const input = document.querySelector('#cityname');
const button = document.querySelector('#btn');

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});

button.addEventListener('click', function() {
    getWeather();
});