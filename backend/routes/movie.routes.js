const _ = require("lodash");
const express = require("express");
const levenshtein = require("fast-levenshtein");
const fs = require("fs");
const path = require("path");
const utils = require("../utils");

const dbPath = path.join(__dirname, "../data/database.json");

const movies = require(dbPath)["movies"];
const shuffled_movies = utils.shuffle(movies);
const rating_sorted_movies = movies.sort((a, b) => b["score"] - a["score"]);
const genre_filtered_movies = new Map();

const unique_genres = new Set(movies.flatMap((movie) => movie.genre));

function saveMovies() {
  const updatedData = { movies };
  fs.writeFileSync(dbPath, JSON.stringify(updatedData, null, 2), "utf-8");
}

const router = express.Router();

router.get("/movies/id/:id", (req, res) => {
  const movie_id = parseInt(req.params.id);
  if (isNaN(movie_id)) {
    res.status(400).send("Invalid movie id");
    return;
  }

  const include_reviews = req.query.reviews || false;
  if (
    include_reviews !== "true" &&
    include_reviews !== "false" &&
    include_reviews !== false
  ) {
    res.status(400).send("Invalid query parameter");
    return;
  }

  const index = _.findIndex(movies, { id: movie_id }, "id");
  if (index === -1) {
    res.status(404).send("Movie not found");
    return;
  }

  let movie = movies[index];
  if (!include_reviews) movie = _.omit(movie, ["reviews"]);

  res.status(200).json(movie);
});

router.get("/movies/id/:id/reviews", (req, res) => {
  const movie_id = parseInt(req.params.id);
  if (isNaN(movie_id)) {
    res.status(400).send("Invalid movie id");
    return;
  }

  const index = _.findIndex(movies, { id: movie_id }, "id");
  if (index === -1) {
    res.status(404).send("Movie not found");
    return;
  }

  res.status(200).json(movies[index]["reviews"]);
});

router.post("/movies/id/:id/reviews", (req, res) => {
  if (!req.is("json")) {
    return res
      .status(400)
      .json("Invalid Content-Type. Expected application/json");
  }

  const movie_id = parseInt(req.params.id);
  if (isNaN(movie_id)) {
    res.status(400).send("Invalid movie id");
    return;
  }

  const index = _.findIndex(movies, { id: movie_id }, "id");
  if (index === -1) {
    res.status(404).send("Movie not found");
    return;
  }

  const review = req.body.review;
  if (!review) {
    res.status(400).send("Invalid review");
    return;
  }

  movies[index]["reviews"].unshift(review);

  saveMovies();

  res.status(201).send("Review added successfully");
});

router.post("/movies/id/:id/rating/add", (req, res) => {
  if (!req.is("json")) {
    return res
      .status(400)
      .json("Invalid Content-Type. Expected application/json");
  }

  const movie_id = parseInt(req.params.id);
  if (isNaN(movie_id)) {
    res.status(400).send("Invalid movie id");
    return;
  }

  const rating = parseInt(req.body.rating);
  if (isNaN(rating) || rating < 1 || rating > 5) {
    res.status(400).send("Invalid rating");
    return;
  }

  const index = _.findIndex(movies, { id: movie_id }, "id");
  if (index === -1) {
    res.status(404).send("Movie not found");
    return;
  }

  let movie = movies[index];
  movie["score"] =
    (movie["score"] * movie["num_ratings"] + rating * 2) /
    (movie["num_ratings"] + 1);

  movie["num_ratings"] += 1;

  res.status(201).send("Rating added successfully");
});

