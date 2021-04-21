'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();
const superagent = require('superagent');

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
  }
};

app.use(cors(corsOptions));

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

// constructor function to create a Movie object for each selection
// gives movie's title and overview
function Movie(selection) {
  this.title = selection.title;
  this.overview = selection.overview;
}

app.get('/weather', (request, response) => {
  superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
    .query({
      key: process.env.WEATHER_API_KEY,
      lat: request.query.lat,
      lon: request.query.lon,
    })
    .set({ 'Access-Control-Allow-Origin': '*' })
    .then(weatherData => {
      response.json(weatherData.body.data.map(day => (new Forecast(day))));
    });
});



app.get('/movies', (request, response) => {
  superagent.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.query}`)
    .set({ 'Access-Control-Allow-Origin': '*' })
    .then(movieInfo => {
      console.log(movieInfo.body.results.map(selection => (new Movie(selection))));
      response.json(movieInfo.body.results.map(selection => (new Movie(selection))));
    }
    );
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
