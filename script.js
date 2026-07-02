const API_KEY = "7efc7a72b7c648d5e2db136ff41520ad";

// LOAD MULTIPLE ROWS
async function loadHome(){

  const trending = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
  const top = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);

  const tData = await trending.json();
  const topData = await top.json();

  renderMovies("trending", tData.results);
  renderMovies("toprated", topData.results);
}

function renderMovies(id, movies){
  const container = document.getElementById(id);

  container.innerHTML = movies.map(movie => `
    <div class="movie-card" onclick="openMovie(${movie.id})">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
      <h3>${movie.title}</h3>
    </div>
  `).join("");
}

// LIVE SEARCH
document.addEventListener("input", async (e)=>{
  if(e.target.id === "searchInput"){

    const q = e.target.value;

    if(q.length < 2) return;

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}`);
    const data = await res.json();

    renderMovies("trending", data.results);
  }
});

// MOVIE DETAILS PAGE
async function openMovie(id){
  window.location.href = `movie.html?id=${id}`;
}

async function loadMovieDetails(){

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if(!id) return;

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`);
  const movie = await res.json();

  document.getElementById("movieDetail").innerHTML = `
    <h1>${movie.title}</h1>
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
    <p>${movie.overview}</p>
  `;
}

if(document.getElementById("trending")) loadHome();
if(document.getElementById("movieDetail")) loadMovieDetails();
