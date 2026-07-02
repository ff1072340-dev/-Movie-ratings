const API_KEY = "7efc7a72b7c648d5e2db136ff41520ad";

let page = 1;
let currentQuery = "";

// INIT
document.addEventListener("DOMContentLoaded", () => {
  loadMovies("popular", "trending");
  loadMovies("top_rated", "toprated");
  loadMovies("upcoming", "upcoming");
});

// LOAD MOVIES (MULTI PAGE = 100+ MOVIES)
async function loadMovies(type, id, reset=false){

  const url = currentQuery
    ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${currentQuery}&page=${page}`
    : `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&page=${page}`;

  const res = await fetch(url);
  const data = await res.json();

  const container = document.getElementById(id);

  if(reset) container.innerHTML = "";

  container.innerHTML += data.results.map(m => `
    <div class="movie-card" onclick="openMovie(${m.id})">
      <img src="https://image.tmdb.org/t/p/w500${m.poster_path}">
      <h3>${m.title}</h3>
      <p>⭐ ${m.vote_average}</p>
    </div>
  `).join("");
}

// LIVE SEARCH (DEBOUNCED)
let timer;
document.addEventListener("input", (e)=>{
  if(e.target.id === "searchInput"){

    clearTimeout(timer);

    timer = setTimeout(()=>{
      currentQuery = e.target.value;
      page = 1;

      if(currentQuery.length < 2){
        location.reload();
        return;
      }

      loadMovies("popular", "trending", true);
    }, 500);
  }
});

// MOVIE PAGE
function openMovie(id){
  window.location.href = `movie.html?id=${id}`;
}
async function loadMovie(){

  const id = new URLSearchParams(window.location.search).get("id");

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`);
  const m = await res.json();

  const trailer = m.videos.results.find(v => v.type === "Trailer");

  document.getElementById("movieDetail").innerHTML = `
    <div class="detail">
      <img src="https://image.tmdb.org/t/p/w500${m.poster_path}">
      <h1>${m.title}</h1>
      <p>${m.overview}</p>

      <button onclick="playTrailer('${trailer?.key}')">▶ Watch Trailer</button>
    </div>
  `;
}

function playTrailer(key){
  document.getElementById("trailerModal").style.display = "block";
  document.getElementById("trailerFrame").src =
    `https://www.youtube.com/embed/${key}`;
}

function closeTrailer(){
  document.getElementById("trailerModal").style.display = "none";
  document.getElementById("trailerFrame").src = "";
}
