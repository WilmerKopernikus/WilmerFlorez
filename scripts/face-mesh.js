let video;
let faceMesh;
let faces = [];
let triangles;

// Color sequence — null signals "random per triangle" mode
let colors = [
  [255, 0, 0],
  [0, 255, 0],
  [0, 0, 255],
  [255, 255, 0],
  [0, 255, 255],
  [255, 255, 255],
  null
];

let currentColorIndex = 0;
let currentColor = [0, 0, 0];

// Random mode — pre-generated palette, refreshed every N frames
let randomColors = [];
const RANDOM_UPDATE_INTERVAL = 12; // frames between colour changes
let randomFrameCount = 0;

// Mouth detection
let mouthWasOpen = false;
let mouthThreshold = 12;

function preload() {
  faceMesh = ml5.faceMesh({ maxFaces: 1, flipped: true });
}

function mousePressed() {
  console.log(faces);
}

function downloadImage() {
  saveCanvas('face-mesh', 'png');
}

function gotFaces(results) {
  faces = results;
}

function updateColorWithMouth(face) {
  let kp = face.keypoints;

  // Upper lip and lower lip distance
  let mouthOpenDist = abs(kp[13].y - kp[14].y);
  let mouthIsOpen = mouthOpenDist > mouthThreshold;

  // Change color only at the moment the mouth opens
  if (mouthIsOpen && !mouthWasOpen) {
    currentColor = colors[currentColorIndex];

    currentColorIndex++;
    if (currentColorIndex >= colors.length) {
      currentColorIndex = 0;
    }
  }

  mouthWasOpen = mouthIsOpen;
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');

  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  faceMesh.detectStart(video, gotFaces);

  triangles = faceMesh.getTriangles();
}

function draw() {
  let randomMode = (currentColor === null);
  if (randomMode) {
    background(0);
  } else {
    background(currentColor[0], currentColor[1], currentColor[2]);
  }

  video.loadPixels();

  if (faces.length > 0) {
    let face = faces[0];

    updateColorWithMouth(face);
    randomMode = (currentColor === null);

    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    for (let kp of face.keypoints) {
      if (kp.x < minX) minX = kp.x;
      if (kp.x > maxX) maxX = kp.x;
      if (kp.y < minY) minY = kp.y;
      if (kp.y > maxY) maxY = kp.y;
    }

    let faceCX = (minX + maxX) / 2;
    let faceCY = (minY + maxY) / 2;

    push();
    translate(width / 2, height / 2);
    scale(2);
    translate(-faceCX, -faceCY);

    if (!randomMode) randomSeed(5);
    beginShape(TRIANGLES);

    for (let i = 0; i < triangles.length; i++) {
      let tri = triangles[i];
      let [a, b, c] = tri;

      let pointA = face.keypoints[a];
      let pointB = face.keypoints[b];
      let pointC = face.keypoints[c];

      let cx = (pointA.x + pointB.x + pointC.x) / 3;
      let cy = (pointA.y + pointB.y + pointC.y) / 3;

      let index = (floor(cx) + floor(cy) * video.width) * 4;

      let rr = video.pixels[index];
      let gg = video.pixels[index + 1];
      let bb = video.pixels[index + 2];

      if (randomMode) {
        let rc = [random(255), random(255), random(255)];
        stroke(rc[0], rc[1], rc[2]);
        fill(rc[0], rc[1], rc[2]);
      } else {
        stroke(currentColor[0], currentColor[1], currentColor[2]);
        fill(rr, gg, bb);
      }

      vertex(pointA.x, pointA.y);
      vertex(pointB.x, pointB.y);
      vertex(pointC.x, pointC.y);
    }

    endShape();
    pop();
  }
}