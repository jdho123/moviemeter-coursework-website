import {
  getMovieSearch,
  clearMovies,
  displayMovies,
  getMovieLoader,
  setMovieLoader,
  MoviesHomeLoader,
  MoviesRankedLoader,
  MoviesGenreLoader,
  getAllGenres,
} from "./movies.js";
import { stringToElement } from "./utils.js";

const nav_toggle = document.getElementById("nav-toggle");
nav_toggle.addEventListener("click", () => {
  const target_id = nav_toggle.dataset.target;
  const target = document.getElementById(target_id);

  nav_toggle.classList.toggle("is-active");
  target.classList.toggle("is-active");
});

const navbar_dropdown = document.getElementById("genre-dropdown");
const all_genres = await getAllGenres();

all_genres.forEach((genre) => {
  const dropdown_item_html = `
  <a class="navbar-item" data-genre="${genre}">
    ${genre}
  </a>
  `;
  const dropdown_item = stringToElement(dropdown_item_html);

  navbar_dropdown.append(dropdown_item);
});

document.getElementById("home-button").addEventListener("click", async () => {
  clearMovies();
  setMovieLoader(new MoviesHomeLoader());
  displayMovies(await getMovieLoader().load());
});

document
  .getElementById("top-rated-button")
  .addEventListener("click", async () => {
    clearMovies();
    setMovieLoader(new MoviesRankedLoader());
    displayMovies(await getMovieLoader().load());
  });

document
  .getElementById("genre-dropdown")
  .addEventListener("click", async (event) => {
    clearMovies();
    setMovieLoader(new MoviesGenreLoader(event.target.dataset.genre));
    displayMovies(await getMovieLoader().load());
  });

document.getElementById("search-button").addEventListener("click", async () => {
  const search_query = document.getElementById("search-input").value;
  clearMovies();
  displayMovies(await getMovieSearch(0, 100, search_query));
});
