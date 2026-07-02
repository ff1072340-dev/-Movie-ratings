const API_KEY = "7efc7a72b7c648d5e2db136ff41520ad";

const API_URL =
`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

async function loadMovies() {

const response = await fetch(API_URL);
const data = await response.json();

const grid = document.querySelector(".movie-grid");

if (!grid) return;

grid.innerHTML = "";

data.results.slice(0,12).forEach(movie=>{

grid.innerHTML += `
<div class="movie-card">

<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">

<h3>${movie.title}</h3>

<p>⭐ ${movie.vote_average}</p>

<p>${movie.release_date}</p>

</div>
`;

});

}

loadMovies();
