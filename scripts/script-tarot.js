// === Generar la baraja ===
const arcanosMayores = ["El Loco", "El Mago", "La Sacerdotisa", "La Emperatriz", "El Emperador", 
  "El Sumo Sacerdote", "Los Enamorados", "El Carro", "La Fuerza", "El Ermitaño",
  "La Rueda de la Fortuna",  "La Justicia", "El Colgado", "La Muerte", "La Templanza", "El Diablo", 
  "La Torre", "La Estrella", "La Luna", "El Sol", "El Juicio", "El Mundo"];

// Relacionar cartas con nombres de archivo (en minúsculas y con guiones)
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
  "La Muerte": "13..jpg",
  "La Templanza": "14.jpg",
  "El Diablo": "15.jpg",
  "La Torre": "16.jpg",
  "La Estrella": "17.jpg",
  "La Luna": "18.jpg",
  "El Sol": "19.jpg",
  "El Juicio": "20.jpg",
  "El Mundo": "21.jpg",
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
            <img src="tarot_deutsch/${nombreArchivo}" alt="${nombreCarta}">
          </div>
          <div class="card-side card-back">
            <img src="tarot2/reverso.jpg" alt="Reverso">
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



