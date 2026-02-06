// === Generar la baraja ===
const arcanosMayores = [
  "El Loco", "El Mago", "La Sacerdotisa", "La Emperatriz", "El Emperador",
  "El Sumo Sacerdote", "Los Enamorados", "El Carro", "La Fuerza", "El Ermitaño",
  "La Rueda de la Fortuna", "La Justicia", "El Colgado", "La Muerte", "La Templanza", "El Diablo",
  "La Torre", "La Estrella", "La Luna", "El Sol", "El Juicio", "El Mundo"
];

const imagenesCartas = {
  "El Loco": "00.jpg",
  "El Mago": "01.jpg",
  "La Sacerdotisa": "02.jpg",
  "La Emperatriz": "03.jpg",
  "El Emperador": "04.jpg",
  "El Sumo Sacerdote": "05.jpg",
  "Los Enamorados": "06.jpg",
  "El Carro": "07.jpg",
  "La Fuerza": "08.jpg",
  "El Ermitaño": "09.jpg",
  "La Rueda de la Fortuna": "10.jpg",
  "La Justicia": "11.jpg",
  "El Colgado": "12.jpg",
  "La Muerte": "13.jpg",
  "La Templanza": "14.jpg",
  "El Diablo": "15.jpg",
  "La Torre": "16.jpg",
  "La Estrella": "17.jpg",
  "La Luna": "18.jpg",
  "El Sol": "19.jpg",
  "El Juicio": "20.jpg",
  "El Mundo": "21.jpg",
};

// === Funciones de sorteo ===
function sacarUnaCarta() {
  const indice = Math.floor(Math.random() * arcanosMayores.length);
  return arcanosMayores[indice];
}

function sacarTriada() {
  const copia = [...arcanosMayores];
  const triada = [];

  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * copia.length);
    triada.push(copia.splice(index, 1)[0]);
  }

  return triada;
}

// === DOM Interacción ===
const resultado = document.getElementById("resultado");

// Idioma actual del tarot (por defecto alemán)
let currentTarotLang = "de";

// Carpeta de cartas por idioma (AJUSTA ESTO A TUS RUTAS REALES)
const tarotFolders = {
  de: "tarot_deutsch",
  en: "tarot_english",
};

// Para recordar la última tirada
let lastDrawType = null;  // "one" | "triad" | null
let lastCards = null;     // string | string[]

// Función para crear carta volteada
function crearCartaHTML(nombreCarta) {
  const nombreArchivo = imagenesCartas[nombreCarta] || "reverse.webp";
  const cartaId = `carta-${Math.random().toString(36).substr(2, 9)}`;
  const folder = tarotFolders[currentTarotLang] || tarotFolders.de;

  // Debug: ver en consola qué carpeta está usando
  console.log("Usando carpeta:", folder, "para carta:", nombreCarta);

  return `
    <div class="tarot-card" id="${cartaId}">
      <div class="card-inner">
        <div class="card-side card-front">
          <img src="${folder}/${nombreArchivo}" alt="${nombreCarta}">
        </div>
        <div class="card-side card-back">
          <img src="imagenes/reverso.jpg" alt="Reverso">
        </div>
      </div>
    </div>
  `;
}

function renderUnaCarta(carta) {
  resultado.innerHTML = crearCartaHTML(carta);
  agregarVolteo();
}

function renderTriada(cartas) {
  resultado.innerHTML = cartas.map(c => crearCartaHTML(c)).join("");
  agregarVolteo();
}

// Activar volteo una sola vez por carta
function agregarVolteo() {
  const cartas = document.querySelectorAll(".tarot-card");
  cartas.forEach(carta => {
    const flip = () => {
      carta.classList.add("flipped");
      carta.removeEventListener("click", flip);
    };
    carta.addEventListener("click", flip);
  });
}

// Botones de tarot
document.getElementById("una-carta").addEventListener("click", () => {
  const carta = sacarUnaCarta();
  lastDrawType = "one";
  lastCards = carta;
  renderUnaCarta(carta);
});

