let objs = [];
let colors = ['#ffffff', '#f3f3f3', '#c8e4ff', '#85c3ff', '#9b9b9b'];


function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1'); // Ensures it stays behind content
	canvas.style('position', 'fixed');
	rectMode(CENTER);
	addObj();
	background(0);
}

function draw() {
	bkgd();
	for (let i of objs) {
		i.show();
		i.move();
	}

	if (frameCount % 20 == 0) {
		addObj()
	}

	for (let i = 0; i < objs.length; i++) {
		if (objs[i].isDead) {
			objs.splice(i, 1);
		}
	}
}

function addObj(){
	let num = int(random(1, 15));
	for (let i = 0; i < num; i++) {
		objs.push(new OBR(random(width), random(height)));
	}
}

function bkgd() {
	let wid = width * 1.2;
	let c = 90;
	let w = wid / c;
	let pos = [];

	background('#00000015');
	for (let i = 0; i < c; i++) {
		for (let j = 0; j < c; j++) {
			let x = i * w + (w / 2) + (width - wid) / 2;
			let y = j * w + (w / 2) + (height - wid) / 2;
			noStroke();
			fill(255, 30);
			circle(x, y, width * 0.001);
		}
	}
}

class OBR {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.d = 0;
		this.sw = width * 0.005;
		this.isDead = false;
		this.dStep = random(0.2, 0.7);
		this.swStep = random(0.05, 0.009);
		this.col = color(random(colors));
		this.t1 = random(23904);
		this.t2 = random(43894);
		this.xStep = random(-1, 1) * 2;
		this.yStep = random(-1, 1) * 2;
		this.t1Step = random(0.1) * random();
		this.t2Step = random(0.1) * random();
		this.aStep = random(1, 2);
		this.rnd = int(random(2));
		this.alp = 255;
	}

	show() {

		if (this.rnd) {
			noFill();
			stroke(this.col);
			strokeWeight(this.sw);
		} else {
			noStroke();
			this.col.setAlpha(this.alp);
			fill(this.col);
		}
		circle(this.x, this.y, this.d);

	}

	move() {
		this.d += this.dStep;
		if (this.rnd)this.sw -= this.swStep;
		else this.alp -= this.aStep;
		if (this.sw <= 0 || this.alp <= 0) {
			this.isDead = true;
		}
		this.x += this.xStep * sin(this.t1);
		this.y += this.yStep * cos(this.t2);
		this.t1 += this.t1Step;
		this.t2 += this.t2Step;
	}
}
  