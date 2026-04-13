// === SCHRITT 1: Das Kartendeck definieren ===
// Die 22 Hauptarkana werden als römische Ziffern gespeichert.
// Diese Schlüssel verbinden Übersetzungen, Bilder und HTML miteinander.
const arcanosMayores = [
  "0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX",
  "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"
];

// === SCHRITT 2: Jeder Karte eine Bilddatei zuordnen ===
// Die Bilder enthalten KEINEN Text — sie sind neutrale Illustrationen.
// Der Name der Karte wird später via JavaScript als Overlay eingefügt.
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

// === SCHRITT 3: Übersetzungswörterbuch für alle 3 Sprachen ===
// Pro Sprache (de / en / es) gibt es ein Objekt mit allen 22 Namen.
// Derselbe Schlüssel ("I", "II" ...) zeigt je nach Sprache
// einen anderen Namen an — ohne das Bild zu verändern.
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

// === SCHRITT 4: Den richtigen Namen zur Laufzeit auflösen ===
// getCardName() liest die aktive Sprache und gibt den
// passenden Namen aus dem Wörterbuch zurück.
// Fallback: Deutsch, falls die Sprache nicht erkannt wird.
function getCardName(cardKey) {
  const lang = getCurrentLang();                           // aktive Sprache lesen
  const names = tarotCardNames[lang] || tarotCardNames.de; // Fallback: Deutsch
  return names[cardKey] || cardKey;                        // Name oder Schlüssel selbst
}

// === SCHRITT 5: Zufällige Karten ziehen ===
// sacarUnaCarta()  → zieht 1 zufällige Karte aus dem Deck
// sacarTriada()    → zieht 3 verschiedene Karten (ohne Wiederholung)
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

// === SCHRITT 6: DOM-Referenz und Ausgabecontainer ===
const resultado = document.getElementById("resultado");

// Aktive Sprache des Tarots (Standard: Deutsch)
let currentTarotLang = "de";

// === SCHRITT 7: Kartenordner per URL-Parameter wählen ===
// Der Benutzer kann über ?deck=tarot_bosch ein Deck auswählen.
// Fehlt der Parameter, wird das Standarddeck geladen.
const urlParams = new URLSearchParams(window.location.search);
const selectedDeck = urlParams.get("deck");

const defaultFolder = "tarot_caravaggio";
const tarotFolders = {
  de: selectedDeck || defaultFolder,
  en: selectedDeck || defaultFolder,
  es: selectedDeck || defaultFolder,
};

// data-deck am <body> setzen, damit CSS deckspezifische Stile anwenden kann
document.body.dataset.deck = selectedDeck || defaultFolder;

// Letzte Tirada speichern, um sie beim Sprachwechsel neu zu rendern
let lastDrawType = null;  // "one" | "triad" | null
let lastCards = null;     // string | string[]

// === SCHRITT 8: HTML für eine Karte erzeugen (Vorder- & Rückseite) ===
// crearCartaHTML() baut eine umklappbare Karte:
//   – Rückseite: sieht man zuerst (Karte ist verdeckt)
//   – Vorderseite: Bild + römische Ziffer + lokalisierter Name
// Der Name kommt aus getCardName(), NICHT aus dem Bild.
function crearCartaHTML(nombreCarta) {
  const nombreArchivo = imagenesCartas[nombreCarta] || "reverse.webp";
  const cartaId = `carta-${Math.random().toString(36).substr(2, 9)}`;
  const folder = tarotFolders[currentTarotLang] || tarotFolders.de;
  const cardName = getCardName(nombreCarta);
  const romanNumeral = nombreCarta;

  // Debug: aktiven Kartenordner in der Konsole ausgeben
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

// === SCHRITT 9: Karte umklappen beim Klick (einmalig) ===
// agregarVolteo() fügt jedem Karten-Element einen Click-Listener hinzu.
// Nach dem ersten Klick wird die Klasse "flipped" gesetzt →
// CSS dreht die Karte mit einer 3D-Transformation um.
// Der Listener entfernt sich danach selbst (einmaliges Ereignis).
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

// Schaltflächen mit den Zieh-Aktionen verbinden
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

// === SCHRITT 10: Sprachenwechsel — Tirada live neu rendern ===
// Klickt der Benutzer auf einen Sprachbutton (.lang-button),
// wird currentTarotLang aktualisiert und die letzte Tirada
// sofort neu gezeichnet — mit den Namen in der neuen Sprache.
// Kein Seiten-Reload, keine neuen Bilder: nur neues HTML.
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".lang-button");
  if (!btn) return;

  const lang = btn.dataset.lang;

  if (lang === "de" || lang === "en") {
    currentTarotLang = lang;
    console.log("Idioma del tarot ahora:", currentTarotLang);

    // Letzte Tirada im neuen Idiom neu rendern (falls vorhanden)
    if (lastDrawType === "one" && lastCards) {
      renderUnaCarta(lastCards);
    } else if (lastDrawType === "triad" && Array.isArray(lastCards)) {
      renderTriada(lastCards);
    } else {
      // Keine vorherige Tirada — Ausgabebereich leeren
      resultado.innerHTML = "";
    }
  }
});

// === SCHRITT 11: Hilfsfunktionen für das KI-Orakel ===

// Aktive Sprache aus dem globalen window-Objekt lesen (gesetzt von languages_content.js)
function getCurrentLang() {
  if (typeof window !== "undefined" && window.currentLang) {
    return window.currentLang;
  }
  if (typeof currentLang !== "undefined" && currentLang) {
    return currentLang;
  }
  return "de";
}
// Übersetzten UI-Text für das Orakel aus dem globalen Sprachdict abrufen
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

// Letzte Tirada als einheitliches Array zurückgeben (1 oder 3 Karten)
function getCardsArray() {
  if (lastDrawType === "one" && lastCards) {
    return [lastCards]; // eine Karte
  }
  if (lastDrawType === "triad" && Array.isArray(lastCards)) {
    return lastCards;   // drei Karten
  }
  return [];
}

async function preguntarAlOraculo() {
  const questionEl = document.getElementById("tarot-question");
  const answerEl = document.getElementById("oracle-answer");

  if (!questionEl || !answerEl) return;

  // Sofort zur Antwortzone scrollen, auch wenn noch Daten fehlen
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

    const API_URL = "https://wilmer-florez.vercel.app/api/tarot"; // Geschützter Backend-Endpoint auf Vercel

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

// === SCHRITT 12: Orakel-Button und Textarea initialisieren ===
const askOracleBtn = document.getElementById("ask-oracle-btn");
if (askOracleBtn) {
  askOracleBtn.addEventListener("click", () => {
    // Sofortiger Scroll beim Klick
    scrollToOracleAnswer();

    // Zweiter Scroll-Versuch für mobile Browser mit dynamischer Adressleiste
    requestAnimationFrame(() => scrollToOracleAnswer());

    preguntarAlOraculo();
  });
}

// Textarea bereinigen: fälschlich eingetragener Value wird als Placeholder behandelt
const tarotQuestionTextarea = document.getElementById("tarot-question");
if (tarotQuestionTextarea) {
  // Falls Value wie ein Placeholder aussieht, korrekt umwandeln
  if (tarotQuestionTextarea.value.trim() && !tarotQuestionTextarea.placeholder) {
    tarotQuestionTextarea.placeholder = tarotQuestionTextarea.value;
    tarotQuestionTextarea.value = "";
  }

  // Feld leeren wenn es den Placeholder-Text als Value enthält (beim Fokus)
  tarotQuestionTextarea.addEventListener("focus", function () {
    if (this.value === this.placeholder) {
      this.value = "";
    }
  });
}



