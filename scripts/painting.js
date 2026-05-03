let minArea = 10000;
let colors = ['#DE183C', '#F2B541', '#0C79BB', '#2DACB2', '#E46424', '#ECACBE', '#000000', '#ffffff', '#ef476f', '#ffd166', '#7209b7', '#f73939', '#ffda33', '#0c4896', '#48b7f7'];

let noiseFilter;
let canvas;

function setup() {
    
  canvas = createCanvas(window.visualViewport.width, window.visualViewport.height);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Ensures it stays behind content
  canvas.style('position', 'fixed');
  
	let p1 = createVector(0, 0);
	let p2 = createVector(width, 0);
	let p3 = createVector(width, height);
	let p4 = createVector(0, height);
	division(p1, p2, p3, p4);
}

function draw() {

}

function division(a, b, c, d) {
	let ab = p5.Vector.dist(a, b);
	let bd = p5.Vector.dist(b, d);
	let da = p5.Vector.dist(d, a);
	let bc = p5.Vector.dist(b, c);
	let cd = p5.Vector.dist(c, d);
	let s1 = (ab + bd + da) / 2;
	let s2 = (bc + cd + bd) / 2;
	let S1 = sqrt(s1 * (s1 - ab) * (s1 - bd) * (s1 - da));
	let S2 = sqrt(s2 * (s2 - bc) * (s2 - cd) * (s2 - bd));
	let area = S1 + S2;

	if (area > minArea) {
		let r1 = random(0.2, 0.8);
		let r2 = random(0.2, 0.8);
		if ((ab + cd) > (da + bc)) {
			let p1 = p5.Vector.lerp(a, b, r1);
			let p2 = p5.Vector.lerp(c, d, r2);
			division(a, p1, p2, d);
			division(p1, b, c, p2);
		} else {
			let p1 = p5.Vector.lerp(a, d, r1);
			let p2 = p5.Vector.lerp(b, c, r2);
			division(a, b, p2, p1);
			division(p1, p2, c, d);
		}
	} else {
		let center = createVector((a.x + b.x + c.x + d.x) / 4, (a.y + b.y + c.y + d.y) / 4);
		let grd = drawingContext.createConicGradient(random(TAU), width/2, height/2);
		let cc = int(random(120, 150));
		let fc = random(colors);
		grd.addColorStop(0, fc);
		for(let i=1; i<cc; i++){
			grd.addColorStop(i/cc, random(colors));
		}
		grd.addColorStop(1, fc);
		push();
		drawingContext.fillStyle = grd;
		strokeWeight(0);
		stroke(255);
		beginShape();
		vertex(a.x, a.y);
		vertex(b.x, b.y);
		vertex(c.x, c.y);
		vertex(d.x, d.y);
		endShape(CLOSE);
		pop();
	}
}

function drawConcentricCircles(x, y, d) {
	let num = int(random(5, 20));
	noStroke();
	for (let i = 0; i < num; i++) {
		let dd = map(i, 0, num, d, 0);
		fill(random(colors));
		circle(x, y, dd);
	}
}