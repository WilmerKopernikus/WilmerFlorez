//click to create a point. press space to reset, arrows to change shape
let p=6;
let oArray=[];
function setup(){
  canvas = createCanvas(window.visualViewport.width, window.visualViewport.height);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Ensures it stays behind content
  canvas.style('position', 'fixed');
  background(0);
  angleMode(DEGREES);
  noFill()
  stroke(255)
}

function draw(){
  background(0,0,0,20)
  
  for (let i=0;i<oArray.length;i++){
    stroke(255*abs(sin(i*3)),255*abs(sin(i*7)),255*abs(cos(i*6)))
    oArray[i].move();
    oArray[i].display();
  }
  
}

class origin{
  constructor(){
    this.x=mouseX
    this.y=mouseY
    this.r=1;
  }
  move(){
    if(this.r < width){
      this.r=this.r+1;
    }
    if(this.r >= width){
      this.r=1
    }
  }
  display(){
    
    polygon(this.x,this.y, this.r,p)
  }
}

function mousePressed(){
  oArray.push(new origin())
}

function keyPressed() {
  if (keyCode === 32) {
    oArray=[];
    background(0);
    p=6;
  }
  if (keyCode === 38) {
    p=p+1;
  }
  if (keyCode === 40) {
    if (p>3){
    p=p-1;
    }
  }
}
//https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, radius, npoints) {
  let angle = 360 / npoints;
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}