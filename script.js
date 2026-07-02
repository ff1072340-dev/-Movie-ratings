const API_KEY = "7efc7a72b7c648d5e2db136ff41520ad";

const translations = {
  en: {
    title: "Discover Amazing Movies",
    subtitle: "Watch trailers, ratings & trending films"
  },
  hi: {
    title: "शानदार फिल्में देखें",
    subtitle: "ट्रेलर, रेटिंग और ट्रेंडिंग फिल्में"
  },
  ur: {
    title: "زبردست فلمیں دریافت کریں",
    subtitle: "ٹریلرز، ریٹنگز اور ٹرینڈنگ فلمیں"
  }
};

function setLang(lang) {
  document.getElementById("main-title").innerText = translations[lang].title;
  document.getElementById("sub-title").innerText = translations[lang].subtitle;
}

// LOAD MOVIES (NETFLIX ROW STYLE)
async function loadMovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  const data = await res.json();

  const grid = document.getElementById("movie-grid");
  if (!grid) return;

  let html = "";

  data.results.forEach(movie => {
    const img = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/300x450";

    html += `
      <div class="movie-card" onclick="alert('Movie ID: ${movie.id}')">
        <img src="${img}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
      </div>
    `;
  });

  grid.innerHTML = html;
}

loadMovies();
