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

//target weather card container
const currentWeatherContainer = $("#current-weather-container");
//construct current weather card function
const constructCurrentWeatherCard = (data) => {
  //use template string to construct current weather card
  const currentWeatherCard = `<div class="card-body bg-white border mb-2">
    <h2 class="card-title">
      ${data.current.name} ${data.current.date}
      <img src="http://openweathermap.org/img/w/${data.current.iconCode}.png" />
    </h2>
    <p class="card-text">Temp: ${data.current.temperature} &deg;F</p>
    <p class="card-text">Wind: ${data.current.wind} MPH</p>
    <p class="card-text">Humidity: ${data.current.humidity} %</p>
    <p class="card-text">
      UV index: <span class="btn btn-primary">${data.current.uvi}</span>
    </p>
  </div>`;
  currentWeatherContainer.append(currentWeatherCard);
};

//render weather containers
constructCurrentWeatherCard(weatherData);
