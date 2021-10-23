//target current weather card container
const weatherCardsContainer = $("#weather-cards-container");

//API key
const keyAPI = "e44640c3292c7704425b7a92efe4de75";

//get current data
const getCurrentData = (name, weatherData) => {
  return {
    name: name,
    temperature: weatherData.current.temp,
    wind: weatherData.current.wind_speed,
    humidity: weatherData.current.humidity,
    uvi: weatherData.current.uvi,
    //convert with moment js.unix ()
    date: weatherData.current.dt,
    iconCode: weatherData.current.weather[0].icon,
  };
};

//transform date
const getFormattedDate = (unixTimestamp) => {
  //return formatted date
  return moment.unix(unixTimestamp).format("DD/MM/YYYY");
};
//get forecast data
const getForecastData = (weatherData) => {
  const callback = (each) => {
    return {
      date: getFormattedDate(each.dt),
      temperature: each.temp.max,
      wind: each.wind_speed,
      humidity: each.humidity,
      iconCode: each.weather[0].icon,
    };
  };
  return weatherData.daily.map(callback);
};
const getWeatherData = async (cityName) => {
  //build API URL to get latitude and longitude data
  const url_API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keyAPI}`;

  //import API data into JS
  const response = await fetch(url_API);
  const data = await response.json();

  //get latitude and longitude data and city name
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  const name = data.name;

  //build API URL to get weather for current card and forecast weather
  const weather_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric`;

  //import weather data into JS
  const weatherResponse = await fetch(weather_URL);
  const weatherData = await weatherResponse.json();

  //get current data
  const current = getCurrentData(name, weatherData);
  const forecast = getForecastData(weatherData);

  const fiveDayForecast = weatherData.daily.slice(1, 6);

  return {
    current: current,
    forecast: forecast,
  };
};

//construct current weather card
const renderCurrentWeatherCard = (data) => {
  //use template string to construct current weather card
  const currentWeatherCard = `<div class="card-body bg-white border mb-2">
    <h2 class="card-title">
      ${data.name} ${data.date}
      <img src="http://openweathermap.org/img/w/${data.iconCode}.png" />
    </h2>
    <p class="card-text">Temp: ${data.temperature} &deg;C</p>
    <p class="card-text">Wind: ${data.wind} MPH</p>
    <p class="card-text">Humidity: ${data.humidity} %</p>
    <p class="card-text">
      UV index: <span class="btn btn-primary">${data.uvi}</span>
    </p>
  </div>`;
  weatherCardsContainer.append(currentWeatherCard);
};

//construct forecast weather cards
const renderForecastWeatherCards = (forecastData) => {
  //callback function to construct each card
  const constructAndAppendForecastWeatherCard = (each) => {
    return `<div class="card m-1" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">${each.date}</h5>
        <p class="card-text">
          <img src="http://openweathermap.org/img/w/${each.iconCode}.png" />
        </p>
        <p class="card-text">Temp: ${each.temperature} &deg;C</p>
        <p class="card-text">Wind: ${each.wind} MPH</p>
        <p class="card-text">Humidity: ${each.humidity}</p>
      </div>
    </div>
  `;
  };

  //construct forecast card for each date
  const forecastCards = forecastData
    .map(constructAndAppendForecastWeatherCard)
    .join("");

  //construct forecast weather container
  const forecastWeatherContainer = `<div class="bg-white border">
    <h3 class="p-3 text-center">5-Day Forecast:</h3>
    <!--container forecast weather cards-->
    <div
      class=" m-3 d-flex flex-wrap justify-content-around"
    ><div
    class="d-flex flex-wrap justify-content-around"
    id="forecast-weather-container"
  >${forecastCards}</div></div>`;

  //append forecast weather container to main weather container
  weatherCardsContainer.append(forecastWeatherContainer);
};

//render weather containers
const renderWeatherContainers = (weatherData) => {
  //render current and forecast data functions
  renderCurrentWeatherCard(weatherData.current);
  renderForecastWeatherCards(weatherData.forecast);
};

const onLoad = async () => {
  //get data from API
  const weatherData = await getWeatherData("oxford");

  //render weather cards
  renderWeatherContainers(weatherData);
};

//on windows load
$(document).ready(onLoad);
