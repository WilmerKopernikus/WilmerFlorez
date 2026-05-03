let canvas;

function setup() {
  canvas = createCanvas(window.visualViewport.width, window.visualViewport.height);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Ensures it stays behind content
  canvas.style('position', 'fixed');
  noStroke();

  // TODO: Move background() in draw() function here
  background(75);
}

function draw() {
  // TODO: Move below background() to setup()


  // TODO: Set fill() using mouseX and mouseY variables
  fill((mouseX / 2), 135, (mouseY / 2))
  // TODO: Draw an ellipse using mouseX and mouseY for the x and y position
  ellipse(mouseX, mouseY, 75, 75);
}