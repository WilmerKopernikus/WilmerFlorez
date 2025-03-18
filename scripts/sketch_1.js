

let particles = [];
var fade;          // for the fade effect
var fadeAmount = 1;
var canvas;



function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  fade = 0;
  for (var i = -100; i < width + 100; i += 20) {  // Start particles further outside the canvas
    for (var o = -100; o < height + 100; o += 5) {  // Start particles further outside the canvas
      particles.push({
        x: i,
        y: o,
        clr: color(255, 255, 255, 250)  // White color for particles
      });
    }
  }
  background(0);  // Initial black background
}

function draw() {
  background(0, 10);  // Less transparent black background for more persistent trails

  for (var i = 0; i < particles.length; i++) {
    let p = particles[i];
    fill(255, 255, 255, 255);  // Bright white color for particles
    noStroke();  // Remove the outline of particles
    ellipse(p.x + 30, p.y + 30, 1);
    p.x += (noise(p.x * 0.005, p.y * 0.005, frameCount * 0.005) - 0.5) * 2;
    p.y += (noise(p.x * 0.005 + 10000, p.y * 0.005 + 10000, frameCount * 0.005) - 0.5) * 2;
  }
}