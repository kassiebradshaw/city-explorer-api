'use strict';

const superagent = require('superagent');

// function to get weather information from weather API
// setting variables for changeable data rather than hardcoding

function getWeatherData(request, response){
  const url = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const query = {
    key: process.env.WEATHER_API_KEY,
    lat: request.query.lat,
    lon: request.query.lon
  };

  superagent
    .get(url)
    .query(query)
    .then(weatherData => {
      response.status(200).send(weatherData.body.data.map(day => (new Forecast(day))));
    })
    .catch(err => {
      console.error(err);
      response.status(500).send('Server error');
    });
}

// constructor function to get only the data I want
// creates a new 'Forecast' object for each 'day'
// each 'Forecast' object returns date and description
function Forecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

module.exports = getWeatherData;
