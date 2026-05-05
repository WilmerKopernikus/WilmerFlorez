/**
 * Configuration for all Creative Coding sketch pages.
 * Each key is the URL ?sketch= parameter value.
 *
 * Fields:
 *   title        {string}  — displayed in card1-creative-case
 *   script       {string}  — path to the p5 sketch script
 *   instructions {string?} — optional instructions line
 *   description  {string?} — optional longer description paragraph
 */
const CREATIVE_SKETCHES = {
  'expanding-polygon-field': {
    titleKey: 'polygonFieldTitle',
    script: 'scripts/expanding-polygon-field.js',
    
    instructions: 'Click to add shapes; up/down arrows change the number of sides. Space will clear the canvas.',
    instructionsKey: 'polygonFieldInstructions',
    description: 'An interactive generative system where user clicks spawn polygonal emitters that expand radially over time. Each emitter produces continuously growing regular polygons with a dynamic number of sides, while color oscillations are driven by trigonometric functions. The semi-transparent background creates motion trails, resulting in a layered wave-like propagation of geometric forms.',
    descriptionKey: 'polygonFieldText'
  },
  'minimalist-painting': {
    title: 'MINIMALIST PAINTING GENERATOR',
    script: 'scripts/minimalist_painting.js'
  },
  'mouse-shader': {
    title: 'MOUSE SHADER',
    script: 'scripts/mouse_shader.js'
  },
  'video-sculpture': {
    title: 'VIDEO SCULPTURE',
    script: 'scripts/video-sculpture.js'
  },
  'pixel-manipulation': {
    title: 'PIXEL MANIPULATION',
    script: 'scripts/pixel-manipulation.js'
  },
  'disc-function': {
    title: 'disc() FUNCTION',
    script: 'scripts/disc_function.js'
  },
  'making-shapes': {
    title: 'SHAPE MAKER',
    script: 'scripts/making-shapes.js'
  },
  'bouncing-balls': {
    title: 'BOUNCING BALLS',
    script: 'scripts/bouncing_balls.js'
  },
  'generative-painting': {
    title: 'GENERATIVE PAINTING',
    script: 'scripts/painting.js'
  },
  'reactive-particle-system': {
    title: 'REACTIVE PARTICLE SYSTEM',
    script: 'scripts/reactive.js'
  },
  'noise-driven-particle-field': {
    title: 'NOISE DRIVEN PARTICLE FIELD',
    script: 'scripts/reactive.js'
  },
  'trigonometric-box-field': {
    title: 'TRIGONOMETRIC BOX FIELD',
    script: 'scripts/trigonometric_box_field.js'
  }
};
