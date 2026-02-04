const posts = [
  {
    titulo: "Unknown Pleasures – Joy Division",
    tipo: "DISCO",
    año: 1979,
    mes: "Junio",
    tags: ["post-punk", "oscuro"],
    imagen: "img/unknown-pleasures.jpg",
    texto: `
      Esto no es música para animar una fiesta.
      Es música para escuchar una ciudad vacía.
    `
  },
  {
    titulo: "Fahrenheit 451 – Ray Bradbury",
    tipo: "LIBRO",
    año: 1953,
    mes: "Octubre",
    tags: ["distopía", "censura"],
    texto: `
      No es ciencia ficción.
      Es una advertencia.
    `
  }
];

const container = document.getElementById("posts");
const filters = document.getElementById("filters");
const params = new URLSearchParams(window.location.search);

const postIndex = params.get("post");
const tagFilter = params.get("tag");
const yearFilter = params.get("year");

/* ===============================
   POST INDIVIDUAL
================================ */
if (postIndex !== null && posts[postIndex]) {
  const post = posts[postIndex];

  container.innerHTML = `
    <article class="post">
      <h2>${post.titulo}</h2>
      <div class="meta">
        ${post.tipo} · ${post.mes} ${post.año}
      </div>

      ${post.imagen ? `<img src="${post.imagen}" class="cover">` : ""}

      <p>${post.texto.replace(/\n/g, "<br>")}</p>

      <div class="tags">
        ${post.tags.map(t => `<span class="tag" onclick="location.href='?tag=${t}'">#${t}</span>`).join("")}
      </div>

      <br>
      <a href="index.html" class="back">← volver</a>
    </article>
  `;
}

/* ===============================
   PORTADA + ÍNDICES
================================ */
else {
  const years = [...new Set(posts.map(p => p.año))];
  const tags = [...new Set(posts.flatMap(p => p.tags || []))];

  filters.innerHTML = `
    <div>
      ${years.map(y => `<span class="filter" onclick="location.href='?year=${y}'">${y}</span>`).join("")}
    </div>
    <div>
      ${tags.map(t => `<span class="filter" onclick="location.href='?tag=${t}'">#${t}</span>`).join("")}
    </div>
  `;

  posts
    .filter(p => !tagFilter || p.tags.includes(tagFilter))
    .filter(p => !yearFilter || p.año == yearFilter)
    .forEach((post, index) => {
      const article = document.createElement("article");
      article.className = "post";

      article.innerHTML = `
        <h2>
          <a href="?post=${index}">${post.titulo}</a>
        </h2>
        <div class="meta">
          ${post.tipo} · ${post.mes} ${post.año}
        </div>
      `;

      container.appendChild(article);
    });
}
