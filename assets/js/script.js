const locationElement = document.getElementById('location');
const headlineElement = document.getElementById('headline');
const tempElement = document.getElementById('temperature');
const imageElement = document.getElementById('image');
const inputElement = document.getElementById('input');
const buttonElement = document.getElementById('button');
const forecastContainerElement = document.getElementById('forecast-container');
const windInfo = document.getElementById('windInfo');

let apiKey = 'YOUR API KEY';

buttonElement.addEventListener('click', handleButtonClick);

function handleButtonClick() {
    let locationName = inputElement.value;

    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
    .then(response => {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        let weatherIcon = data.list[0].weather[0].icon;
        locationElement.innerText = data.city.name;
        imageElement.innerHTML = `<image src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></image>`;
        headlineElement.innerText = data.list[0].weather[0].main;
        tempElement.innerText = `${data.list[0].main.temp}°C`;
        windInfo.innerText = `Windspeed: ${data.list[0].wind.speed}km/h - Gusting at: ${data.list[0].wind.gust}km/h`;

        addForecast(data.list[1], 1);
        addForecast(data.list[2], 2);
        addForecast(data.list[3], 3);
        addForecast(data.list[4], 4);
    });
}

function addForecast(dayData, days) {
    let headline = dayData.weather[0].main;
    let weather = `${dayData.weather[0].description}`;
    let weatherIcon = dayData.weather[0].icon;
    let imgHtml = `<image src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></image>`;
    let temp = `${dayData.main.temp}°C`;
    let windInfo = `Windspeed: ${dayData.wind.speed}km/h<br>Gusting at: ${dayData.wind.gust}km/h`;

    let htmlString = `
        <div class="col-3">
            <span>${days} day(s) from now</span>
            <h3>${headline}</h3>
            <h5>${weather}</h5>
            ${imgHtml}
            <h4>${temp}</h4>
            <p>${windInfo}</p>
        </div>
        `;

    forecastContainerElement.innerHTML += htmlString;
}
