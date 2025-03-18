function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Ensures it stays behind content
  canvas.style('position', 'fixed'); 
}

function draw() {
  // Access the 2D rendering context
  let ctx = drawingContext;

  // Clear the canvas each frame
  clear();

  // Create a radial gradient centered at the mouse position
  let gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 700);

  // Define color stops for the gradient
  gradient.addColorStop(0, '#006cff');
  gradient.addColorStop(1, '#000000');


  // Set the fill style to the gradient
  ctx.fillStyle = gradient;

  // Draw a rectangle covering the entire canvas
  ctx.fillRect(0, 0, width, height);
}
