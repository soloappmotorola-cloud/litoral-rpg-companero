const contenido = document.getElementById("contenido");
const tabs = document.querySelectorAll(".tab-btn");

function cardArquetipo(a) {
  return `
    <article class="card" tabindex="0">
      <div class="card-cara card-frente">
        <div class="card-arte ${a.img ? "" : "card-arte--vacia"}"
             style="${a.img ? `background-image:url('${a.img}')` : ""}">
          ${a.img ? "" : `<span class="card-arte-placeholder">${a.nombre[0]}</span>`}
        </div>
        <h2>${a.nombre}</h2>
        <p class="card-raiz">raíz folclórica: ${a.raiz}</p>
        <p class="card-toque">tocá para ver la ficha ↴</p>
      </div>
      <div class="card-cara card-dorso">
        <h3>${a.nombre}</h3>
        <p>${a.resumen}</p>
        <dl>
          <dt>Prioridad</dt><dd>${a.prioridad}</dd>
          <dt>Oficios</dt><dd>${a.oficios}</dd>
          <dt>Don</dt><dd>${a.don}</dd>
        </dl>
      </div>
    </article>`;
}

function cardBestia(b) {
  return `
    <article class="card" tabindex="0">
      <div class="card-cara card-frente">
        <div class="card-arte ${b.img ? "" : "card-arte--vacia"}"
             style="${b.img ? `background-image:url('${b.img}')` : ""}">
          ${b.img ? "" : `<span class="card-arte-placeholder">${b.nombre[0]}</span>`}
        </div>
        <h2>${b.nombre}</h2>
        <p class="card-toque">tocá para ver la ficha ↴</p>
      </div>
      <div class="card-cara card-dorso">
        <h3>${b.nombre}</h3>
        <p class="card-stats">${b.stats}</p>
        <p><strong>Rasgo:</strong> ${b.rasgo}</p>
        <p><strong>Alternativa:</strong> ${b.alternativa}</p>
      </div>
    </article>`;
}

function vistaPersonajes() {
  return `<section class="grid">${ARQUETIPOS.map(cardArquetipo).join("")}</section>`;
}

function vistaBestiario() {
  return `<section class="grid">${BESTIARIO.map(cardBestia).join("")}</section>`;
}

function vistaReglas() {
  const r = REGLAS_RAPIDAS;
  return `
    <section class="panel-reglas">
      <div class="formula-destacada">${r.formula}</div>

      <h3>Dificultades</h3>
      <table class="tabla-reglas">
        ${r.dificultades.map(([n, v]) => `<tr><td>${n}</td><td>${v}</td></tr>`).join("")}
      </table>

      <h3>Resultado de la tirada</h3>
      ${r.resultados.map(([n, cond, efecto]) => `
        <div class="resultado-item">
          <p class="resultado-nombre">${n} <span class="resultado-cond">— ${cond}</span></p>
          <p class="resultado-efecto">${efecto}</p>
        </div>`).join("")}

      <p class="nota-reglas">${r.nota}</p>
    </section>`;
}

const VISTAS = { personajes: vistaPersonajes, bestiario: vistaBestiario, reglas: vistaReglas };

function mostrarTab(nombre) {
  contenido.innerHTML = VISTAS[nombre]();
  tabs.forEach(btn => btn.classList.toggle("is-active", btn.dataset.tab === nombre));
  contenido.querySelectorAll(".card").forEach(card => {
    card.addEventListener("click", () => card.classList.toggle("is-flipped"));
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); card.classList.toggle("is-flipped"); }
    });
  });
}

tabs.forEach(btn => btn.addEventListener("click", () => mostrarTab(btn.dataset.tab)));

const tabInicial = location.hash.replace("#", "");
mostrarTab(VISTAS[tabInicial] ? tabInicial : "personajes");

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}
