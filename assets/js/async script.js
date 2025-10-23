// Get references to DOM elements for displaying weather data
const locationElement = document.querySelector('#location');
const headlineElement = document.querySelector('#headline');
const tempElement = document.querySelector('#temperature');
const imageElement = document.querySelector('#image');
const inputElement = document.querySelector('#input');
const buttonElement = document.querySelector('#button');
const forecastContainerElement = document.querySelector('#forecast-container');
const windElement = document.querySelector('#wind');

// OpenWeatherMap API key
let apiKey = '4f4bcf1786f2eaa59d2b0d22913817d0';

// Add click event listener to the button
buttonElement.addEventListener('click', handleButtonClick);

// Focus the input field on page load
inputElement.focus();

// Handles the button click event to fetch and display weather data
async function handleButtonClick(e) {
    // Check if input is empty
    if (inputElement.value === '') {
        alert('Please enter a location');
        return;
    }

    // Clear previous forecast
    forecastContainerElement.innerHTML = '';

    // Get input text
    let locationName = inputElement.value;

    // Build API URL for the entered location
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${apiKey}&units=metric`;

    try {
        // Fetch weather data from OpenWeatherMap using async/await
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // Log API response for debugging
        console.log(data);

        // Display current weather information
        let weatherIcon = data.list[0].weather[0].icon;
        imageElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></img>`;
        locationElement.innerText = data.city.name;
        headlineElement.innerText = data.list[0].weather[0].main;
        tempElement.innerText = `${data.list[0].main.temp}°C`;
        wind.innerHTML = `Wind ${data.list[0].wind.speed}km/h<hr>`;

        // Loop through the next 4 days and add forecast
        for (let i = 1; i <= 4; i++) {
            addForecast(data.list[i], i);
        }
    } catch (error) {
        // Handle any errors that might occur during fetch
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again later.');
    }
}

// Adds a forecast card for a specific day to the forecast container
function addForecast(data, days) {
    // Main weather condition
    let headline = data.weather[0].main;
    // Weather description
    let weather = `${data.weather[0].description}`;
    // Icon code
    let weatherIcon = data.weather[0].icon;
    // Weather icon image
    let imgHtml = `<image src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></image>`;
    // Temperature
    let temp = `${data.main.temp}°C`;
    // Wind speed
    let wind = `Wind ${data.wind.speed}km/h`;

    // Build HTML for the forecast
    let htmlString = `
            <div class="col-3">
                <span>${days} day(s) from now</span>
                <h3>${headline}</h3>
                <h5>${weather}</h5>
                ${imgHtml}
                <h5>${temp}</h5>
                <p>${wind}</p>
            </div>
            `;

    // Append the forecast to the container
    forecastContainerElement.innerHTML += htmlString;
    inputElement.value = '';
    inputElement.focus();
}
