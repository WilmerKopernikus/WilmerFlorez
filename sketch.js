// p5.js: Twinkling yellow stars on a black background

let stars = [];

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent("sketch-container");
  c.position(0, 0);
  c.style('z-index', '-1');
  c.style('position', 'fixed');
  noStroke();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // Ambient stars across the screen
  if (random() < 0.2) {
    stars.push(new Star(random(width), random(height)));
  }

  // Update & draw stars, remove dead ones
  for (let i = stars.length - 1; i >= 0; i--) {
    stars[i].update();
    stars[i].draw();
    if (stars[i].isDead()) stars.splice(i, 1);
  }

  // Keep it bounded
  if (stars.length > 400) stars.splice(0, stars.length - 400);
}

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.baseSize = random(3, 6);
    this.points = 4; // 4-pointed stars
    this.innerRatio = random(0.35, 0.55);

    this.life = 0;
    this.lifespan = random(40, 120); // frames
    this.fadeOutStart = this.lifespan * random(0.45, 0.7);

    this.pulseSpeed = random(0.08, 0.18);
    this.pulsePhase = random(TWO_PI);

    this.rotation = 0;
    this.rotSpeed = 0;

    this.maxAlpha = random(160, 255);
  }

  update() {
    this.life++;
    this.rotation += this.rotSpeed;
  }

  draw() {
    // Pulse factor for "shine"
    const pulse = 0.6 + 0.4 * sin(this.pulsePhase + this.life * this.pulseSpeed);

    // Alpha envelope: fade in -> hold -> fade out
    let a = this.maxAlpha;
    if (this.life < 12) {
      a = map(this.life, 0, 12, 0, this.maxAlpha);
    } else if (this.life > this.fadeOutStart) {
      a = map(this.life, this.fadeOutStart, this.lifespan, this.maxAlpha, 0);
    }
    a = constrain(a, 0, 255);

    const outerR = this.baseSize * (0.8 + 0.6 * pulse);
    const innerR = outerR * this.innerRatio;

    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    // Glow layers (drawn first, larger and more transparent)
    // Using multiple soft layers to simulate bloom without shaders
    for (let g = 3; g >= 1; g--) {
      const glowR = outerR * (1.2 + g * 0.35);
      const glowA = a * (0.10 / g);
      fill(255, 220, 80, glowA);
      starShape(0, 0, glowR * this.innerRatio, glowR, this.points);
    }

    // Core star
    fill(255, 230, 90, a);
    starShape(0, 0, innerR, outerR, this.points);

    pop();
  }

  isDead() {
    return this.life >= this.lifespan;
  }
}

// Draw a star polygon
function starShape(x, y, innerRadius, outerRadius, npoints) {
  const angle = TWO_PI / npoints;
  const halfAngle = angle / 2.0;

  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    const sx = x + cos(a) * outerRadius;
    const sy = y + sin(a) * outerRadius;
    vertex(sx, sy);

    const sx2 = x + cos(a + halfAngle) * innerRadius;
    const sy2 = y + sin(a + halfAngle) * innerRadius;
    vertex(sx2, sy2);
  }
  endShape(CLOSE);
}
