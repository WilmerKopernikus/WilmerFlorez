let theShader;
let canvas;

function setup() {
   canvas = createCanvas(window.visualViewport.width, window.visualViewport.height, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Ensures it stays behind content
  canvas.style('position', 'fixed');
  noStroke();
  background(0);

  // Define frag_functions_default first
  const frag_functions_default = `
  float rand(vec2 c){
    return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  mat2 rotate2d(float _angle){
    return mat2(cos(_angle), -sin(_angle),
                sin(_angle), cos(_angle));
  }

  mat2 scale2d(vec2 _scale){
    return mat2(_scale.x, 0.0,
                0.0, _scale.y);
  }

  vec2 tile (vec2 _st, float _zoom) {
    _st *= _zoom;
    return fract(_st);
  }

  // Classic Perlin 3D Noise by Stefan Gustavson
  // (Include the rest of your noise functions here)
  // ...
  `;

  // Now you can define 'frag' using 'frag_functions_default'
  const frag = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;
  uniform vec3 u_lightDir;
  uniform vec3 u_col;
  uniform mat3 uNormalMatrix;
  uniform float u_pixelDensity;
  uniform sampler2D u_tex;

  // Attributes, in
  varying vec4 var_centerGlPosition;
  varying vec3 var_vertNormal;
  varying vec2 var_vertTexCoord;

  ${frag_functions_default}

  void main() {
    vec2 st = var_vertTexCoord.xy / u_resolution.xy;
    // st.y = 1.0 - st.y;
    vec3 color = vec3(st.x, st.y, 1.0);
    float d = distance(u_mouse, st);
    color *= 1.0 - d;
    gl_FragColor = vec4(color, 1.0);
  }
  `;

  // Vertex shader code remains the same
  const vert = `
  precision highp float;

  // Attributes, in
  attribute vec3 aPosition;
  attribute vec3 aNormal;
  attribute vec2 aTexCoord;

  // Attributes, out
  varying vec3 var_vertPos;
  varying vec3 var_vertNormal;
  varying vec2 var_vertTexCoord;
  varying vec4 var_centerGlPosition; // Original position

  // Matrices
  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;
  uniform mat3 uNormalMatrix;
  uniform float u_time;

  void main() {
    vec3 pos = aPosition;
    vec4 posOut = uProjectionMatrix * uModelViewMatrix * vec4(pos, 1.0);
    gl_Position = posOut;

    // Set out values
    var_vertPos      = pos;
    var_vertNormal   = aNormal;
    var_vertTexCoord = aTexCoord;
    var_centerGlPosition = uProjectionMatrix * uModelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
  }
  `;

  // Initialize the shader after all variables are defined
  theShader = new p5.Shader(this.renderer, vert, frag);
}

function draw() {
  shader(theShader);
  theShader.setUniform('u_resolution', [width / 1000, height / 1000]);
  theShader.setUniform('u_time', millis() / 1000);
  theShader.setUniform('u_mouse', [mouseX / width, mouseY / height]);
  // Draw a rectangle covering the canvas
  rect(-width / 2, -height / 2, width, height);
}