document.getElementById("triada").addEventListener("click", () => {
  const cartas = sacarTriada();
  lastDrawType = "triad";
  lastCards = cartas;
  renderTriada(cartas);
});

// Conectar cambios de idioma al tarot (delegación por si se recrean botones)
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".lang-button");
  if (!btn) return;

  const lang = btn.dataset.lang;

  if (lang === "de" || lang === "en") {
    currentTarotLang = lang;
    console.log("Idioma del tarot ahora:", currentTarotLang);

    // Redibujar la última tirada (si existe) en el nuevo idioma
    if (lastDrawType === "one" && lastCards) {
      renderUnaCarta(lastCards);
    } else if (lastDrawType === "triad" && Array.isArray(lastCards)) {
      renderTriada(lastCards);
    } else {
      // Si no había tirada previa, simplemente limpiamos
      resultado.innerHTML = "";
    }
  }
});

// === Funciones para el oráculo con ChatGPT ===

// Función helper para obtener textos traducidos del oráculo
function getOracleText(key) {
  const lang = window.currentLang || 'de';
  return (languagesContent && languagesContent[lang] && languagesContent[lang][key]) || '';
}

// Pasar la última tirada a un array uniforme
function getCardsArray() {
  if (lastDrawType === "one" && lastCards) {
    return [lastCards]; // una sola carta
  }
  if (lastDrawType === "triad" && Array.isArray(lastCards)) {
    return lastCards;   // triada
  }
  return [];
}

async function preguntarAlOraculo() {
  const questionEl = document.getElementById("tarot-question");
  const answerEl = document.getElementById("oracle-answer");

  if (!questionEl || !answerEl) return;

  const question = questionEl.value.trim();
  const cardsArray = getCardsArray();

  if (!cardsArray.length) {
    answerEl.textContent = getOracleText('oraculo_primero_tirada');
    return;
  }

  if (!question) {
    answerEl.textContent = getOracleText('oraculo_escribe_pregunta');
    return;
  }

  const cards = cardsArray.map((name) => ({
    name,
    position: "upright",
  }));

  answerEl.textContent = getOracleText('oraculo_consultando');

  try {

    const API_URL = "https://wilmer-florez.vercel.app/api/tarot"; // BACKEND EN VERCEL

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        cards,
        drawType: lastDrawType,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error desde /api/tarot:", data);
      answerEl.textContent =
        getOracleText('oraculo_error_servidor') +
        (data.error || getOracleText('oraculo_problema')) +
        (data.details ? getOracleText('oraculo_detalles') + data.details : "");
      return;
    }

    if (data.answer) {
      answerEl.textContent = data.answer;
    } else {
      console.error("Respuesta inesperada desde /api/tarot:", data);
      answerEl.textContent = getOracleText('oraculo_silencio');
    }
  } catch (err) {
    console.error("Error en fetch /api/tarot:", err);
    answerEl.textContent = getOracleText('oraculo_error_hablar');
  }
}

// Listener para el botón del oráculo
const askOracleBtn = document.getElementById("ask-oracle-btn");
if (askOracleBtn) {
  askOracleBtn.addEventListener("click", preguntarAlOraculo);
}

// Asegurar que el textarea tenga un placeholder correcto y no valor inicial
const tarotQuestionTextarea = document.getElementById("tarot-question");
if (tarotQuestionTextarea) {
  // Si hay texto que parece un placeholder en el value, moverlo al placeholder
  if (tarotQuestionTextarea.value.trim() && !tarotQuestionTextarea.placeholder) {
    tarotQuestionTextarea.placeholder = tarotQuestionTextarea.value;
    tarotQuestionTextarea.value = "";
  }
  
  // Limpiar el campo si contiene el texto del placeholder cuando recibe focus
  tarotQuestionTextarea.addEventListener("focus", function() {
    if (this.value === this.placeholder) {
      this.value = "";
    }
  });
}



