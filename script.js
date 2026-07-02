const API_KEY = "7efc7a72b7c648d5e2db136ff41520ad";

// LOAD MULTIPLE CATEGORIES (100+ MOVIES AUTO)
async function loadAll(){

  const trending = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1`);
  const top = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=2`);
  const upcoming = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1`);

  const t = await trending.json();
  const r = await top.json();
  const u = await upcoming.json();

  render("trending", t.results);
  render("toprated", r.results);
  render("upcoming", u.results);
}

// RENDER MOVIES
function render(id, movies){
  document.getElementById(id).innerHTML = movies.map(m => `
    <div class="movie-card" onclick="openMovie(${m.id})">
      <img src="https://image.tmdb.org/t/p/w500${m.poster_path}">
      <h3>${m.title}</h3>
    </div>
  `).join("");
}

// SEARCH (LIVE)
document.addEventListener("input", async (e)=>{
  if(e.target.id === "searchInput"){

    const q = e.target.value;
    if(q.length < 2) return;

    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${q}`);
    const data = await res.json();

    render("trending", data.results);
  }
});

// MOVIE PAGE OPEN
function openMovie(id){
  window.location.href = `movie.html?id=${id}`;
}

// INIT
loadAll();
