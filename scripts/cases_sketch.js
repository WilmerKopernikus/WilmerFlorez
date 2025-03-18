let num = 30;  
let alphabet = ["CASES", "PROJECTS", "PORTFOLIO"]; 
let charChange = 0;  


function setup() {
    
    let proportion = windowWidth / windowHeight;
    let h;
    if (proportion >= 1) {
         h = windowHeight;
    } else if (proportion < 1.1 && proportion >= 0.66){
        h = 500;
    }else if (proportion < 0.66){
        h = 300;
    }
    
     

    let canvas = createCanvas(windowWidth, h);
    canvas.position(0, 0);  
    canvas.style('z-index', '-1');  
    textAlign(CENTER, CENTER); 
    textFont('Trebuchet MS');  

    
    
    if (proportion >= 1) {
        textSize(220);
    } else if (proportion < 1.1 && proportion >= 0.66){
        textSize(137);
    } else if (proportion < 0.69){
        textSize(60);
        } 
    }

function draw() {
    let proportion = windowWidth / windowHeight;
    let modifier;

    // Ajustar 'modifier' según la proporción de la pantalla
    if (proportion >= 1) {
        modifier = 50;  // Pantallas más grandes, mayor efecto
    } else  {
        modifier = 18;   // Pantallas más pequeñas, menor efecto
    }

    for (let x = 0; x < width; x += width / num) {  
        drawingContext.save();  
        noStroke();  
        fill(0, 30);  
        rect(x, 0, width / num, height);  
        drawingContext.clip();  
        fill(255);  
        text(alphabet[charChange], width / 2 + modifier * cos(frameCount * 0.02 + 1.8 * noise(x)), height / 2);
        drawingContext.restore();  
    }

    // Cambiar palabra cada 180 frames
    if (frameCount % 180 === 0) {  
        charChange = (charChange + 1) % alphabet.length;  
    }
}
