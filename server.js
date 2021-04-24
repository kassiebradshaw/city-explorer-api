'use strict';

const express = require('express');
const cors = require('cors');
const app = express();


const getMovieData = require('./handlers/movies.js');
const getWeatherData = require('./handlers/weather.js');

require('dotenv').config();
app.use(cors());

const PORT = process.env.PORT || 3001;

// proof of life
app.get('/', (request, response) => {
  response.send('hello!');
});

// refactoring - new function to get weatherData
app.get('/weather', getWeatherData);

// refactoring - new function to get movieData
app.get('/movies', getMovieData);



// moved the code below to weather.js
// app.get('/weather', (request, response) => {
//   superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
//     .query({
//       key: process.env.WEATHER_API_KEY,
//       lat: request.query.lat,
//       lon: request.query.lon
//     })
//     .then(weatherData => {
//       response.json(weatherData.body.data.map(day => (new Forecast(day))));
//     })
//     .catch(err => {
//       console.error(err);
//       response.status(500).send('Server error');
//     });
// }
// );

// moved the code below to movies.js
// app.get('/movies', (request, response) => {
//   superagent.get('https://api.themoviedb.org/3/search/movie')
//     .query({
//       api_key: process.env.MOVIE_API_KEY,
//       query: request.query.city
//     })
//     .then(movieInfo => {
//       console.log(movieInfo.body.results.map(selection => (new Movie(selection))));
//       response.json(movieInfo.body.results.map(selection => (new Movie(selection))));
//     }
//     )
//     .catch(err => {
//       console.error(err);
//     });
// });

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
