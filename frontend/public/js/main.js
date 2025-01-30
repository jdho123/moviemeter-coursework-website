import { openModal } from "./modal.js";
import { displayMovies, getMovieByID, getMovieLoader } from "./movies.js";
import { isScrolledToBottom } from "./utils.js";

document
  .getElementById("movie-grid")
  .addEventListener("click", async (event) => {
    const movie_card = event.target.closest("[data-id]");
    openModal(await getMovieByID(movie_card.dataset.id, true));
  });

window.addEventListener("scroll", async () => {
  if (isScrolledToBottom()) {
    displayMovies(await getMovieLoader().load());
  }
});

displayMovies(await getMovieLoader().load());
