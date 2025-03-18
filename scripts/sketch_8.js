let moving = false;

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
	background(100);
}

function draw() {
	background(0);
	textStyle(BOLD);
	textSize(50);

	// Set text and other fixed values
	let txt = "A NEW DIGITAL COSMOS";
	let sliderValue = 50; // Fixed slider value
	let colorValue = '#ffcc00'; // Fixed color
	let mode = "scale";  // Set mode directly ("normal", "rotate", "scale")

	let ww = textWidth(txt) + 10 + sliderValue;
	let rowCount = 0;
	rotate(PI / 24);

	// Draw the text grid
	for (let i = 0; i < height; i += 50) {
		push();
		
		if (moving) {
			translate(sin(frameCount / 10 + rowCount * 10) * 50, 0);
		}
		rowCount++;
		for (let o = 0; o < width; o += ww) {
			fill(rowCount % 2 == 0 ? 255 : colorValue);
			push();
			translate(o + (rowCount % 2 == 0 ? -50 : 0), i);
			if (mode == "scale") {
				scale(sin(o / 500 + frameCount / 100));
			}
			text(txt, 0, 0);
			pop();
		}
		pop();
	}
}
