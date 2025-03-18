const message = "Contact us";
let tmpMessage = "";
let x = [];
let t = 0;

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight); 
  canvas.position(0, 30); 
  canvas.style('z-index', '-1'); 
  canvas.style('position', 'fixed');
	colorMode(HSB, 360, 100, 100, 100);
	textSize(width / message.length * 0.85);
	textAlign(LEFT, CENTER);
	drawingContext.shadowBlur = 40;

	x[0] = 0;
	for (let i = 0; i < message.length; i++) {
		tmpMessage += message.charAt(i);
		x[i + 1] = textWidth(tmpMessage);
	}
}

function draw() {
	
    background(0);

	fill(255);
	stroke(255);
	strokeWeight(3);
	for (let i = 0; i < message.length; i++) {
		drawingContext.shadowColor = color((t + 360 * i / message.length) % 360, 100, 100);
		text(message.charAt(i), x[i] + width / 2 - x[x.length - 1] / 2, height / 2);
	}

	t += 3;
}