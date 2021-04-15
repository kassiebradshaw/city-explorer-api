'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const weatherData = require('./data/weather.json'); // this is where the weather API call will be

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('hello!');
});

// constructor function to create a Forecast object that takes in the parameter of "day"
// defines the properties of the date and the weather description
function Forecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

// creates an array of days by mapping over the weather data from weather.json and creating a new Forecast object for each item in the array
app.get('/weather', (request, response) => {
  try {
    let weatherArray = weatherData.data.map(day => new Forecast(day)); // we must use .body instead of .data when using superagent
    response.send(weatherArray);
  } catch (error) {
    handleErrors(error, response);
  }
});


function handleErrors(error, response) {
  response.status(500).send('internal error');
}

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
