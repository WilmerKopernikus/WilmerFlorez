function setup() {
	let canvas = createCanvas(windowWidth, windowHeight);
	canvas.position(0,0);
  	canvas.style('z-index', '-1');
  	canvas.style('position', 'fixed');
  }
  
  function draw() {
	background('#000000');

	  // Step 1: Access the drawing context
	  let ctx = drawingContext;

	  // Step 2: Create a linear gradient from left to right
	  let gradient = ctx.createLinearGradient(0, 0, width, 0);
	
	  // Step 3: Define color stops for the gradient
	  gradient.addColorStop(0, '#000000');
	  gradient.addColorStop(0.25, 'yellow');
	  gradient.addColorStop(0.5, 'orange');
	  gradient.addColorStop(0.75, 'red');
	  gradient.addColorStop(1, '#000000');
	
	  // Step 4: Set the stroke style to the gradient
	  ctx.strokeStyle = gradient;
	
	  // Optional: Set stroke weight using p5.js function
	  strokeWeight(1);
  


  
	// Línea del eje x
	line(0, height / 2, width, height / 2);
  
	// Línea del eje y
	line(width / 2, 0, width / 2, height);
  
	// Calcular el centro del lienzo
	let centerX = width / 2;
	let centerY = height / 2;
  
	// Calcular la posición del círculo relativa al centro
	let circleX = centerX + (mouseX - centerX) / 24;
	let circleY = centerY + (mouseY - centerY) / 12;

	let circleX2 = centerX + (mouseX - centerX) / 21;
	let circleY2 = centerY + (mouseY - centerY) / 10;

	let circleX3 = centerX + (mouseX - centerX) / 18;
	let circleY3 = centerY + (mouseY - centerY) / 8;
  
	let circleX4 = centerX + (mouseX - centerX) / 15;
	let circleY4 = centerY + (mouseY - centerY) / 6;

    let circleX5 = centerX + (mouseX - centerX) / 12;
	let circleY5 = centerY + (mouseY - centerY) / 4;

    let circleX6 = centerX + (mouseX - centerX) / 9;
	let circleY6 = centerY + (mouseY - centerY) / 2;

    let circleX7 = centerX + (mouseX - centerX) / 6;
	let circleY7 = centerY + (mouseY - centerY) / 1;

	// Dibujar el círculo
	noFill(); // Sin relleno, solo el contorno
	ellipse(circleX, circleY, 100, 100);
    ellipse(circleX2, circleY2, 200, 200);
    ellipse(circleX3, circleY3, 300, 300);
    ellipse(circleX4, circleY4, 400, 400);
    ellipse(circleX5, circleY5, 500, 500);
    ellipse(circleX6, circleY6, 600, 600);
    ellipse(circleX7, circleY7, 700, 700);
    

  }
  
  

  