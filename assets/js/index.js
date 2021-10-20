// use mock data here to construct and render weather containers before getting api data
const weatherData = {
  current: {
    name: "London",
    temperature: 123.45,
    wind: 111.22,
    humidity: 33,
    uvi: 2.5,
    date: "(3/30/2021)",
    iconCode: "04n",
  },
  forecast: [
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
    {
      date: "(3/30/2021)",
      temperature: 123.45,
      wind: 111.22,
      humidity: 33,
      iconCode: "04n",
    },
  ],
};

//target current weather card container
const weatherCardsContainer = $("#weather-cards-container");

//construct current weather card
const constructCurrentWeatherCard = (data) => {
  //use template string to construct current weather card
  const currentWeatherCard = `<div class="card-body bg-white border mb-2">
    <h2 class="card-title">
      ${data.name} ${data.date}
      <img src="http://openweathermap.org/img/w/${data.iconCode}.png" />
    </h2>
    <p class="card-text">Temp: ${data.temperature} &deg;F</p>
    <p class="card-text">Wind: ${data.wind} MPH</p>
    <p class="card-text">Humidity: ${data.humidity} %</p>
    <p class="card-text">
      UV index: <span class="btn btn-primary">${data.uvi}</span>
    </p>
  </div>`;
  weatherCardsContainer.append(currentWeatherCard);
};

//construct forecast weather cards
const constructForecastWeatherCards = (forecastData) => {
  //callback function to construct each card
  const constructAndAppendForecastWeatherCard = (each) => {
    return `<div class="card m-1" style="width: 18rem">
      <div class="card-body">
        <h5 class="card-title">${each.date}</h5>
        <p class="card-text">
          <img src="http://openweathermap.org/img/w/04n.png" />
        </p>
        <p class="card-text">Temp: 45.67 &deg;F</p>
        <p class="card-text">Wind: 15.43 MPH</p>
        <p class="card-text">Humidity: 78%</p>
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
constructCurrentWeatherCard(weatherData.current);
constructForecastWeatherCards(weatherData.forecast);
