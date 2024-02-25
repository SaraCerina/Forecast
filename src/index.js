function updateWeather(response) {
  let currentTemperature = document.querySelector("#weather-value");
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);

  let searchedCity = document.querySelector("#weather-city-name");
  searchedCity.innerHTML = response.data.city;

  let emoji = document.querySelector("#weather-emoji");

  emoji.innerHTML = `<img src=${response.data.condition.icon_url} id="weather-emoji" />`;

  let condition = document.querySelector("#weather-condition");
  condition.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#weather-humidity");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;

  let time = document.querySelector("#current-time");
  let date = new Date(response.data.time * 1000);
  time.innerHTML = formatDate(date);

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Satursday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "efaac33t940b8a24381d0c380bbb4ddo";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchEvent(event) {
  event.preventDefault();
  let searchFormInput = document.querySelector("#search-form-input");
  searchCity(searchFormInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchEvent);

///

function getForecast(city) {
  let apiKey = "efaac33t940b8a24381d0c380bbb4ddo";
  let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(forecastApiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";

  days.forEach(function loop(day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="forecast-date">
    <div class="forecast-day">${day}</div>
    <div class="forecast-icon">🌞</div>
    <div class="forecast-temperature">
    <span class="forecast-maximum">18&deg; </span>
    <span class="forecast-minimum">12&deg;</span>
    </div>
    </div>
    
    `;
  });
  forecast.innerHTML = forecastHTML;
}
displayForecast();

searchCity("Barcelona");
