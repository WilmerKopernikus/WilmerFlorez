// === Generar la baraja ===
const arcanosMayores = ["El Loco", "El Mago", "La Sacerdotisa", "La Emperatriz", "El Emperador", 
  "El Sumo Sacerdote", "Los Enamorados", "El Carro", "La Fuerza", "El Ermitaño",
  "La Rueda de la Fortuna",  "La Justicia", "El Colgado", "La Muerte", "La Templanza", "El Diablo", 
  "La Torre", "La Estrella", "La Luna", "El Sol", "El Juicio", "El Mundo"];

// Relacionar cartas con nombres de archivo (en minúsculas y con guiones)
const imagenesCartas = {
  "El Loco": "00_Il_Matto.jpg",
  "El Mago": "01_Il_Bagatto.jpg",
  "La Sacerdotisa": "02_La_Papessa.jpg",
  "La Emperatriz": "03_L'Imperatrice.jpg",
  "El Emperador": "04_L'Imperatore.jpg",
  "El Sumo Sacerdote": "05_Il_Papa.jpg",
  "Los Enamorados": "06_Gli_Innamorati.jpg",
  "El Carro": "07_Il_Carro.jpg",
  "La Fuerza": "11_La_Forza.jpg",
  "El Ermitaño": "09_L'Eremita.jpg",
  "La Rueda de la Fortuna": "10_La_Ruota.jpg",  
  "La Justicia": "08_La_Giustizia.jpg",
  "El Colgado": "12_L'Appeso.jpg",
  "La Muerte": "13_La_Morte.jpg",
  "La Templanza": "14_La_Temperanza.jpg",
  "El Diablo": "15_Il_Diavolo.jpg",
  "La Torre": "16_La_Torre.jpg",
  "La Estrella": "17_ Le_Stelle.jpg",
  "La Luna": "18_La_Luna.jpg",
  "El Sol": "19_Il_Sole.jpg",
  "El Juicio": "20_Il_Giudizio.jpg",
  "El Mundo": "21_Il_Mondo.jpg",
};

  /*
const palos = ["Oros", "Copas", "Espadas", "Bastos"];
const figuras = ["Sota", "Caballo", "Reina", "Rey"];
const arcanosMenores = [];

palos.forEach(palo => {
  for (let i = 1; i <= 10; i++) {
    arcanosMenores.push(`${i} de ${palo}`);
  }
  figuras.forEach(figura => {
    arcanosMenores.push(`${figura} de ${palo}`);
  });
});

*/


//const tarot = [...arcanosMayores, ...arcanosMenores];

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

// Función para crear carta volteada
function crearCartaHTML(nombreCarta) {
  const nombreArchivo = imagenesCartas[nombreCarta] || "reverso2.jpg"; // fallback
  const cartaId = `carta-${Math.random().toString(36).substr(2, 9)}`;

  return `
    <div class="tarot-card" id="${cartaId}">
      <div class="card-inner">
        <div class="card-side card-front">
          <img src="${nombreArchivo}" alt="${nombreCarta}">
        </div>
        <div class="card-side card-back">
          <img src="reverso2.jpg" alt="Reverso">
        </div>
      </div>
      <!--<p><strong>${nombreCarta}</strong></p>>-->
    </div>
  `;
}

document.getElementById("una-carta").addEventListener("click", () => {
  const carta = sacarUnaCarta();
  resultado.innerHTML = crearCartaHTML(carta);
  agregarVolteo();
});

document.getElementById("triada").addEventListener("click", () => {
  const cartas = sacarTriada();
  resultado.innerHTML = cartas.map(c => crearCartaHTML(c)).join("");
  agregarVolteo();
});

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



