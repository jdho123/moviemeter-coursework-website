import { stringToElement } from "./utils.js";

const movie_grid = document.getElementById("movie-grid");

let movie_card_html = `
<div class="cell card is-clickable expands" data-id={{id}}>
  <div class="card-image">
    <figure class="image is-3by4">
      <img
        src="{{poster_url}}"
        alt="Movie Poster"
        crossorigin="anonymous"
        onerror="this.src='assets/no_image.png';"
      />
    </figure>
  </div>
  <div class="card-content">
    <div class="media-content">
      <p class="title is-6">{{title}}</p>
    </div>
    <div class="content" id="score-{{id}}">{{score}}</div>
  </div>
</div>`;

export function clearMovies() {
  movie_grid.innerHTML = "";
}

const MOVIES_PER_PAGE = 102;

class MovieLoader {
  constructor() {}

  async load() {
    return [];
  }

  reset() {}
}

export class MoviesHomeLoader extends MovieLoader {
  constructor() {
    super();
    this.offset = 0;
    this.n = MOVIES_PER_PAGE;
  }

  async load() {
    const response = await fetch(
      `http://localhost:3000/api/movies/random?n=${this.n}&offset=${this.offset}`
    );
    if (!response.ok) alert("Error fetching movies");
    const movies = await response.json();
    this.offset += this.n;

    return movies;
  }

  reset() {
    this.offset = 0;
  }
}

export class MoviesRankedLoader extends MovieLoader {
  constructor() {
    super();
    this.offset = 0;
    this.n = MOVIES_PER_PAGE;
  }

  async load() {
    const response = await fetch(
      `http://localhost:3000/api/movies/ranked?n=${this.n}&offset=${this.offset}`
    );
    if (!response.ok) alert("Error fetching movies");
    const movies = await response.json();
    this.offset += this.n;

    return movies;
  }

  reset() {
    this.offset = 0;
  }
}

export class MoviesGenreLoader extends MovieLoader {
  constructor(genre) {
    super();
    this.genre = genre;
    this.offset = 0;
    this.n = MOVIES_PER_PAGE;
  }

  async load() {
    const response = await fetch(
      `http://localhost:3000/api/movies/genre/${this.genre}?n=${this.n}&offset=${this.offset}`
    );
    if (!response.ok) alert("Error fetching movies");
    const movies = await response.json();
    this.offset += this.n;

    return movies;
  }

  reset() {
    this.offset = 0;
  }
}

let movie_loader = new MoviesHomeLoader();

export function setMovieLoader(loader) {
  if (!(movie_loader instanceof MovieLoader)) return;
  movie_loader = loader;
}

export function getMovieLoader() {
  return movie_loader;
}

export async function getMovieByID(id, reviews) {
  const response = await fetch(
    `http://localhost:3000/api/movies/id/${id}?reviews=${reviews}`
  );
  if (!response.ok) alert("Error fetching movie");
  return response.json();
}

export async function getMovieSearch(offset, n, query) {
  const response = await fetch(
    `http://localhost:3000/api/movies/search?q=${query}&n=${n}&offset=${offset}`
  );
  if (!response.ok) alert("Error fetching movies");
  return response.json();
}

export function displayMovies(movies) {
  movies.forEach((movie) => {
    const movie_html = movie_card_html
      .replace(/{{id}}/g, movie.id)
      .replace("{{poster_url}}", movie.poster)
      .replace("{{title}}", movie.title)
      .replace("{{score}}", parseFloat(movie.score.toFixed(2)));

    const movie_element = stringToElement(movie_html);
    movie_grid.append(movie_element);
  });
}

export async function addRating(id, rating) {
  const response = await fetch(
    `http://localhost:3000/api/movies/id/${id}/rating/add`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: rating }),
    }
  );
  if (!response.ok) alert("Error adding rating");
}

export async function removeRating(id, rating) {
  const response = await fetch(
    `http://localhost:3000/api/movies/id/${id}/rating/remove`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating: rating }),
    }
  );
  if (!response.ok) alert("Error removing rating");
}

export async function addReview(id, review) {
  const response = await fetch(
    `http://localhost:3000/api/movies/id/${id}/reviews`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ review: review }),
    }
  );
  if (!response.ok) alert("Error adding review");
}

export async function getAllGenres() {
  const response = await fetch("http://localhost:3000/api/movies/all_genres");
  if (!response.ok) alert("Error fetching genres");
  return response.json();
}
