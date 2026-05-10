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
  'noise-field-painting': {
    titleKey: 'noiseFieldPaintingTitle',
    script: 'scripts/noise-field-painting.js',
    instructions: 'Click to generate particles or hold to draw with them.',
    instructionsKey: 'noiseFieldPaintingInstructions',
    description: 'A generative particle system emits circles from a noise-driven radial source, creating an organic flow field around the canvas center. Each particle follows Perlin-noise directions, gradually shrinking and fading over time. Mouse interaction introduces new emitters, producing layered, evolving patterns with soft color variations and fluid, dynamic motion.',
    descriptionKey: 'noiseFieldPaintingText'
  },
  'black-hole-sun': {
    titleKey: 'blackHoleSunTitle',
    script: 'scripts/black_hole_sun.js',
    description: 'This shader-based sketch generates a continuously evolving abstract tunnel formed through raymarching, polar coordinate distortion, and layered fractal noise. Vibrant magenta and violet structures emerge from recursive sine displacements, creating the sensation of traveling through an organic cosmic vortex. Temporal animation and procedural geometry produce fluid, hypnotic motion with glowing, high-contrast textures.',
    descriptionKey: 'blackHoleSunText'
  },
  'kaleidoscope-shader': {
    titleKey: 'kaleidoscopeShaderTitle',
    script: 'scripts/kaleidoscopic_shader.js',
    instructions: 'Click and drag to influence the symmetry and colors.',
    instructionsKey: 'kaleidoscopeShaderInstructions',
    description: 'A shader-based experiment that creates a kaleidoscopic visual effect using fragment shaders. The sketch manipulates colors and shapes in real-time, producing symmetrical patterns that evolve dynamically. User interactions can influence the symmetry and color palette, resulting in a mesmerizing, ever-changing visual experience.',
    descriptionKey: 'kaleidoscopeShaderText'
  },
  'interactive-collage': {
    titleKey: 'interactiveCollageTitle',
    script: 'scripts/interactive_collage.js',
    instructions: 'Klicke, um neue Bilder zur Collage hinzuzufügen, nutze die Buttons, um Effekte anzuwenden, und kombiniere sie für einzigartige Ergebnisse.',
    instructionsKey: 'interactiveCollageInstructions',
    description: 'Eine interaktive Pixel-Manipulation-Skizze, mit der Bilder direkt auf die Canvas gestempelt werden können. Über den Button „Change Image“ lässt sich zwischen vier Bildern wechseln. Verschiedene visuelle Effekte können angewendet werden: „Glitch“ erzeugt horizontale Verzerrungen, während „Noise Displacement“ die Pixel dynamisch verformt. Die Mouse-Preview kann gesteuert und Effekte kombiniert werden, um kreative Resultate zu erzeugen. Jeder Stamp speichert seine eigenen Effekte und ermöglicht unbegrenztes künstlerisches Layering.',
    descriptionKey: 'interactiveCollageText',
    buttons: '<button id="changeImage" class="change-image-button">Change Image</button><button id="previewToggle" class="preview-button">Turn Off Preview</button><button id="glitchToggle" class="glitch-button">Turn On Glitch</button><button id="noiseToggle" class="noise-button">Turn On Noise</button><button id="negativeToggle" class="negative-button">Turn On Negative</button><div class="buttons-row-break"></div><button id="navigationToggle" class="navigation-button">Turn On Navigation</button>',
    preloadImages: ['imagenes/collage/lips.jpg']
  },

};
