import { getMovieByID } from "./movies.js";
import { stringToElement } from "./utils.js";
import { addRating, removeRating } from "./movies.js";

const modal = document.getElementById("movie-modal");
const modal_rating = document.getElementById("movie-rating");
const modal_title = document.getElementById("movie-title");
const modal_poster = document.getElementById("movie-poster");
const modal_description = document.getElementById("movie-description");
const modal_reviews = document.getElementById("movie-reviews");
const modal_star_rating = document.getElementById("movie-star-rating");

function clearModalStars() {
  [...modal_star_rating.children].forEach((star) =>
    star.classList.remove("filled")
  );
}

function setModalStars(num) {
  [...modal_star_rating.children].forEach((star) => {
    if (star.dataset.starnum <= num) {
      star.classList.add("filled");
    }
  });
}

async function updateModal() {
  const id = modal.dataset.id;
  const movie = await getMovieByID(id, true);
  modal_rating.innerHTML = parseFloat(movie.score.toFixed(2));
  modal_reviews.innerHTML = "";
  movie.reviews.forEach((review) => {
    const review_html = `
    <li class="review">${review}</li>
    `;
    modal_reviews.append(stringToElement(review_html));
  });
}

export function openModal(movie) {
  modal.dataset.id = movie.id;
  modal_rating.innerHTML = parseFloat(movie.score.toFixed(2));
  modal_title.innerHTML = movie.title;
  modal_description.innerHTML = movie.description;
  modal_poster.src = movie.poster;
  modal_reviews.innerHTML = "";
  movie.reviews.forEach((review) => {
    const review_html = `
    <li class="review">${review}</li>
    `;
    modal_reviews.append(stringToElement(review_html));
  });

  if (localStorage.getItem(movie.id) !== null)
    setModalStars(localStorage.getItem(movie.id));

  modal.classList.add("is-active");
}

export function closeModal() {
  modal.classList.remove("is-active");
  clearModalStars();
}

document
  .getElementById("movie-modal-close")
  .addEventListener("click", async () => {
    closeModal();
  });

const tabs = document.querySelectorAll(".tabs li");
const tab_panes = document.querySelectorAll(".tab-pane");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("is-active"));
    tab_panes.forEach((t) => t.classList.remove("is-active"));

    tab.classList.add("is-active");
    const active_pane = document.getElementById(tab.dataset.tab);
    active_pane.classList.add("is-active");
  });
});

modal_star_rating.addEventListener("click", async (event) => {
  if (event.target.classList.contains("rating_star")) {
    if (localStorage.getItem(modal.dataset.id) !== null) {
      await removeRating(
        modal.dataset.id,
        localStorage.getItem(modal.dataset.id)
      );
    }

    localStorage.setItem(modal.dataset.id, event.target.dataset.starnum);
    clearModalStars();
    setModalStars(event.target.dataset.starnum);

    await addRating(modal.dataset.id, event.target.dataset.starnum);

    await updateModal();

    console.log(document.getElementById(`score-${modal.dataset.id}`));
    document.getElementById(`score-${modal.dataset.id}`).innerHTML =
      modal_rating.innerHTML;
  }
});

document
  .getElementById("comment-button")
  .addEventListener("click", async () => {
    const review = document.getElementById("comment-input").value;
    const id = modal.dataset.id;

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

    updateModal();
    document.getElementById("comment-input").value = "";
  });
