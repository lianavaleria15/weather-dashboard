//target submit button on search container
const submitBtn = $("#search-button");

//target city list container
const cityContainer = $("#city-list");

// function to add city to local storage
const updateLocalStorage = (city) => {
  //get city from local storage
  const citiesSearched = JSON.parse(localStorage.getItem("cities")) ?? [];

  //push new search to local storage
  citiesSearched.push(city);

  //add new city to local storage
  localStorage.setItem("cities", JSON.stringify(citiesSearched));

  return citiesSearched;
};

//function to render search history
const renderSearchHistory = (citiesSearched) => {
  //build city item
  const constructCityListItem = (city) => {
    const cityListItem = `<li class="list-group-item">${city}</li>`;

    cityContainer.append(cityListItem);
  };
  //append city item to list container
  citiesSearched.forEach(constructCityListItem);
};

//get text from input
const getCityName = (event) => {
  event.preventDefault;

  //get value from search input and assign to a variable
  const city = $("#city-input").val();

  //validate if input is empty
  if (city) {
    //update local storage with ciy value
    updateLocalStorage(city);

    //render city list
    renderSearchHistory(updateLocalStorage(city));

    //re-render search history
  } else {
    alert("No city added");
  }
};

//add event on submit button
submitBtn.on("click", getCityName);

// variable that stores the API key
// const APIKey = "e44640c3292c7704425b7a92efe4de75";

//variable that collect user's input and stores it
// const city = "London";

//construct a query URL to make the API call
// const queryURL =
//   "http://api.openweathermap.org/data/2.5/weather?q=" +
//   city +
//   "&appid=" +
//   APIKey;

// //render today's city weather
// const renderCityWeather = () => {
//   console.log("Hooray");
// };

// const onLoad = () => {
//   //handle API response
//   const handleResponse = (response) => {
//     if (response.status !== 200) {
//       throw new Error("Something went wrong");
//     }
//     return response.json();
//   };

//   //handle error function
//   const handleError = (error) => {
//     console.log(error);
//   };

//   //get data from the API
//   fetch(queryURL)
//     .then(handleResponse)
//     .then(renderCityWeather)
//     .catch(handleError);
// };
const onLoad = () => {};
$(window).on("load", onLoad);
