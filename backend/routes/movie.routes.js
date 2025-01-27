const _ = require("lodash");
const express = require("express");
const utils = require("../utils");

const movies = require("../data/database.json")["movies"];
const shuffled_movies = utils.shuffle(movies);
const rating_sorted_movies = movies.sort((a, b) => b["score"] - a["score"]);
const genre_filtered_movies = new Map();

const router = express.Router();

router.get("/movies/id/:id", (req, res) => {
  const movie_id = parseInt(req.params.id);

  const index = _.sortedIndexBy(movies, { id: movie_id }, "id");
  const movie = _.omit(movies[index], ["reviews"]);

  res.json(movie);
});

router.get("/movies/id/:id/reviews", (req, res) => {
  const movie_id = parseInt(req.params.id);

  console.log(movie_id);

  const index = _.sortedIndexBy(movies, { id: movie_id }, "id");

  res.json(movies[index]["reviews"]);
});

router.post("/movies/id/:id/reviews", (req, res) => {
  const movie_id = parseInt(req.params.id);

  const index = _.sortedIndexBy(movies, { id: movie_id }, "id");
  movies[index]["reviews"].push(req.body.review);
});

router.get("/movies/random", (req, res) => {
  const n = parseInt(req.query.n) || 0;
  const offset = parseInt(req.query.offset) || 0;

  res.json(
    shuffled_movies
      .slice(offset, offset + n)
      .map((val) => _.omit(val, ["reviews"]))
  );
});

router.get("/movies/rated", (req, res) => {
  const n = parseInt(req.query.n) || 0;
  const offset = parseInt(req.query.offset) || 0;

  res.json(
    rating_sorted_movies
      .slice(offset, offset + n)
      .map((val) => _.omit(val, ["reviews"]))
  );
});

router.get("/movies/genre/:genre", (req, res) => {
  const genre = req.params.genre;

  const n = parseInt(req.query.n) || 0;
  const offset = parseInt(req.query.offset) || 0;

  let filtered_movies;
  if (genre_filtered_movies.has(genre))
    filtered_movies = genre_filtered_movies[genre];
  else {
    filtered_movies = shuffled_movies.filter((movie) =>
      movie["genre"].includes(genre)
    );
    genre_filtered_movies[genre] = filtered_movies;
  }

  res.json(
    filtered_movies
      .slice(offset, offset + n)
      .map((val) => _.omit(val, ["reviews"]))
  );
});

module.exports = {
  router: router,
};
