const TOTAL = 5000;

var blobs = [];
var colors;
let variation = 0;
let xScale, yScale, centerX, centerY;

//auto change
let changeDuration = 3000;
let lastChange = 0;

function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0, 0);
	canvas.style('z-index', '-1'); // Ensures it stays behind content
	canvas.style('position', 'fixed'); 

	background(0,0,70);
	
	colors = [color("#E32C36"), color("#FF5733"), color("#DCA80D"), color("#1AC7C4")];
	
	start();
}

function start() {
	centerX = width/2;
	centerY = height/2;
	
	xScale = width/20;
	yScale = height/20*(width/height);
	
	blobs = [];
	background("#1a0633");
	variation = 0;
	lastChange = millis();
	for(let i = 0; i < TOTAL; i++){
		addParticle();
	}
}

function draw() {



	
	while(blobs.length < TOTAL){
		addParticle();
	}
	
	//fade
	noStroke();
	fill(0, 10);
	rect(0, 0, width, height);
	
	//auto change
	let time = millis();
	if(time - lastChange > changeDuration) {
		lastChange = time;
		variation++;
		if(variation>10) variation = 0;
	}

	var stepsize = deltaTime*0.0008;
	for(var i = blobs.length-1; i >= 0; i--){
		let blob = blobs[i];

		var x = getSlopeX(blob.x, blob.y);
		var y = getSlopeY(blob.x, blob.y);
		blob.x += blob.direction * x * stepsize;
		blob.y += blob.direction * y * stepsize;
		
		x = getXPrint(blob.x);
		y = getYPrint(blob.y);
		stroke(blob.color);
		strokeWeight(blob.size);
		line(x, y, blob.lastX, blob.lastY);
		blob.lastX = x;
		blob.lastY = y;
		
		const border = 200;
		if(x < -border || y < -border || x > width+border || y > height+border){
			blobs.splice(i,1);
		}
	}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function addParticle(){
		let x = random(width);
		let y = random(height);
		var blob = {
			x : getXPos(x),
			y : getYPos(y),
			size : 1,
			lastX : x,
			lastY : y,
			color : random(colors),
			direction : random(0.1, 1) * random([-1, 1])
		};
		blobs.push(blob);
}

function getSlopeY(x, y){
	switch(variation){
		case 0:return Math.sin(x);
		case 1:return Math.sin(x*5)*y*0.3;
		case 2:return Math.cos(x*y);
		case 3:return Math.sin(x)*Math.cos(y);
		case 4:return Math.cos(x)*y*y;
		case 5:return Math.log(Math.abs(x))*Math.log(Math.abs(y));
		case 6:return Math.tan(x)*Math.cos(y);
		case 7:return -Math.sin(x*0.1)*3;//orbit
		case 8:return -Math.sin(x*0.1)*3;//orbit
		case 9:return (x-x*x*x)*0.01;//two orbits
		case 10:return -Math.sin(x);
		case 11:return -y-Math.sin(1.5*x) + 0.7;
		case 12:return Math.sin(x)*Math.cos(y);

	}
}
	
function getSlopeX(x,y){
	switch(variation){
		case 0:return Math.cos(y);
		case 1:return Math.cos(y*5)*x*0.3;
		case 2: 
		case 3: 
		case 4: 
		case 5:
		case 6:return 1;
		case 7:return Math.sin(y*0.1)*3;//orbit
		case 8:return Math.sin(y*0.1)*3;//orbit
		case 9:return y/3;//two orbits
		case 10:return -y;		
		case 11:return -1.5*y;
		case 12:return Math.sin(y)*Math.cos(x);

	}
}

function getXPos(x){
	return (x-centerX)/xScale;
}
function getYPos(y){
	return (y-centerY)/yScale;
}

function getXPrint(x){
	return xScale*x+centerX;
}
function getYPrint(y){
	return yScale*y+centerY;
}