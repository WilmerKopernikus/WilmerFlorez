let d = 1;
function setup() {
  canvas = createCanvas(window.visualViewport.width, window.visualViewport.height, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Ensures it stays behind content
  canvas.style('position', 'fixed');
  strokeWeight(2);
  fill(0, 0, 0, 0);
  noFill();
}
function draw() {

  t = frameCount / 200;
  background((1 * cos(t / 2) * cos(t / 2)), (255 * cos(t / 2) * cos(t / 2)), (1 * cos(t / 2) * cos(t / 2)));
  stroke((1 * sin(t / 2) * sin(t / 2)), (255 * sin(t / 2) * sin(t / 2)), (1 * sin(t / 2) * sin(t / 2)));
  rotateX(t);
  rotateY(t);
  rotateZ(t);

  d = 1;
  push();
  rotateY(d * cos(t))
  rotateX(d * cos(t))
  box(width / 2 / d, width / 2 / d, width / 2 / d);
  pop();
  for (let i = 0; i < 9; i++) {
    push();
    rotateX(i * sin(t))
    translate(0, 0, i * sin(t))
    box(width / 2 / d, width / 2 / d, width / 2 / d);
    pop();
    d = d * (d + 1);
  }
}
