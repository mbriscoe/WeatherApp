const locationElement = document.querySelector('#location');
const headlineElement = document.querySelector('#headline');
const tempElement = document.querySelector('#temperature');
const imageElement = document.querySelector('#image');
const inputElement = document.querySelector('#input');
const buttonElement = document.querySelector('#button');
const forecastContainerElement = document.querySelector('#forecast-container');
const windElement = document.querySelector('#wind');

let apiKey = '4f4bcf1786f2eaa59d2b0d22913817d0';

buttonElement.addEventListener('click', handleButtonClick);

function handleButtonClick() {
    if (inputElement.value === '') {
        alert('Please enter a location');
        return;
    }

    let locationName = inputElement.value;

    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${locationName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            let weatherIcon = data.list[0].weather[0].icon;
            imageElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></img>`;
            locationElement.innerText = data.city.name;
            headlineElement.innerText = data.list[0].weather[0].main;
            tempElement.innerText = `${data.list[0].main.temp}°C`;
            wind.innerHTML = `Wind ${data.list[0].wind.speed}km/h<hr>`;

            // Loop through the next 4 days
            for (let i = 1; i <= 4; i++) {
                addForecast(data.list[i], i);
            }
        });
}

function addForecast(data, days) {
    let headline = data.weather[0].main;
    let weather = `${data.weather[0].description}`;
    let weatherIcon = data.weather[0].icon;
    let imgHtml = `<image src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png"></image>`;
    let temp = `${data.main.temp}°C`;
    let wind = `Wind ${data.wind.speed}km/h`;
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

    forecastContainerElement.innerHTML += htmlString;
}
