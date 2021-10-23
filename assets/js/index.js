//target current weather card container
const weatherCardsContainer = $("#weather-cards-container");

//API key
const keyAPI = "e44640c3292c7704425b7a92efe4de75";

//transform date
const getFormattedDate = (unixTimestamp) => {
  //return formatted date
  return moment.unix(unixTimestamp).format("DD/MM/YYYY");
};

//get current data
const getCurrentData = (name, weatherData) => {
  return {
    name: name,
    temperature: weatherData.current.temp,
    wind: weatherData.current.wind_speed,
    humidity: weatherData.current.humidity,
    uvi: weatherData.current.uvi,
    date: getFormattedDate(weatherData.current.dt),
    iconCode: weatherData.current.weather[0].icon,
  };
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
  return weatherData.daily.slice(1, 6).map(callback);
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

  return {
    current: current,
    forecast: forecast,
  };
};

//set btn class color for UVI index
const getUVIClassName = (uvi) => {
  if (uvi >= 0 && uvi < 3) {
    return "btn-success";
  } else if (uvi >= 3 && uvi < 6) {
    return "btn-warning";
  } else if (uvi >= 6 && uvi < 8) {
    return "btn-danger";
  } else {
    return "btn-dark";
  }
};

//construct current weather card
const renderCurrentWeatherCard = (data) => {
  //use template string to construct current weather card
  const currentWeatherCard = `<div class="card-body border mb-2">
    <h2 class="card-title">
      ${data.name} ${data.date}
      <img src="http://openweathermap.org/img/w/${data.iconCode}.png" />
    </h2>
    <p class="card-text">Temp: ${data.temperature} &deg;C</p>
    <p class="card-text">Wind: ${data.wind} m/h</p>
    <p class="card-text">Humidity: ${data.humidity} %</p>
    <p class="card-text">
      UV index: <span class="btn ${getUVIClassName(data.uvi)}">${
    data.uvi
  }</span>
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
        <p class="card-text">Wind: ${each.wind} m/h</p>
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
  const forecastWeatherContainer = `<div class="border">
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

//render recent cities searched
const renderRecentCities = () => {
  //get cities from LS
  const cities = JSON.parse(localStorage.getItem("cities")) ?? [];

  //target city list container
  const citiesContainer = $("#city-list");

  //clear city list container
  citiesContainer.empty();

  //construct each city item
  const constructAndAppendCity = (city) => {
    const listElement = `<li data-city=${city} class="list-group-item">${city}</li>`;

    citiesContainer.append(listElement);
  };

  //on city clicked
  const handleClick = (event) => {
    event.preventDefault();

    //set target
    const target = $(event.target);

    //if click is from city list item
    if (target.is("li")) {
      //get city name
      const cityName = target.data("city");

      //render weather info
      renderWeatherInfo(cityName);
    }
  };

  //event listener on city item container
  citiesContainer.on("click", handleClick);

  //append city item to container
  cities.forEach(constructAndAppendCity);
};

const renderWeatherInfo = async (cityName) => {
  //get data from API
  const weatherData = await getWeatherData(cityName);

  //remove last weather search data
  weatherCardsContainer.empty();

  //render new search data
  renderWeatherContainers(weatherData);
};

//render last city's searched weather data
const onLoad = async () => {
  //render recent cities
  renderRecentCities();

  //get cities from LS
  const cities = JSON.parse(localStorage.getItem("cities")) ?? [];

  //if there are recent cities
  if (cities.length) {
    //get the info for the most recent city
    const cityName = cities.pop();

    //render weather cards for recent city
    renderWeatherInfo(cityName);
  }
};

//function to set cities to LS
const setCitiesToLocalStorage = (cityName) => {
  //get cities from LS
  const cities = JSON.parse(localStorage.getItem("cities")) ?? [];

  //if city does not exist in LS
  if (!cities.includes(cityName)) {
    //insert city searched to cities list
    cities.push(cityName);

    //set cities in LS
    localStorage.setItem("cities", JSON.stringify(cities));
  }
};

const handleCitySearch = async (event) => {
  event.preventDefault();

  //get city name input from the form
  const cityName = $("#city-input").val();

  //validation for city name input
  if (cityName) {
    renderWeatherInfo(cityName);
    setCitiesToLocalStorage(cityName);

    //render list of cities searched
    renderRecentCities();
  }
};

//add event listener on search city form
$("#search-form").on("submit", handleCitySearch);

//on windows load
$(document).ready(onLoad);
