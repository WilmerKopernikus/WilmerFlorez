let cellsrows, cellscols; // Declaramos las variables sin asignarles un valor aún
const offset = 20; // Define el desplazamiento (offset) como 40
const margin = offset / 4; // Calcula el margen como un cuarto del desplazamiento
let w, h; // Declara variables para el ancho (w) y alto (h) de las celdas

function setup() {
  // Implementamos las condiciones basadas en el tamaño de la ventana

  let proportion = windowWidth / windowHeight;

  if (proportion >= 2) {
    cellsrows = 8;
    cellscols = 16;
  } else if (proportion >= 0.66 && proportion < 2) {
    cellsrows = 6;
    cellscols = 4;
  } else if (proportion <= 0.66) {
    cellsrows = 8;
    cellscols = 4;
  }

  let canvas = createCanvas(windowWidth, windowHeight, WEBGL); // Crea un lienzo en 3D que ocupa toda la ventana
  canvas.position(0, 30); // Posiciona el lienzo en la esquina superior izquierda
  canvas.style('z-index', '-2'); // Asegura que el lienzo esté detrás del contenido
  canvas.style('position', 'fixed'); // Fija la posición del lienzo para que no se desplace con el scroll

  colorMode(HSB, 360, 100, 100, 100); // Establece el modo de color a HSB con rangos personalizados
  angleMode(DEGREES); // Configura el modo de ángulo en grados

  w = (width - offset * 2 - margin * (cellscols - 1)) / cellscols; // Calcula el ancho de cada celda
  h = (height - offset * 2 - margin * (cellsrows - 1)) / cellsrows; // Calcula el alto de cada celda
}

function draw() {
  background(0); // Establece el fondo en negro
  ortho(-width / 2, width / 2, height / 2, -height / 2, 0, 1500); // Establece una proyección ortográfica
  normalMaterial(); // Aplica un material de iluminación estándar a los objetos
  for (let j = 0; j < cellsrows; j++) { // Itera sobre cada fila
    for (let i = 0; i < cellscols; i++) { // Itera sobre cada columna
      let x = map(i, 0, cellscols - 1, -width / 2 + offset, width / 2 - w - offset); // Calcula la posición x de la celda
      let y = map(j, 0, cellsrows - 1, -height / 2 + offset, height / 2 - h - offset); // Calcula la posición y de la celda
      push(); // Guarda el estado de la transformación actual
      translate(x + w / 2, y + h / 2, 0); // Traslada al centro de la celda actual
      rotateX(random(360)); // Rota aleatoriamente en el eje X
      rotateY(random(360)); // Rota aleatoriamente en el eje Y
      rotateZ(random(360)); // Rota aleatoriamente en el eje Z
      box(w / 3, h / 3); // Dibuja una caja con dimensiones w/2 y h/2
      pop(); // Restaura el estado de la transformación anterior
    }
  }
  noLoop(); // Detiene el bucle de dibujo después de la primera ejecución
}

