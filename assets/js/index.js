// variable that stores the API key
const APIKey = "71382d9165047b8c2f705fcf08ff20ed";

//variable that collect user's input and stores it
const city = "London";

//construct a query URL to make the API call
const queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  APIKey;

//make the API call using fetch
fetch(queryURL);
