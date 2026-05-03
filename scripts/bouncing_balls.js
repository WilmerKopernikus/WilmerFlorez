// TODO: Set up how many balls we want
let ballCount = 100;
// TODO: Set up x and y position variable to equal an empty array
let x = [];
let y = [];
// TODO: Set up speed, size and color variable to equal an empty array
let xSpeed = [];
let ySpeed = [];
let size = [];
let r = [];
let g = [];
let b = [];
let canvas;

function setup() {
  canvas = createCanvas(window.visualViewport.width, window.visualViewport.height);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Ensures it stays behind content
  canvas.style('position', 'fixed');

  // TODO: Create a for loop that iterates through i until it reaches the ball count value
  for (let i = 0; i < ballCount; i++) {
    // Inside the for loop:
    // TODO: Set x and y position to be the center
    x[i] = width / 2;
    y[i] = height / 2;
    // TODO: Set the speeds to be random
    xSpeed[i] = random(-5, 5);
    ySpeed[i] = random(-5, 5);
    // TODO: Set the size to be random
    size[i] = random(10, 50);
    // TODO: Set the colors to be random
    r[i] = random(0, 255);
    g[i] = random(0, 255);
    b[i] = random(0, 255);
  }
}

function draw() {
  background(0, 50);

  // TODO: Iterate through a new for loop to change the properties in order to animate the balls
  for (let i = 0; i < ballCount; i++) {
    // Inside the for loop:
    // TODO: Increment speed for x position
    noStroke();
    ellipse(x[i], y[i], size[i]);
    x[i] += xSpeed[i];
    // TODO: Increment speed for y position
    y[i] += ySpeed[i];
    // TODO: Reverse x direction if ball hits left or right sides
    if (x[i] < 0 || x[i] > width) {
      xSpeed[i] = xSpeed[i] * -1;
    }

    // TODO: Reverse y direction if ball hits top or bottom sides
    if (y[i] < 0 || y[i] > height) {
      ySpeed[i] = ySpeed[i] * -1;
    }

    // TODO: Set random R, G, B values
    fill(r[i], g[i], b[i]);

    // TODO: Style to have no strokes


    // TODO: Draw the bouncing balls

  }
} 