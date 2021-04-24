'use strict';

const superagent = require('superagent');

function getMovieData(request, response){
  const url = 'https://api.themoviedb.org/3/search/movie';
  const query = {
    api_key: process.env.MOVIE_API_KEY,
    query: request.query.city
  };

  superagent
    .get(url)
    .query(query)
    .then(movieData => {
      response.status(200).send(movieData.body.results.map(selection => (new Movie(selection))));
    })
    .catch(err => {
      console.error(err);
      response.status(500).send('Server error');
    });
}

// constructor function to create a Movie object for each selection
// gives movie's title and overview
function Movie(selection) {
  this.title = selection.title;
  this.overview = selection.overview;
}

module.exports = getMovieData;