router.post("/movies/id/:id/rating/remove", (req, res) => {
  if (!req.is("json")) {
    return res
      .status(400)
      .json("Invalid Content-Type. Expected application/json");
  }

  const movie_id = parseInt(req.params.id);
  if (isNaN(movie_id)) {
    res.status(400).send("Invalid movie id");
    return;
  }

  const rating = req.body.rating;
  if (isNaN(rating) || rating < 1 || rating > 5) {
    res.status(400).send("Invalid rating");
    return;
  }

  const index = _.findIndex(movies, { id: movie_id }, "id");
  if (index === -1) {
    res.status(404).send("Movie not found");
    return;
  }

  let movie = movies[index];
  movie["score"] =
    (movie["score"] * movie["num_ratings"] - rating * 2) /
    (movie["num_ratings"] - 1);

  movie["num_ratings"] -= 1;

  saveMovies();

  res.status(200).send("Rating removed successfully");
});

router.get("/movies/random", (req, res) => {
  const n = parseInt(req.query.n);
  if (isNaN(n)) {
    res.status(400).send("Invalid number of movies");
    return;
  }

  const offset = parseInt(req.query.offset);
  if (isNaN(offset)) {
    res.status(400).send("Invalid offset");
    return;
  }

  if (offset >= movies.length) {
    res.status(404).send("Invalid offset");
    return;
  }

  res
    .status(200)
    .json(
      shuffled_movies
        .slice(offset, offset + n)
        .map((val) => _.omit(val, ["reviews"]))
    );
});

router.get("/movies/ranked", (req, res) => {
  const n = parseInt(req.query.n);
  if (isNaN(n)) {
    res.status(400).send("Invalid number of movies");
    return;
  }

  const offset = parseInt(req.query.offset);
  if (isNaN(offset)) {
    res.status(400).send("Invalid offset");
    return;
  }

  if (offset >= movies.length) {
    res.status(404).send("Invalid offset");
    return;
  }

  res
    .status(200)
    .json(
      rating_sorted_movies
        .slice(offset, offset + n)
        .map((val) => _.omit(val, ["reviews"]))
    );
});

router.get("/movies/genre/:genre", (req, res) => {
  const genre = req.params.genre;
  if (!unique_genres.has(genre)) {
    res.status(404).send("Genre not found");
    return;
  }

  const n = parseInt(req.query.n);
  if (isNaN(n)) {
    res.status(400).send("Invalid number of movies");
    return;
  }

  const offset = parseInt(req.query.offset);
  if (isNaN(offset)) {
    res.status(400).send("Invalid offset");
    return;
  }

  if (offset >= movies.length) {
    res.status(404).send("Invalid offset");
    return;
  }

  let filtered_movies;
  if (genre_filtered_movies.has(genre))
    filtered_movies = genre_filtered_movies[genre];
  else {
    filtered_movies = shuffled_movies.filter((movie) =>
      movie["genre"].includes(genre)
    );
    genre_filtered_movies[genre] = filtered_movies;
  }

  res
    .status(200)
    .json(
      filtered_movies
        .slice(offset, offset + n)
        .map((val) => _.omit(val, ["reviews"]))
    );
});

router.get("/movies/all_genres", (req, res) => {
  res.status(200).json(Array.from(unique_genres));
});

router.get("/movies/search", (req, res) => {
  const query = req.query.q;
  if (!query) {
    res.status(400).send("Invalid query");
    return;
  }

  const n = parseInt(req.query.n);
  if (isNaN(n)) {
    res.status(400).send("Invalid number of movies");
    return;
  }

  const offset = parseInt(req.query.offset);
  if (isNaN(offset)) {
    res.status(400).send("Invalid offset");
    return;
  }

  if (offset >= movies.length) {
    res.status(404).send("Invalid offset");
    return;
  }

  const searched_movies = movies.filter(
    (movie) =>
      levenshtein.get(movie.title.toLowerCase(), query.toLowerCase()) <= 2 ||
      movie.title.toLowerCase().includes(query.toLowerCase())
  );

  res
    .status(200)
    .json(
      searched_movies
        .slice(offset, offset + n)
        .map((val) => _.omit(val, ["reviews"]))
    );
});

module.exports = {
  router,
  movies,
};
