//display the current date and time

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

let mainDate = document.querySelector("#date");
let now = new Date();
mainDate.innerHTML = formatDate(now);

//display the name of the city on the result page and the current temperature of the city

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = `${cityInput.value}`;
  let apiKey = "211079cb69f39157cca4d1f04ca9b60c";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemp);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

//Shows city + current temp from search result

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "211079cb69f39157cca4d1f04ca9b60c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCurrentTemp);
}

function showCurrentTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector(".temperature");
  currentTemp.innerHTML = `${temperature}&deg;C`;

  let city = response.data.name;
  let currentCity = document.querySelector("h1#city");
  currentCity.innerHTML = `${city}`;

  let temperatureDescription = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = temperatureDescription;

  let humitidyElement = document.querySelector("#humidity");
  humitidyElement.innerHTML = response.data.main.humidity;

  let windElement = document.querySelector("#wind-speed");
  windElement.innerHTML = Math.round(response.data.wind.speed * 2.24);

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#feels-like");
  feelsLikeElement.innerHTML = `${feelsLike}&deg;C`;

  let tempHi = Math.round(response.data.main.temp_max);
  let tempHiElement = document.querySelector("#temp-hi");
  tempHiElement.innerHTML = `${tempHi}&deg;C`;

  let tempLo = Math.round(response.data.main.temp_min);
  let tempLoElement = document.querySelector("#temp-lo");
  tempLoElement.innerHTML = `${tempLo}&deg;C`;

  document.querySelector("#date");
}

navigator.geolocation.getCurrentPosition(showPosition);

//current location button
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#currentLocationButton");
locationButton.addEventListener("click", getCurrentPosition);
