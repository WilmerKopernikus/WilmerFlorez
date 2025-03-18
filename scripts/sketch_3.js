let theShader;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index', '-1'); // Ensures it stays behind content
  canvas.style('position', 'fixed'); 
  
  // Define the vertex shader as a string
  const vertexShader = `
// vert file and comments from adam ferriss
// https://github.com/aferriss/p5jsShaderExamples

// our vertex data
attribute vec3 aPosition;

// our texcoordinates
attribute vec2 aTexCoord;

void main() {

  // copy the position data into a vec4, using 1.0 as the w component
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // send the vertex information on to the fragment shader
  gl_Position = positionVec4;
}
`;
  
  // Define the fragment shader as a string
  const fragmentShader =  `
  #ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D backbuffer;

void main() {
    vec2 st = (2.*gl_FragCoord.xy-u_resolution)/min(u_resolution.x,u_resolution.y)*1.1;
    vec2 coord = st;
    
    float len;
    
    for (int i = 0; i < 3; i++) {
        len = length(vec2(coord.x, coord.y));
        
        coord.x +=  sin(coord.y + u_time * 0.3)*1.;
        coord.y +=  cos(coord.x + u_time * 0.1 + cos(len * 1.0))*6.;
    }
         
    vec3 color = vec3(0.);

    color = mix(color, vec3(cos(len)), 1.0);
    
    gl_FragColor = vec4(0.7*color,1.);
        
    //vec4 c = vec4(9.*color,1.);
    
    //float alpha = 0.07;
    
    //gl_FragColor = c*alpha + texture2D( backbuffer, st )*(1.0-alpha);
}
  `;

  // Load the shader using the strings defined above
  theShader = createShader(vertexShader, fragmentShader);
}

function draw() {
  // Apply the shader
  shader(theShader);

  // Pass the resolution and time as uniforms to the shader
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_time', millis() / 1000.0);

  // Draw a quad that covers the entire canvas
  quad(-1, -1, 1, -1, 1, 1, -1, 1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
