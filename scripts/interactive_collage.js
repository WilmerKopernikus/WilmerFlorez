let img;
let stamps = [];
let glitchEnabled = false;
let previewEnabled = true;
let noiseEnabled = false;
let images = [];
let currentImageIndex = 0;
let canvas;

const imageSrcs = [
  "imagenes/collage/lips.jpg",
  "imagenes/collage/statue.png",
  "imagenes/collage/uroboros.png",
  "imagenes/collage/Hercules.png",
  "imagenes/collage/eclipse.jpg"
];

function preload() {
  // Only load the first image upfront — the rest load on demand
  images[0] = loadImage(imageSrcs[0]);
  img = images[0];
}

function setup() {
  canvas = createCanvas(window.visualViewport.width, window.visualViewport.height);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  background(255);

  // Set up button functionality
  const glitchButton = document.getElementById("glitchToggle");
  if (glitchButton) glitchButton.addEventListener("click", toggleGlitch);

  const previewButton = document.getElementById("previewToggle");
  if (previewButton) previewButton.addEventListener("click", togglePreview);

  const noiseButton = document.getElementById("noiseToggle");
  if (noiseButton) noiseButton.addEventListener("click", toggleNoise);

  const changeImageButton = document.getElementById("changeImage");
  if (changeImageButton) changeImageButton.addEventListener("click", changeImage);
}

function draw() {
  background(255);

  for (let stamp of stamps) {
    if (stamp.wasGlitched) {
      if (stamp.displacedImg) {
        // Both glitch and noise effects
        drawGlitchImage(stamp.displacedImg, stamp.x, stamp.y, stamp.slices);
      } else {
        // Only glitch effect
        drawGlitchImage(stamp.sourceImg, stamp.x, stamp.y, stamp.slices);
      }
    } else if (stamp.displacedImg) {
      // Only noise effect
      image(stamp.displacedImg, stamp.x, stamp.y);
    } else {
      // Normal image
      image(stamp.sourceImg, stamp.x, stamp.y);
    }
  }

  // Preview following the mouse (only show if previewEnabled)
  if (previewEnabled) {
    if (glitchEnabled) {
      image(img, mouseX - img.width / 2, mouseY - img.height / 2);
    } else {
      image(img, mouseX - img.width / 2, mouseY - img.height / 2);
    }
  }
}

function mousePressed() {
  // Don't stamp if clicking on a button
  if (event.target.tagName === 'BUTTON') {
    return false;
  }

  let imgToStamp = img;

  if (noiseEnabled) {
    imgToStamp = noiseDisplaceImage(img);
  }

  stamps.push({
    x: mouseX - img.width / 2,
    y: mouseY - img.height / 2,
    slices: generateGlitchSlices(img),
    wasGlitched: glitchEnabled,
    displacedImg: noiseEnabled ? imgToStamp : null,
    sourceImg: img
  });
}

function generateGlitchSlices(img) {
  let sliceHeight = 8;
  let slices = [];

  for (let sy = 0; sy < img.height; sy += sliceHeight) {
    slices.push({
      sy: sy,
      dx: random(-50, 50),
      h: sliceHeight
    });
  }

  return slices;
}

function drawGlitchImage(img, x, y, slices) {
  for (let slice of slices) {
    image(
      img,
      x + slice.dx,
      y + slice.sy,
      img.width,
      slice.h,
      0,
      slice.sy,
      img.width,
      slice.h
    );
  }
}

function toggleGlitch() {
  glitchEnabled = !glitchEnabled;
  const button = document.getElementById("glitchToggle");
  button.textContent = glitchEnabled ? "Turn Off Glitch" : "Turn On Glitch";
}

function togglePreview() {
  previewEnabled = !previewEnabled;
  const button = document.getElementById("previewToggle");
  button.textContent = previewEnabled ? "Turn Off Preview" : "Turn On Preview";
}

function toggleNoise() {
  noiseEnabled = !noiseEnabled;
  const button = document.getElementById("noiseToggle");
  button.textContent = noiseEnabled ? "Turn Off Noise" : "Turn On Noise";
}

function changeImage() {
  currentImageIndex = (currentImageIndex + 1) % imageSrcs.length;
  if (images[currentImageIndex]) {
    img = images[currentImageIndex];
  } else {
    loadImage(imageSrcs[currentImageIndex], function(loaded) {
      images[currentImageIndex] = loaded;
      img = loaded;
    });
  }
}

function noiseDisplaceImage(sourceImg) {
  let newImg = createImage(sourceImg.width, sourceImg.height);

  sourceImg.loadPixels();
  newImg.loadPixels();

  let strength = 200;
  let noiseScale = 0.02;

  for (let y = 0; y < sourceImg.height; y++) {
    for (let x = 0; x < sourceImg.width; x++) {
      let n = noise(x * noiseScale, y * noiseScale);
      let offsetX = floor(map(n, 0, 1, -strength, strength));

      let sourceX = constrain(x + offsetX, 0, sourceImg.width - 1);
      let sourceY = y;

      let sourceIndex = 4 * (sourceX + sourceY * sourceImg.width);
      let targetIndex = 4 * (x + y * sourceImg.width);

      newImg.pixels[targetIndex] = sourceImg.pixels[sourceIndex];
      newImg.pixels[targetIndex + 1] = sourceImg.pixels[sourceIndex + 1];
      newImg.pixels[targetIndex + 2] = sourceImg.pixels[sourceIndex + 2];
      newImg.pixels[targetIndex + 3] = sourceImg.pixels[sourceIndex + 3];
    }
  }

  newImg.updatePixels();
  return newImg;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}