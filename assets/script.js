let apiKey = '4f4bcf1786f2eaa59d2b0d22913817d0';

const locationElement = document.getElementById('city-name');
const headlineElement = document.getElementById('headline');
const tempElement = document.getElementById('temperature');
const imageElement = document.getElementById('image-div');
const inputElement = document.getElementById('input');
const buttonElement = document.getElementById('button');
const forecastContainerElement = document.getElementById('forecast-area');

function handleButtonClick() {
    locationName = inputElement.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            let weatherIcon = data.list[0].weather[0].icon;
            imageElement.innerHTML = `<image src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></image>`;
            locationElement.innerText = data.city.name;
            headlineElement.innerText = data.list[0].weather[0].main;
            tempElement.innerText = `${data.list[0].main.temp}°C`;

            forecastContainerElement.innerHTML = '';
            addForecast(data.list[7], 1);
            addForecast(data.list[15], 2);
            addForecast(data.list[23], 3);
            addForecast(data.list[31], 4);
        });
}

buttonElement.addEventListener('click', handleButtonClick);

function addForecast(data, days) {
    let headline = data.weather[0].main;
    let weather = `${data.weather[0].description}`;
    let weatherIcon = data.weather[0].icon;
    let imgHtml = `<image src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></image>`;
    let temp = `${data.main.temp}°C`;
    let hum = `${data.main.humidity}%`;
    let wind = `${data.wind.speed}`;
    let gust = `${data.wind.gust}`;

    let htmlString = `
    <div class="col-3">
        <span>${days} day(s) from now</span>
        <h3>${headline}</h3>
        <h5>${weather}</h5>
        ${imgHtml}
        <h4>${temp}</h4>

    </div>
    `;
    forecastContainerElement.innerHTML += htmlString;
}
