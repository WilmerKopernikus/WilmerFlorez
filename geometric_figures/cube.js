let overlaySketch = (p) => {
  let rotationX = 0;
  let rotationY = 0;
  let isRotating = true;  // Variable para controlar si el cubo está rotando o no

  p.setup = () => {
      let canvas = p.createCanvas(windowWidth, windowHeight, p.WEBGL);
      canvas.parent("cube");  // Asigna el canvas al div con id 'cube2'
      p.angleMode(p.DEGREES);
  };

  p.draw = () => {
      p.background(0);
      p.normalMaterial();  // Aplica un material básico a la caja

      if (isRotating) {
          // Rotación automática solo si isRotating es true
          rotationX += 1; // Incremento para rotación en el eje X
          rotationY += 1.5; // Incremento para rotación en el eje Y
      }

      p.push();
      p.fill(0, 0, 0, 100);  // Color de relleno de la caja
      p.stroke(255, 255, 255); // Color de borde (blanco)
      p.strokeWeight(2);
      p.rotateX(rotationX);  // Aplica rotación continua en el eje X
      p.rotateY(rotationY);  // Aplica rotación continua en el eje Y
      p.box(150);  
      p.pop();
  };

  p.mousePressed = () => {
      let xDist = Math.abs(p.mouseX - p.width / 2);
      let yDist = Math.abs(p.mouseY - p.height / 2);
      // Checa si el clic ocurrió dentro del área del cubo (en este caso, es un cuadrado de 70x70)
      if (xDist < 35 && yDist < 35) {
          isRotating = false;  // Detiene la rotación mientras el mouse esté presionado
      }
  };

  p.mouseReleased = () => {
      isRotating = true;  // Reanuda la rotación cuando se suelta el mouse o el dedo
  };
};

new p5(overlaySketch);

  
  
  