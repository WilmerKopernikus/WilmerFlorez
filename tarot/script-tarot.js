// === Generar la baraja ===
const arcanosMayores = ["El Loco", "El Mago", "La Sacerdotisa", "La Emperatriz", "El Emperador", 
  "El Sumo Sacerdote", "Los Enamorados", "El Carro", "La Fuerza", "El Ermitaño",
  "La Rueda de la Fortuna",  "La Justicia", "El Colgado", "La Muerte", "La Templanza", "El Diablo", 
  "La Torre", "La Estrella", "La Luna", "El Sol", "El Juicio", "El Mundo"];

// Relacionar cartas con nombres de archivo (en minúsculas y con guiones)
const imagenesCartas = {
  "El Loco": "el-loco.webp",
  "El Mago": "el-mago.webp",
  "La Sacerdotisa": "la-sacerdotisa.webp",
  "La Emperatriz": "la-emperatriz.webp",
  "El Emperador": "el-emperador.webp",
  "El Sumo Sacerdote": "el-sumo-sacerdote.webp",
  "Los Enamorados": "los-enamorados.webp",
  "El Carro": "el-carro.webp",
  "La Fuerza": "la-fuerza.webp",
  "El Ermitaño": "el-ermitaño.webp",
  "La Rueda de la Fortuna": "la-rueda-de-la-fortuna.webp",  
  "La Justicia": "la-justicia.webp",
  "El Colgado": "el-colgado.webp",
  "La Muerte": "la-muerte.webp",
  "La Templanza": "la-templanza.webp",
  "El Diablo": "el-diablo.webp",
  "La Torre": "la-torre.webp",
  "La Estrella": "la-estrella.webp",
  "La Luna": "la-luna.webp",
  "El Sol": "el-sol.webp",
  "El Juicio": "el-juicio.webp",
  "El Mundo": "el-mundo.webp",
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
    const nombreArchivo = imagenesCartas[nombreCarta] || "reverse.webp"; // fallback
    const cartaId = `carta-${Math.random().toString(36).substr(2, 9)}`;
  
    return `
      <div class="tarot-card" id="${cartaId}">
        <div class="card-inner">
          <div class="card-side card-front">
            <img src="tarot2/${nombreArchivo}" alt="${nombreCarta}">
          </div>
          <div class="card-side card-back">
            <img src="tarot2/reverse.webp" alt="Reverso">
          </div>
        </div>
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



