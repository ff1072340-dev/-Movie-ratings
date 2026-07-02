const API_KEY = "7efc7a72b7c648d5e2db136ff41520ad";

async function loadMovies() {
  const grid = document.getElementById("movie-grid");
  if (!grid) return;

  grid.innerHTML = "<p>Loading movies...</p>";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();

    grid.innerHTML = "";

    let html = "";

    data.results.forEach(movie => {
      const poster = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image";

      html += `
        <div class="movie-card">
          <img src="${poster}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <p>⭐ ${movie.vote_average}</p>
        </div>
      `;
    });

    grid.innerHTML = html;

  } catch (error) {
    console.error(error);
    grid.innerHTML = "<p style='color:red;'>Failed to load movies. Try again later.</p>";
  }
}

loadMovies();
