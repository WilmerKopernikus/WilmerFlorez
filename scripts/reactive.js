let particles;
let traces;
let splines;
let maxParticles = 1000;
let maxTraces = 2000;
let particleSize = 10;
let traceSize = 3;
let traceLength = 15; // Number of frames before trace disappears (50% faster, originally 30)
let maxConnections = 4; // Maximum number of connections for each particle
let maxLifespan = 120;
let maxDistance = 100;

let startParticles = 30; // number of starting particles
let inactivityTimer;
let inactivityDuration = 4500; // 3.5 seconds
let showInactivityMessage = false;

let canvas;

function setup() {
  canvas = createCanvas(window.visualViewport.width, window.visualViewport.height);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Ensures it stays behind content
  canvas.style('position', 'fixed');
  
  background(0);
  particles = [];
  traces = [];
  splines = [];
  maxDistance = windowWidth/12;
  // Add particles to start with
  for (let i = 0; i < startParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  
  inactivityTimer = millis();
}

function draw() {
  background(0);
  
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.isFinished()) {
      particles.splice(i, 1);
    }
  }
  
  for (let i = traces.length - 1; i >= 0; i--) {
    let t = traces[i];
    t.update();
    t.display();
    if (t.isFinished()) {
      traces.splice(i, 1);
    }
  }
  
  // Update and display splines
  for (let i = splines.length - 1; i >= 0; i--) {
    let s = splines[i];
    s.update();
    s.display();
    if (s.isFinished()) {
      splines.splice(i, 1);
    }
  }
  
  // Connect particles with splines
  connectParticles();
  
  fill(90);
  noStroke();
	textAlign(RIGHT);
  textSize(13);
  text( windowWidth-25, windowHeight-15); // for textbox add the following after widnowHeight-80: ,180, 80
  
   // Check for inactivity
	if (particles.length == 0 && millis() - inactivityTimer > inactivityDuration) {
	showInactivityMessage = true;
	}
	

  // Display inactivity message
  if (showInactivityMessage) {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("move the mouse to create some particles", width / 2, height / 2);
  }
}

function connectParticles() {
  splines = []; // Clear existing splines
  
  for (let i = 0; i < particles.length; i++) {
    let p1 = particles[i];
    let connectedCount = 0; // Number of connections for the current particle
    
    for (let j = 0; j < particles.length; j++) {
      if (i !== j && connectedCount < maxConnections) { // Avoid self-connection and exceeding maximum connections
        let p2 = particles[j];
        if (dist(p1.x, p1.y, p2.x, p2.y) < maxDistance) { // Connect if particles are close enough
          splines.push(new Spline(p1.x, p1.y, p2.x, p2.y));
          connectedCount++;
        }
      }
    }
  }
}

function mouseMoved() {
  if (particles.length < maxParticles) {
    particles.push(new Particle(mouseX, mouseY));
  }
  inactivityTimer = millis(); // Reset inactivity timer
  showInactivityMessage = false; // Hide inactivity message
}

class Particle {
  constructor(x, y, isTrace = false) {
    this.x = x;
    this.y = y;
    this.dx = random(-1, 1) * 1.5; // Increase speed by 50%
    this.dy = random(-1, 1) * 1.5; // Increase speed by 50%
    this.lifespan = isTrace ? traceLength : maxLifespan; // 60 frames per second * 1 second (50% faster, originally 120)
    this.size = isTrace ? traceSize : particleSize;
    this.isTrace = isTrace;
    this.creationTime = frameCount; // Record creation time
  }

  update() {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.size = 0;
    }
    if (!this.isTrace) {
      traces.push(new Particle(this.x, this.y, true));
    }
    if (this.isTrace) {
      this.lifespan--;
      if (this.lifespan <= 0) {
        this.size = 0;
      }
    }
    if (frameCount - this.creationTime >= this.lifespan) {
      this.size = 0; // Remove particle after lifespan is over
    }
  }

  isFinished() {
    return this.size === 0;
  }

  display() {
    noStroke();
    fill(255, 127);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

class Spline {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.splineColor = color(255);
  }

  update() {
    // Spline does not change over time
  }

  isFinished() {
    // Spline never finishes
    return false;
  }

  display() {
    strokeWeight(1);
    stroke(this.splineColor);
    noFill();
    bezier(this.startX, this.startY, this.startX, this.startY, this.endX, this.endY, this.endX, this.endY);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
