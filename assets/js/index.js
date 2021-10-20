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
const constructCurrentWeatherCard = (weatherData) => {
  //use template string to construct current weather card
  const currentWeatherCard = `<div class="card-body bg-white border mb-2">
    <h2 class="card-title">
      London (20/10/2021)
      <img src="http://openweathermap.org/img/w/04n.png" />
    </h2>
    <p class="card-text">Temp: 45.67 &deg;F</p>
    <p class="card-text">Wind: 15.43 MPH</p>
    <p class="card-text">Humidity: 78%</p>
    <p class="card-text">
      UV index: <span class="btn btn-primary">0.47</span>
    </p>
  </div>`;
  currentWeatherContainer.append(currentWeatherCard);
};

//render weather containers
constructCurrentWeatherCard(weatherData);
