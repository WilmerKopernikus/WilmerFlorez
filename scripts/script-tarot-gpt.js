// === Generar la baraja ===
const arcanosMayores = [
  "0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX",
  "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"
];

const imagenesCartas = {
  "0": "00.png",
  "I": "01.png",
  "II": "02.png",
  "III": "03.png",
  "IV": "04.png",
  "V": "05.png",
  "VI": "06.png",
  "VII": "07.png",
  "VIII": "08.png",
  "IX": "09.png",
  "X": "10.png",
  "XI": "11.png",
  "XII": "12.png",
  "XIII": "13.png",
  "XIV": "14.png",
  "XV": "15.png",
  "XVI": "16.png",
  "XVII": "17.png",
  "XVIII": "18.png",
  "XIX": "19.png",
  "XX": "20.png",
  "XXI": "21.png",
};

// === Nombres de los Arcanos Mayores en cada idioma ===
const tarotCardNames = {
  de: {
    "0": "Der Narr",
    "I": "Der Magier",
    "II": "Die Hohepriesterin",
    "III": "Die Herrscherin",
    "IV": "Der Herrscher",
    "V": "Der Hierophant",
    "VI": "Die Liebenden",
    "VII": "Der Wagen",
    "VIII": "Die Kraft",
    "IX": "Der Eremit",
    "X": "Rad des Schicksals",
    "XI": "Die Gerechtigkeit",
    "XII": "Der Gehängte",
    "XIII": "Der Tod",
    "XIV": "Die Mäßigkeit",
    "XV": "Der Teufel",
    "XVI": "Der Turm",
    "XVII": "Der Stern",
    "XVIII": "Der Mond",
    "XIX": "Die Sonne",
    "XX": "Das Gericht",
    "XXI": "Die Welt"
  },
  en: {
    "0": "The Fool",
    "I": "The Magician",
    "II": "The High Priestess",
    "III": "The Empress",
    "IV": "The Emperor",
    "V": "The Hierophant",
    "VI": "The Lovers",
    "VII": "The Chariot",
    "VIII": "Strength",
    "IX": "The Hermit",
    "X": "Wheel of Fortune",
    "XI": "Justice",
    "XII": "The Hanged Man",
    "XIII": "Death",
    "XIV": "Temperance",
    "XV": "The Devil",
    "XVI": "The Tower",
    "XVII": "The Star",
    "XVIII": "The Moon",
    "XIX": "The Sun",
    "XX": "Judgement",
    "XXI": "The World"
  },
  es: {
    "0": "El Loco",
    "I": "El Mago",
    "II": "La Sacerdotisa",
    "III": "La Emperatriz",
    "IV": "El Emperador",
    "V": "El Hierofante",
    "VI": "Los Enamorados",
    "VII": "El Carro",
    "VIII": "La Fuerza",
    "IX": "El Ermitaño",
    "X": "La Rueda de la Fortuna",
    "XI": "La Justicia",
    "XII": "El Colgado",
    "XIII": "La Muerte",
    "XIV": "La Templanza",
    "XV": "El Diablo",
    "XVI": "La Torre",
    "XVII": "La Estrella",
    "XVIII": "La Luna",
    "XIX": "El Sol",
    "XX": "El Juicio",
    "XXI": "El Mundo"
  }
};

// Obtener el nombre de la carta en el idioma actual
function getCardName(cardKey) {
  const lang = getCurrentLang();
  const names = tarotCardNames[lang] || tarotCardNames.de;
  return names[cardKey] || cardKey;
}

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

// Leer deck de la URL (?deck=tarot_surrealista)
const urlParams = new URLSearchParams(window.location.search);
const selectedDeck = urlParams.get("deck");

// Carpeta de cartas — si viene por URL usa esa, si no usa el default
const defaultFolder = "tarot_caravaggio";
const tarotFolders = {
  de: selectedDeck || defaultFolder,
  en: selectedDeck || defaultFolder,
  es: selectedDeck || defaultFolder,
};

// Set data-deck attribute on body for deck-specific CSS
document.body.dataset.deck = selectedDeck || defaultFolder;

// Para recordar la última tirada
let lastDrawType = null;  // "one" | "triad" | null
let lastCards = null;     // string | string[]

// Función para crear carta volteada
function crearCartaHTML(nombreCarta) {
  const nombreArchivo = imagenesCartas[nombreCarta] || "reverse.webp";
  const cartaId = `carta-${Math.random().toString(36).substr(2, 9)}`;
  const folder = tarotFolders[currentTarotLang] || tarotFolders.de;
  const cardName = getCardName(nombreCarta);
  const romanNumeral = nombreCarta;

  // Debug: ver en consola qué carpeta está usando
  console.log("Usando carpeta:", folder, "para carta:", nombreCarta);

  return `
    <div class="tarot-card" id="${cartaId}">
      <div class="card-inner">
        <div class="card-side card-front">
          <img src="${folder}/${nombreArchivo}" alt="${nombreCarta}">
          <span class="card-numeral">${romanNumeral}</span>
          <span class="card-title">${cardName}</span>
        </div>
        <div class="card-side card-back">
          <img src="${folder}/reverso.png" alt="Reverso">
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
const unaCartaBtn = document.getElementById("una-carta");
if (unaCartaBtn) {
  unaCartaBtn.addEventListener("click", () => {
    const carta = sacarUnaCarta();
    lastDrawType = "one";
    lastCards = carta;
    renderUnaCarta(carta);
  });
}

const triadaBtn = document.getElementById("triada");
if (triadaBtn) {
  triadaBtn.addEventListener("click", () => {
    const cartas = sacarTriada();
    lastDrawType = "triad";
    lastCards = cartas;
    renderTriada(cartas);
  });
}

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

function getCurrentLang() {
  if (typeof window !== "undefined" && window.currentLang) {
    return window.currentLang;
  }
  if (typeof currentLang !== "undefined" && currentLang) {
    return currentLang;
  }
  return "de";
}
// Función helper para obtener textos traducidos del oráculo
function getOracleText(key) {
  const lang = getCurrentLang();
  return (languagesContent && languagesContent[lang] && languagesContent[lang][key]) || '';
}

function scrollToOracleAnswer() {
  const answerEl = document.getElementById("oracle-answer");
  if (!answerEl) return;

  const offset = 120;
  const targetY = answerEl.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({
    top: Math.max(targetY, 0),
    behavior: "smooth",
  });
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

  // Pull inmediato hacia la zona de respuesta, incluso si faltan datos
  scrollToOracleAnswer();

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
  scrollToOracleAnswer();

  try {

    const API_URL = "https://wilmer-florez.vercel.app/api/tarot"; // BACKEND EN VERCEL

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question,
        cards,
        drawType: lastDrawType,
        language: getCurrentLang(),
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
  askOracleBtn.addEventListener("click", () => {
    // Primer tirón inmediato al hacer click
    scrollToOracleAnswer();

    // Segundo ajuste breve para navegadores móviles / barras dinámicas
    requestAnimationFrame(() => scrollToOracleAnswer());

    preguntarAlOraculo();
  });
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
  tarotQuestionTextarea.addEventListener("focus", function () {
    if (this.value === this.placeholder) {
      this.value = "";
    }
  });
}



