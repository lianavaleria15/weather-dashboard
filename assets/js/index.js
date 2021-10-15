// variable that stores the API key
const APIKey = "e44640c3292c7704425b7a92efe4de75";

//variable that collect user's input and stores it
const city = "London";

//construct a query URL to make the API call
const queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  APIKey;

//render today's city weather
const renderCityWeather = () => {
  console.log("Hooray");
};

const onLoad = () => {
  //handle API response
  const handleResponse = (response) => {
    if (response.status !== 200) {
      throw new Error("Something went wrong");
    }
    return response.json();
  };

  //handle error function
  const handleError = (error) => {
    console.log(error);
  };

  //get data from the API
  fetch(queryURL)
    .then(handleResponse)
    .then(renderCityWeather)
    .catch(handleError);
};

$(window).on("load", onLoad);
