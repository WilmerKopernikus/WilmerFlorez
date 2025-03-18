let palette = ["#9913bf", "#ef562f", "#f9d531", "#abcd5e", "#62b6de"];
let swMin = 3;
const N_FRAMES = 800;

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
	pixelDensity(2);
	strokeCap(SQUARE);
}

function draw() {
	background(5);
	
	let t = 5*(frameCount%N_FRAMES)/N_FRAMES;
	
	translate(width/2, height/2);
	scale(1-swMin/width);
	translate(-width/2, -height/2);
	
	let k = 4, factor = 20, n = factor*k;
	let x0 = 0, y0 = 0;
	let w = width, h = height;
	let s = w/n;
	for (let i = 0; i < k-1; i++) {
		makeGrid(x0, y0, w, h, n, i, k-1, t);
		
		x0 += factor*s/2;
		y0 += factor*s*1/3.5;
		w -= factor*s;
		h -= factor*s*1/3;
		n -= factor;
	}
}

function makeGrid(x0, y0, w, h, n, i, iMax, t) {
	let s = w/n;
	let sw = map(i, 0, iMax-1, swMin, s/2-1);
	strokeWeight(sw);
	for (let k = 0; k <= n; k++) {
		let x = x0 + k*s;
		if (k < n-1/2) {
			fill(5);
			noStroke();
			rect(x, y0-sw/2, w/n, h+sw);
		}
		stroke(rainbow(5-t + 2*i/(iMax-1) + x/width));
		line(x, y0-sw/2, x, y0 + h+sw/2);
	}
}

function rainbow(t) {
  let i = floor((palette.length-1)*t);
  let amt = fract((palette.length-1)*t);
  return lerpColor(color(palette[i%palette.length]), color(palette[(i+1)%palette.length]), amt);
}