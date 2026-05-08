let myShader;
let paletteIndex = 0;
let shapeIndex = 0;
let mouseStartX = 0;
let mouseStartY = 0;
let canvas;

// Our vertex shader source as a string
let vert = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

varying vec2 pos;

void main() {
  pos = aTexCoord;
  vec4 position = vec4(aPosition, 1.0);

  gl_Position = uProjectionMatrix * uModelViewMatrix * position;
}
`;

let frag = `
precision mediump float;

varying vec2 pos;
uniform float uWidth;
uniform float uHeight;
uniform float uTime;

vec3 palette( float t ) {
  vec3 a = vec3(0.228, 0.000, 0.500);
  vec3 b = vec3(0.500, 0.000, 0.500);
  vec3 c = vec3(0.500, 0.000, 0.500);
  vec3 d = vec3(0.000, 0.000, 0.500);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 blue_cyan( float t ) {
  vec3 a = vec3(0.000, 0.500, 0.500);
  vec3 b = vec3(0.000, 0.500, 0.500);
  vec3 c = vec3(0.000, 0.500, 0.333);
  vec3 d = vec3(0.000, 0.500, 0.667);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 blue_magenta_orange( float t ) {
  vec3 a = vec3(0.938, 0.328, 0.718);
  vec3 b = vec3(0.659, 0.438, 0.328);
  vec3 c = vec3(0.388, 0.388, 0.296);
  vec3 d = vec3(2.538, 2.478, 0.168);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 blue_white_red( float t ) {
  vec3 a = vec3(0.660, 0.560, 0.680);
  vec3 b = vec3(0.718, 0.438, 0.720);
  vec3 c = vec3(0.520, 0.800, 0.520);
  vec3 d = vec3(-0.430, -0.397, -0.083);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 cyan_magenta( float t ) {
  vec3 a = vec3(0.610, 0.498, 0.650);
  vec3 b = vec3(0.388, 0.498, 0.350);
  vec3 c = vec3(0.530, 0.498, 0.620);
  vec3 d = vec3(3.438, 3.012, 4.025);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 green_blue_orange( float t ) {
  vec3 a = vec3(0.892, 0.725, 0.000);
  vec3 b = vec3(0.878, 0.278, 0.725);
  vec3 c = vec3(0.332, 0.518, 0.545);
  vec3 d = vec3(2.440, 5.043, 0.732);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 green_cyan( float t ) {
  vec3 a = vec3(0.000, 0.500, 0.500);
  vec3 b = vec3(0.000, 0.500, 0.500);
  vec3 c = vec3(0.000, 0.333, 0.500);
  vec3 d = vec3(0.000, 0.667, 0.500);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 green_magenta( float t ) {
  vec3 a = vec3(0.667, 0.500, 0.500);
  vec3 b = vec3(0.500, 0.667, 0.500);
  vec3 c = vec3(0.667, 0.666, 0.500);
  vec3 d = vec3(0.200, 0.000, 0.500);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 green_red( float t ) {
  vec3 a = vec3(0.500, 0.500, 0.000);
  vec3 b = vec3(0.500, 0.500, 0.000);
  vec3 c = vec3(0.500, 0.500, 0.000);
  vec3 d = vec3(0.500, 0.000, 0.000);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 magenta_green( float t ) {
  vec3 a = vec3(0.590, 0.811, 0.120);
  vec3 b = vec3(0.410, 0.392, 0.590);
  vec3 c = vec3(0.940, 0.548, 0.278);
  vec3 d = vec3(-4.242, -6.611, -4.045);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 orange_blue( float t ) {
  vec3 a = vec3(0.500, 0.500, 0.500);
  vec3 b = vec3(0.500, 0.500, 0.500);
  vec3 c = vec3(0.800, 0.800, 0.500);
  vec3 d = vec3(0.000, 0.200, 0.500);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 orange_magenta_blue( float t ) {
  vec3 a = vec3(0.821, 0.328, 0.242);
  vec3 b = vec3(0.659, 0.481, 0.896);
  vec3 c = vec3(0.612, 0.340, 0.296);
  vec3 d = vec3(2.820, 3.026, -0.273);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 rainbow_1( float t ) {
  vec3 a = vec3(0.500, 0.500, 0.500);
  vec3 b = vec3(0.500, 0.500, 0.500);
  vec3 c = vec3(1.000, 1.000, 1.000);
  vec3 d = vec3(0.000, 0.333, 0.667);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 rainbow_2( float t ) {
  vec3 a = vec3(0.500, 0.500, 0.500);
  vec3 b = vec3(0.666, 0.666, 0.666);
  vec3 c = vec3(1.000, 1.000, 1.000);
  vec3 d = vec3(0.000, 0.333, 0.667);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 rainbow_3( float t ) {
  vec3 a = vec3(0.500, 0.500, 0.500);
  vec3 b = vec3(0.750, 0.750, 0.750);
  vec3 c = vec3(1.000, 1.000, 1.000);
  vec3 d = vec3(0.000, 0.333, 0.667);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 rainbow_4( float t ) {
  vec3 a = vec3(0.500, 0.500, 0.500);
  vec3 b = vec3(1.000, 1.000, 1.000);
  vec3 c = vec3(1.000, 1.000, 1.000);
  vec3 d = vec3(0.000, 0.333, 0.667);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 red_blue( float t ) {
  vec3 a = vec3(0.500, 0.000, 0.500);
  vec3 b = vec3(0.500, 0.000, 0.500);
  vec3 c = vec3(0.500, 0.000, 0.500);
  vec3 d = vec3(0.000, 0.000, 0.500);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 yellow_green_blue( float t ) {
  vec3 a = vec3(0.650, 0.500, 0.310);
  vec3 b = vec3(-0.650, 0.500, 0.600);
  vec3 c = vec3(0.333, 0.278, 0.278);
  vec3 d = vec3(0.660, 0.000, 0.667);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 yellow_magenta_cyan( float t ) {
  vec3 a = vec3(0.650, 0.500, 0.310);
  vec3 b = vec3(-0.650, 0.500, 0.600);
  vec3 c = vec3(0.333, 0.278, 0.278);
  vec3 d = vec3(0.660, 0.000, 0.667);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 yellow_purple_magenta( float t ) {
  vec3 a = vec3(0.731, 1.098, 0.192);
  vec3 b = vec3(0.358, 1.090, 0.657);
  vec3 c = vec3(1.077, 0.360, 0.328);
  vec3 d = vec3(0.965, 2.265, 0.837);
  return a + b*cos( 6.28318*(c*t+d) );
  }

vec3 yellow_red( float t ) {
  vec3 a = vec3(0.500, 0.500, 0.000);
  vec3 b = vec3(0.500, 0.500, 0.000);
  vec3 c = vec3(0.100, 0.500, 0.000);
  vec3 d = vec3(0.000, 0.000, 0.000);
  return a + b*cos( 6.28318*(c*t+d) );
  }

uniform int uPaletteIndex;
uniform int uShapeIndex;

float sdHexagon(in vec2 p, in float r)
{
    const vec3 k = vec3(-0.866025404,0.5,0.577350269);
    p = abs(p);
    p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
    return length(p)*sign(p.y);
}

float sdPentagon(in vec2 p, in float r)
{
    const vec3 k = vec3(0.809016994,0.587785252,0.726542528);
    p.x = abs(p.x);
    p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y);
    p -= 2.0*min(dot(vec2( k.x,k.y),p),0.0)*vec2( k.x,k.y);
    p -= vec2(clamp(p.x,-r*k.z,r*k.z),r);    
    return length(p)*sign(p.y);
}

float sdRhombus(in vec2 p, in vec2 b)
{
    b.y = -b.y;
    p = abs(p);
    float h = clamp((dot(b,p)+b.y*b.y)/dot(b,b), 0.0, 1.0);
    p -= b*vec2(h,h-1.0);
    return length(p)*sign(p.x);
}

float sdEquilateralTriangle(in vec2 p, in float r)
{
    const float k = sqrt(3.0);
    p.x = abs(p.x) - r;
    p.y = p.y + r/k;
    if(p.x+k*p.y>0.0) p = vec2(p.x-k*p.y,-k*p.x-p.y)/2.0;
    p.x -= clamp(p.x, -2.0*r, 0.0);
    return -length(p)*sign(p.y);
}

float sdParallelogram(in vec2 p, float wi, float he, float sk)
{
    vec2 e = vec2(sk,he);
    p = (p.y<0.0)?-p:p;
    vec2 w = p - e; w.x -= clamp(w.x,-wi,wi);
    vec2 d = vec2(dot(w,w), -w.y);
    float s = p.x*e.y - p.y*e.x;
    p = (s<0.0)?-p:p;
    vec2 v = p - vec2(wi,0.0); v -= e*clamp(dot(v,e)/dot(e,e),-1.0,1.0);
    d = min(d, vec2(dot(v,v), wi*he-abs(s)));
    return sqrt(d.x)*sign(-d.y);
}

float sdOctogon(in vec2 p, in float r)
{
    const vec3 k = vec3(-0.9238795325, 0.3826834323, 0.4142135623);
    p = abs(p);
    p -= 2.0*min(dot(vec2(k.x,k.y),p),0.0)*vec2(k.x,k.y);
    p -= 2.0*min(dot(vec2(-k.x,k.y),p),0.0)*vec2(-k.x,k.y);
    p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
    return length(p)*sign(p.y);
}

float sdPentagram(in vec2 p, in float r)
{
    const float k1x = 0.809016994;
    const float k2x = 0.309016994;
    const float k1y = 0.587785252;
    const float k2y = 0.951056516;
    const float k1z = 0.726542528;
    const vec2 v1 = vec2(k1x,-k1y);
    const vec2 v2 = vec2(-k1x,-k1y);
    const vec2 v3 = vec2(k2x,-k2y);
    
    p.x = abs(p.x);
    p -= 2.0*max(dot(v1,p),0.0)*v1;
    p -= 2.0*max(dot(v2,p),0.0)*v2;
    p.x = abs(p.x);
    p.y -= r;
    return length(p-v3*clamp(dot(p,v3),0.0,k1z*r))
           * sign(p.y*v3.x-p.x*v3.y);
}

float sdStar(in vec2 p, in float r, in int n, in float m)
{
    float an = 3.141593/float(n);
    float en = 3.141593/m;
    vec2 acs = vec2(cos(an),sin(an));
    vec2 ecs = vec2(cos(en),sin(en));

    float bn = mod(atan(p.x,p.y),2.0*an) - an;
    p = length(p)*vec2(cos(bn),abs(sin(bn)));
    p -= r*acs;
    p += ecs*clamp(-dot(p,ecs), 0.0, r*acs.y/ecs.y);
    return length(p)*sign(p.x);
}

float getDistance(vec2 p) {
  if (uShapeIndex == 0) {
    return length(p);
  } else if (uShapeIndex == 1) {
    return abs(sdPentagon(p, 0.35));
  } else if (uShapeIndex == 2) {
    return abs(sdHexagon(p, 0.35));
  } else if (uShapeIndex == 3) {
    return abs(sdRhombus(p, vec2(0.25, 0.35)));
  } else if (uShapeIndex == 4) {
    return abs(sdEquilateralTriangle(p, 0.35));
  } else if (uShapeIndex == 5) {
    return abs(sdParallelogram(p, 0.3, 0.35, 0.1));
  } else if (uShapeIndex == 6) {
    return abs(sdOctogon(p, 0.35));
  } else if (uShapeIndex == 7) {
    return abs(sdPentagram(p, 0.35));
  } else if (uShapeIndex == 8) {
    return abs(sdStar(p, 0.35, 5, 2.0));
  }
}

vec3 getPalette(float t) {
  if (uPaletteIndex == 0) {
    return palette(t);
  } else if (uPaletteIndex == 1) {
    return blue_cyan(t);
  } else if (uPaletteIndex == 2) {
    return blue_magenta_orange(t);
  } else if (uPaletteIndex == 3) {
    return blue_white_red(t);
  } else if (uPaletteIndex == 4) {
    return cyan_magenta(t);
  } else if (uPaletteIndex == 5) {
    return green_blue_orange(t);
  } else if (uPaletteIndex == 6) {
    return green_cyan(t);
  } else if (uPaletteIndex == 7) {
    return green_magenta(t);
  } else if (uPaletteIndex == 8) {
    return green_red(t);
  } else if (uPaletteIndex == 9) {
    return magenta_green(t);
  } else if (uPaletteIndex == 10) {
    return orange_blue(t);
  } else if (uPaletteIndex == 11) {
    return orange_magenta_blue(t);
  } else if (uPaletteIndex == 12) {
    return rainbow_1(t);
  } else if (uPaletteIndex == 13) {
    return rainbow_2(t);
  } else if (uPaletteIndex == 14) {
    return rainbow_3(t);
  } else if (uPaletteIndex == 15) {
    return rainbow_4(t);
  } else if (uPaletteIndex == 16) {
    return red_blue(t);
  } else if (uPaletteIndex == 17) {
    return yellow_green_blue(t);
  } else if (uPaletteIndex == 18) {
    return yellow_magenta_cyan(t);
  } else if (uPaletteIndex == 19) {
    return yellow_purple_magenta(t);
  } else if (uPaletteIndex == 20) {
    return yellow_red(t);
  }
}

void main() {
  vec2 centered = (pos - 0.5) * 2.0;
  centered.x *= uWidth / uHeight; // aspect ratio correction

  vec2 centered0 = centered;

  vec3 finalColor = vec3(0.0);

  for (float i = 0.0; i < 3.0; i++) {

  centered = fract(centered * 1.5) - 0.5;


  float d = getDistance(centered) * exp(-length(centered0)); 
  
  vec3 color = getPalette(length(centered0) + i*0.4 + uTime*0.4);

  d = sin(d*8.0 + uTime)/8.0;
  d= abs(d);
  d = pow(0.01 / d, 1.1);

  
  finalColor += color * d;
}
  gl_FragColor = vec4(finalColor, 1.0);
}
`;
function setup() {
  canvas = createCanvas(window.visualViewport.width, window.visualViewport.height, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  canvas.style('position', 'fixed');
  // pointer-events: none makes the canvas invisible to all touch/mouse events.
  // p5.js registers touchmove listeners on the canvas that call preventDefault(),
  // which blocks native scroll. By removing pointer-events, those listeners never fire.
  canvas.style('pointer-events', 'none');
  myShader = createShader(vert, frag);
  noStroke();

  // Handle swipe and tap on the document using passive listeners (never block scroll).
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    let dx = e.changedTouches[0].clientX - touchStartX;
    let dy = e.changedTouches[0].clientY - touchStartY;
    let isHorizontal = Math.abs(dx) > Math.abs(dy) + 20;

    if (isHorizontal) {
      if (dx > 30) {
        shapeIndex = (shapeIndex + 1) % 9;
      } else if (dx < -30) {
        shapeIndex = (shapeIndex - 1 + 9) % 9;
      }
    } else if (Math.abs(dx) < 15 && Math.abs(dy) < 15) {
      paletteIndex = (paletteIndex + 1) % 21;
    }
  }, { passive: true });
}

const shapeNames = ['Circle', 'Pentagon', 'Hexagon', 'Diamond', 'Triangle', 'Parallelogram', 'Octagon', 'Pentagram', 'Star'];
const paletteNames = ['Palette 1', 'Palette 2', 'Palette 3', 'Palette 4', 'Palette 5', 'Palette 6', 'Palette 7', 'Palette 8', 'Palette 9', 'Palette 10', 'Palette 11', 'Palette 12', 'Palette 13', 'Palette 14', 'Palette 15', 'Palette 16', 'Palette 17', 'Palette 18', 'Palette 19', 'Palette 20', 'Palette 21'];

function mousePressed() {
  mouseStartX = mouseX;
  mouseStartY = mouseY;
}

function mouseReleased() {
  let dx = mouseX - mouseStartX;
  let dy = mouseY - mouseStartY;
  let isHorizontal = Math.abs(dx) > Math.abs(dy) + 20;

  if (isHorizontal) {
    if (dx > 30) {
      shapeIndex = (shapeIndex + 1) % 9;
    } else if (dx < -30) {
      shapeIndex = (shapeIndex - 1 + 9) % 9;
    }
  } else if (Math.abs(dx) < 15 && Math.abs(dy) < 15) {
    paletteIndex = (paletteIndex + 1) % 21;
  }
}

function draw() {
  background(0);

  // Fondo con shader
  shader(myShader);
    myShader.setUniform('uWidth', width * 1.0);
    myShader.setUniform('uHeight', height * 1.0);
    myShader.setUniform('uTime', millis() / 1000.0);
    myShader.setUniform('uPaletteIndex', paletteIndex);
    myShader.setUniform('uShapeIndex', shapeIndex);
  plane(width, height);
  // Volver al dibujo normal de p5
  resetShader();
  //vuelve a las coordenadas normales de p5 para dibujar los círculos
  translate(-width / 2, -height / 2);
}