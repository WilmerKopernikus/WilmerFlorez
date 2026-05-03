let canvas;

function setup() {


  canvas = createCanvas(window.visualViewport.width, window.visualViewport.height);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Ensures it stays behind content
  canvas.style('position', 'fixed');

  let g1 = Math.floor(Math.random() * 20);
  let b1 = Math.floor(Math.random() * 256);
  let g2 = Math.floor(Math.random() * 20);
  let b2 = Math.floor(Math.random() * 256);

  for (let x = 0; x < width; x++) {
    let inter = x / width;
    let g = Math.floor(lerp(g1, g2, inter));
    let b = Math.floor(lerp(b1, b2, inter));

    stroke(0, g, b);
    line(x, 0, x, height);
  }

  fill('red');
  noStroke();
  circle(Math.floor(Math.random() * (windowWidth)), Math.floor(Math.random() * (windowHeight)), Math.floor(Math.random() * 800));
  // Triangle with vertical gradient between (255,100,0) and (255,170,0)
  // Random green value for the middle vertex
  let tx1 = Math.floor(Math.random() * (windowWidth));
  let ty1 = Math.floor(Math.random() * (windowHeight));
  let tx2 = Math.floor(Math.random() * (windowWidth));
  let ty2 = Math.floor(Math.random() * (windowHeight));
  let tx3 = Math.floor(Math.random() * (windowWidth));
  let ty3 = Math.floor(Math.random() * (windowHeight));
  let gMiddle = Math.floor(Math.random() * (170 - 100 + 1)) + 100;
  // Draw triangle with gradient
  noStroke();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.moveTo(tx1, ty1);
  drawingContext.lineTo(tx2, ty2);
  drawingContext.lineTo(tx3, ty3);
  drawingContext.closePath();
  drawingContext.clip();
  // Find bounding box for the triangle
  let minY = Math.min(ty1, ty2, ty3);
  let maxY = Math.max(ty1, ty2, ty3);
  for (let y = minY; y <= maxY; y++) {
    // Interpolate green value vertically
    let inter = (y - minY) / (maxY - minY);
    let g = Math.floor(lerp(100, 170, inter));
    fill(255, g, 0);
    rect(Math.min(tx1, tx2, tx3), y, Math.abs(Math.max(tx1, tx2, tx3) - Math.min(tx1, tx2, tx3)), 1);
  }
  drawingContext.restore();
  // Optionally, draw triangle outline
  // stroke(0);
  // noFill();
  // triangle(tx1, ty1, tx2, ty2, tx3, ty3);
  // Quad with vertical gradient between (255,100,0) and (255,170,0)
  let qx1 = Math.floor(Math.random() * (windowWidth));
  let qy1 = Math.floor(Math.random() * (windowHeight));
  let qx2 = Math.floor(Math.random() * (windowWidth));
  let qy2 = Math.floor(Math.random() * (windowHeight));
  let qx3 = Math.floor(Math.random() * (windowWidth));
  let qy3 = Math.floor(Math.random() * (windowHeight));
  let qx4 = Math.floor(Math.random() * (windowWidth));
  let qy4 = Math.floor(Math.random() * (windowHeight));
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.moveTo(qx1, qy1);
  drawingContext.lineTo(qx2, qy2);
  drawingContext.lineTo(qx3, qy3);
  drawingContext.lineTo(qx4, qy4);
  drawingContext.closePath();
  drawingContext.clip();
  let minYq = Math.min(qy1, qy2, qy3, qy4);
  let maxYq = Math.max(qy1, qy2, qy3, qy4);
  for (let y = minYq; y <= maxYq; y++) {
    let inter = (y - minYq) / (maxYq - minYq);
    let g = Math.floor(lerp(60, 170, inter));
    fill(255, g, 0);
    rect(Math.min(qx1, qx2, qx3, qx4), y, Math.abs(Math.max(qx1, qx2, qx3, qx4) - Math.min(qx1, qx2, qx3, qx4)), 1);
  }
  drawingContext.restore();

}

function draw() {
  //line(Math.floor(Math.random() * 1500), Math.floor(Math.random() * 1500), Math.floor(Math.random() * 1500), Math.floor(Math.random() * 1500));
  //rect(Math.floor(Math.random() * 800), Math.floor(Math.random() * 800), Math.floor(Math.random() * 200), Math.floor(Math.random() * 200));
  //ellipse(Math.floor(Math.random() * 400), Math.floor(Math.random() * 800), Math.floor(Math.random() * 140), Math.floor(Math.random() * 70));
  //noLoop();

}

