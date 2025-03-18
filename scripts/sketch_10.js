function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
  	canvas.style('z-index', '-1');
  	canvas.style('position', 'fixed');
  }
  function draw() {
	background('#000000');
	  let ctx = drawingContext;
	  let gradient = ctx.createLinearGradient(0, 0, width, 0);
	  gradient.addColorStop(0, '#000000');
	  gradient.addColorStop(0.25, 'yellow');
	  gradient.addColorStop(0.5, 'orange');
	  gradient.addColorStop(0.75, 'red');
	  gradient.addColorStop(1, '#000000');
	  ctx.strokeStyle = gradient;
	  strokeWeight(1);
	  line(0, height / 2, width, height / 2);
	  line(width / 2, 0, width / 2, height);
	  let centerX = width / 2;
	  let centerY = height / 2;
	  let circleX = centerX + (mouseX - centerX) / 8;
	  let circleY = centerY + (mouseY - centerY) / 4;
	  let circleX2 = centerX - (mouseX - centerX) / 8;
	  let circleY2 = centerY - (mouseY - centerY) / 4;
	  let circleX3 = centerX - (mouseX - centerX) / 8;
	  let circleY3 = centerY + (mouseY - centerY) / 4;
	  let circleX4 = centerX + (mouseX - centerX) / 8;
	  let circleY4 = centerY - (mouseY - centerY) / 4;
	  noFill(); 
	  ellipse(circleX, circleY, 250, 250);
	  ellipse(circleX2, circleY2, 250, 250); 
	  ellipse(circleX3, circleY3, 250, 250); 
	  ellipse(circleX4, circleY4, 250, 250); 
	  ellipse(windowWidth/2, windowHeight/2, 250, 250)
  }  