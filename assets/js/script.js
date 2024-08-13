let apiKey = 'YOUR API KEY HERE';

const locationElement = document.getElementById('location');
const headlineElement = document.getElementById('headline');
const tempElement = document.getElementById('temperature');
const imageElement = document.getElementById('image');
const inputElement = document.getElementById('input');
const buttonElement = document.getElementById('button');
const forecastContainerElement = document.getElementById('forecast-container');

buttonElement.addEventListener('click', handleButtonClick);

function handleButtonClick(){
    let locationName = inputElement.value;

    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl).then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        let weatherIcon = data.list[0].weather[0].icon;
        imageElement.innerHTML = `<image src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></image>`;
        locationElement.innerText = data.city.name;
        headlineElement.innerText = data.list[0].weather[0].main;
        tempElement.innerText = `${data.list[0].main.temp}°C`;

        addForecast(data.list[1], 1);
        addForecast(data.list[2], 2);
        addForecast(data.list[3], 3);
        addForecast(data.list[4], 4);
        addForecast(data.list[5], 5);
        addForecast(data.list[6], 6);
        addForecast(data.list[7], 7);
        addForecast(data.list[8], 8);
    })

    function addForecast(data, days) {
        let headline = data.weather[0].main;
        let weather = `${data.weather[0].description}`;
        let weatherIcon = data.weather[0].icon;
        let imgHtml = `<image src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></image>`;
        let temp = `${data.main.temp}°C`;
        let humidity = data.main.humidity;
        let wind = data.wind.speed;
        let gust = data.wind.gust;
        let htmlString = `
        <div class="col-3">
            <span>${days} day(s) from now</span>
            <h3>${headline}</h3>
            <h5>${weather}</h5>
            ${imgHtml}
            <h4>${temp}</h4>
            <h5>Humidity: ${humidity}%</h5>
            <h5>Wind speed: ${wind}km/h - gusting at ${gust}km/h</h5>
        </div>
        `;

        forecastContainerElement.innerHTML += htmlString;
    }
}