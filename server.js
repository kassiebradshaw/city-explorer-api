'use strict';

const express = require('express');
const cors = require('cors');

require ('dotenv').config();

const weatherData = require('./data/weather.json');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('hello!');
});

// constructor function to create a Forecast object that takes in the parameter of "day"
// defines the properties of the date and the weather description
function Forecast(day){
  this.date = day.datetime;
  this.description = day.weather.description;
}

// creates an array of days by mapping over the weather data from weather.json and creating a new Forecast object for each item in the array
app.get('/weather', (request, response) => {
  let weatherArray = weatherData.data.map(day => new Forecast(day));
  response.send(weatherArray);
  // response.json(weatherArray);
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
