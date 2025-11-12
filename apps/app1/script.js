// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
const icon = themeToggle?.querySelector("i");
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  icon?.classList.replace("fa-moon", "fa-sun");
}
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  icon?.classList.replace(
    isDark ? "fa-moon" : "fa-sun",
    isDark ? "fa-sun" : "fa-moon"
  );
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Load Articles
if (document.getElementById("articles-list")) {
  fetch("data/articles.json")
    .then((res) => res.json())
    .then((articles) => {
      const container = document.getElementById("articles-list");
      articles.forEach((article) => {
        const div = document.createElement("div");
        div.classList.add("article-card");
        div.innerHTML = `
          <h3>${article.title}</h3>
          <p><strong>${article.author}</strong></p>
          <p>${article.tags.map((t) => `#${t}`).join(" ")}</p>
          <a href="${article.url}" target="_blank" class="btn">Read Article</a>
        `;
        container.appendChild(div);
      });
    });
}

// Load Stoic Quotes
if (document.getElementById("quote-text")) {
  const quoteText = document.getElementById("quote-text");
  const quoteAuthor = document.getElementById("quote-author");
  const newQuoteBtn = document.getElementById("new-quote");

  const loadQuote = () => {
    fetch("data/quotes.json")
      .then((res) => res.json())
      .then((quotes) => {
        const random = quotes[Math.floor(Math.random() * quotes.length)];
        quoteText.textContent = `"${random.quote}"`;
        quoteAuthor.textContent = `— ${random.author}`;
      });
  };

  newQuoteBtn.addEventListener("click", loadQuote);
  loadQuote();
}
