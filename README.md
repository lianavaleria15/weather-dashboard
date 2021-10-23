# Weather Dashboard

An app designed to provide user's with weekly weather information based on city search criteria.

## Description

## User Story

## Technology Used

## API Documentation

Weather information data was imported using OpenWeather API service.

### URLs

#### First API call - to get city name and latitude and longitude parameters

`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keyAPI}`

#### Second API call - to get current and forecast weather data

`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${keyAPI}&units=metric`

### Method

`GET` request

## Screenshots

### Desktop viewport

![desktop view](assets/images/screenshot-desktop.png)

### Tablet viewport

![tablet view](./assets/images/screenshot-tablet.png)

### Mobile viewport

![mobile view](assets/images/screenshot_mobile.png)
