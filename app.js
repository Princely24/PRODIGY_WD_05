
const apiKey = '61eaffc1fe3a062c27ca6edeb9db7b02';  

function getWeather(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById('weatherInfo').innerHTML = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Temperature: ${data.main.temp} °C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                `;
            } else {
                document.getElementById('weatherInfo').innerHTML = `<p>${data.message}</p>`;
            }
        })
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
        });
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    if (data.cod === 200) {
                        document.getElementById('weatherInfo').innerHTML = `
                            <h2>${data.name}, ${data.sys.country}</h2>
                            <p>Temperature: ${data.main.temp} °C</p>
                            <p>Weather: ${data.weather[0].description}</p>
                            <p>Humidity: ${data.main.humidity}%</p>
                        `;
                    } else {
                        document.getElementById('weatherInfo').innerHTML = `<p>${data.message}</p>`;
                    }
                })
                .catch(error => {
                    document.getElementById('weatherInfo').innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
                });
        }, () => {
            document.getElementById('weatherInfo').innerHTML = '<p>Unable to retrieve your location.</p>';
        });
    } else {
        document.getElementById('weatherInfo').innerHTML = '<p>Geolocation is not supported by this browser.</p>';
    }
}

// Fetch weather for user-input location on button click
document.querySelector('button[onclick="getWeather()"]').addEventListener('click', function() {
    const location = document.getElementById('location').value;
    if (location) {
        getWeather(location);
    } else {
        document.getElementById('weatherInfo').innerHTML = '<p>Please enter a location or use your current location.</p>';
    }
});