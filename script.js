// Movie Search
const searchInput = document.querySelector(".search input");
const cards = document.querySelectorAll(".card");

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();

    if (title.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

// Card Hover Animation
cards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.03)";
    card.style.transition = "0.3s";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Smooth Scroll
document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", e => {
    const href = link.getAttribute("href");

    if (href.startsWith("#")) {
      e.preventDefault();

      const section = document.querySelector(href);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  });
});

// Scroll Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
});

cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "0.6s";
  observer.observe(card);
});

// Current Year
const footer = document.querySelector("footer p");

if (footer) {
  footer.innerHTML = `© ${new Date().getFullYear()} CineVerse. All Rights Reserved.`;
}
