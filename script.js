const API_KEY = "7efc7a72b7c648d5e2db136ff41520ad";

const translations = {
  en: { title: "Discover Amazing Movies", sub: "Watch trailers & trending films" },
  hi: { title: "शानदार फिल्में देखें", sub: "ट्रेलर और ट्रेंडिंग फिल्में" },
  ur: { title: "زبردست فلمیں دیکھیں", sub: "ٹریلرز اور ٹرینڈنگ فلمیں" }
};

function setLang(lang){
  document.getElementById("main-title").innerText = translations[lang].title;
  document.getElementById("sub-title").innerText = translations[lang].sub;
}

async function loadMovies(){
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();

  let html = "";

  data.results.forEach(movie=>{
    const img = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";

    html += `
      <div class="movie-card" onclick="openTrailer('${movie.title}')">
        <img src="${img}">
        <h3>${movie.title}</h3>
        <p>⭐ ${movie.vote_average}</p>
      </div>
    `;
  });

  document.getElementById("movie-grid").innerHTML = html;
}

function openTrailer(title){
  const query = encodeURIComponent(title + " trailer");
  const url = `https://www.youtube.com/embed?listType=search&list=${query}`;

  document.getElementById("trailerModal").style.display = "block";
  document.getElementById("trailerFrame").src = url;
}

function closeTrailer(){
  document.getElementById("trailerModal").style.display = "none";
  document.getElementById("trailerFrame").src = "";
}

loadMovies();
