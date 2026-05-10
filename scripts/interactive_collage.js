let img;
let stamps = [];
let glitchEnabled = false;
let previewEnabled = true;
let noiseEnabled = false;
let images = [];
let imagesMobile = [];
let currentImageIndex = 0;
let canvas;
let isTouchDevice = false;
let touchPosX = 0;
let touchPosY = 0;
let lastTapTime = 0;
const DOUBLE_TAP_THRESHOLD = 300; // ms between taps to count as a double-tap

const imageSrcs = [
  "imagenes/collage/vampire.webp",
  "imagenes/collage/statue.webp",
  "imagenes/collage/uroboros.webp",
  "imagenes/collage/Hercules.webp",
  "imagenes/collage/eclipse.webp"
];

// Smaller images for touch devices, capped at MAX_MOBILE_WIDTH
const imageSrcsMobile = [
  "imagenes/collage/vampire_mobile.webp",
  "imagenes/collage/statue_mobile.webp",
  "imagenes/collage/uroboros_mobile.webp",
  "imagenes/collage/Hercules_mobile.webp",
  "imagenes/collage/eclipse_mobile.webp"
];

const MAX_MOBILE_WIDTH = 1300;

function preload() {
  // Only load the first image upfront — the rest load on demand
  images[0] = loadImage(imageSrcs[0]);
  imagesMobile[0] = loadImage(imageSrcsMobile[0]);
  img = images[0]; // updated in setup() once isTouchDevice is known
}

function setup() {
  canvas = createCanvas(window.visualViewport.width, window.visualViewport.height);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  background(255);

  // Detect touch/pointer device
  isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  // Switch to the mobile image set if on a touch device
  img = isTouchDevice ? imagesMobile[0] : images[0];

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
        drawGlitchImage(stamp.displacedImg, stamp.x, stamp.y, stamp.slices, stamp.dw, stamp.dh);
      } else {
        // Only glitch effect
        drawGlitchImage(stamp.sourceImg, stamp.x, stamp.y, stamp.slices, stamp.dw, stamp.dh);
      }
    } else if (stamp.displacedImg) {
      // Only noise effect
      image(stamp.displacedImg, stamp.x, stamp.y, stamp.dw, stamp.dh);
    } else {
      // Normal image
      image(stamp.sourceImg, stamp.x, stamp.y, stamp.dw, stamp.dh);
    }
  }

  // Preview following the pointer (mouse or touch) — 60% transparent (40% opaque)
  if (previewEnabled) {
    let px = isTouchDevice ? touchPosX : mouseX;
    let py = isTouchDevice ? touchPosY : mouseY;
    let { w, h } = getDisplaySize(img);
    tint(255, 102);
    image(img, px - w / 2, py - h / 2, w, h);
    noTint();
  }
}

function mousePressed() {
  // On touch devices, stamping is handled by double-tap in touchStarted()
  if (isTouchDevice) return false;

  // Don't stamp if clicking on a button
  if (event.target.tagName === 'BUTTON') return false;

  stampImage(mouseX, mouseY);
}

function stampImage(x, y) {
  let imgToStamp = img;

  if (noiseEnabled) {
    imgToStamp = noiseDisplaceImage(img);
  }

  let { w: dw, h: dh } = getDisplaySize(img);

  stamps.push({
    x: x - dw / 2,
    y: y - dh / 2,
    dw: dw,
    dh: dh,
    slices: generateGlitchSlices(img),
    wasGlitched: glitchEnabled,
    displacedImg: noiseEnabled ? imgToStamp : null,
    sourceImg: img
  });
}

// Returns the display dimensions for an image, capping width at MAX_MOBILE_WIDTH on touch devices
function getDisplaySize(srcImg) {
  if (!isTouchDevice || srcImg.width <= MAX_MOBILE_WIDTH) {
    return { w: srcImg.width, h: srcImg.height };
  }
  let scale = MAX_MOBILE_WIDTH / srcImg.width;
  return { w: MAX_MOBILE_WIDTH, h: Math.floor(srcImg.height * scale) };
}

function touchStarted() {
  if (touches.length === 0) return false;

  let touch = touches[0];
  touchPosX = touch.x;
  touchPosY = touch.y;

  // Don't stamp if touching a UI button — return true to allow the native click event
  let elementUnder = document.elementFromPoint(touch.x, touch.y);
  if (elementUnder && elementUnder.tagName === 'BUTTON') return true;

  // Double-tap stamps the image; single tap only moves the preview
  let now = millis();
  if (now - lastTapTime < DOUBLE_TAP_THRESHOLD) {
    stampImage(touchPosX, touchPosY);
    lastTapTime = 0; // Reset so a third tap starts a fresh sequence
  } else {
    lastTapTime = now;
  }

  return false; // Prevent default browser behavior (scroll, zoom)
}

function touchMoved() {
  if (touches.length > 0) {
    touchPosX = touches[0].x;
    touchPosY = touches[0].y;
  }
  return false; // Prevent page scrolling while dragging the preview
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

function drawGlitchImage(srcImg, x, y, slices, dw, dh) {
  let scaleY = dh / srcImg.height;
  for (let slice of slices) {
    image(
      srcImg,
      x + slice.dx,
      y + slice.sy * scaleY,
      dw,
      slice.h * scaleY,
      0,
      slice.sy,
      srcImg.width,
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
  let srcs = isTouchDevice ? imageSrcsMobile : imageSrcs;
  let imgArr = isTouchDevice ? imagesMobile : images;
  if (imgArr[currentImageIndex]) {
    img = imgArr[currentImageIndex];
  } else {
    loadImage(srcs[currentImageIndex], function(loaded) {
      imgArr[currentImageIndex] = loaded;
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