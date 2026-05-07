(function (global) {
  const loadedAsLoaderFactory = document.currentScript?.dataset?.loaderFactory !== undefined;
  const DEFAULT_PALETTE = ["#B22222", "#ff4d0055", "#ffffff55", "#36419355"];
  const DEFAULT_NOISE_SCALE = 0.01;

  function resolveElement(target) {
    if (typeof target === "string") {
      return document.querySelector(target);
    }

    return target || document.body;
  }

  function createNoiseFieldPaintingSketch(target, options = {}) {
    const mount = resolveElement(target);

    if (!mount || typeof global.p5 !== "function") {
      return null;
    }
    
    const isLoader = options.mode === "loader" || options.loader === true;
    const palette = Array.isArray(options.palette) && options.palette.length
      ? options.palette
      : DEFAULT_PALETTE;
    const noiseScale = Number.isFinite(options.noiseScale) ? options.noiseScale : DEFAULT_NOISE_SCALE;

    return new global.p5((p) => {
      let canvas;
      let objects = [];
      let maxRadius;
      let noiseTime = 0;
      const noiseTheta = 1000;

      function getCanvasWidth() {
        return mount === document.body
          ? (global.visualViewport?.width || global.innerWidth)
          : mount.clientWidth || global.innerWidth;
      }

      function getCanvasHeight() {
        return mount === document.body
          ? (global.visualViewport?.height || global.innerHeight)
          : mount.clientHeight || global.innerHeight;
      }

      function setCanvasChrome() {
        if (!canvas) return;

        canvas.position(0, 0);
        canvas.style("position", isLoader ? "absolute" : "fixed");
        canvas.style("inset", "0");
        canvas.style("z-index", isLoader ? "0" : "-1");
        canvas.style("pointer-events", isLoader ? "none" : "auto");
        canvas.style("display", "block");
      }

      function resetBounds() {
        maxRadius = p.max(p.width, p.height) * (isLoader ? 0.58 : 0.45);
      }

      p.setup = () => {
        canvas = p.createCanvas(getCanvasWidth(), getCanvasHeight());
        if (mount !== document.body) {
          canvas.parent(mount);
        }
        setCanvasChrome();
        p.angleMode(p.DEGREES);
        p.noStroke();
        resetBounds();
        p.background("#000000");
      };

      p.draw = () => {
        const sourceRadius = p.map(p.noise(noiseTime * 0.01, 0), 0, 1, 0, maxRadius);
        const sourceAngle = p.map(p.noise(noiseTime * 0.001, noiseTheta), 0, 1, -360, 360);
        const x = sourceRadius * p.cos(sourceAngle) + p.width / 2;
        const y = sourceRadius * p.sin(sourceAngle) + p.height / 2;

        objects.push(new NoiseFieldObject(p, x, y, palette, noiseScale));

        if (!isLoader && p.mouseIsPressed) {
          objects.push(new NoiseFieldObject(p, p.mouseX, p.mouseY, palette, noiseScale));
        }

        for (let i = 0; i < objects.length; i += 1) {
          objects[i].move();
          objects[i].display();
        }

        for (let j = objects.length - 1; j >= 0; j -= 1) {
          if (objects[j].isFinished()) {
            objects.splice(j, 1);
          }
        }

        noiseTime += isLoader ? 1.5 : 1;
      };

      p.windowResized = () => {
        p.resizeCanvas(getCanvasWidth(), getCanvasHeight());
        setCanvasChrome();
        resetBounds();
        p.background("#000000");
      };
    });
  }

  class NoiseFieldObject {
    constructor(p, originX, originY, palette, noiseScale) {
      this.p = p;
      this.palette = palette;
      this.noiseScale = noiseScale;
      this.velocity = p.createVector(0, 0);
      this.position = p.createVector(originX, originY);
      this.time = p.random(0, noiseScale);
      this.lifeMax = p.random(20, 50);
      this.life = this.lifeMax;
      this.step = p.random(0.1, 0.5);
      this.diameterMax = p.random(10) >= 5 ? 10 : 30;
      this.diameter = this.diameterMax;
      this.color = p.color(p.random(palette));
    }

    move() {
      const theta = this.p.map(
        this.p.noise(this.position.x * this.noiseScale, this.position.y * this.noiseScale, this.time),
        0,
        1,
        -360,
        360
      );

      this.velocity.x = this.p.cos(theta);
      this.velocity.y = this.p.sin(theta);
      this.position.add(this.velocity);
    }

    isFinished() {
      this.life -= this.step;
      this.diameter = this.p.map(this.life, 0, this.lifeMax, 0, this.diameterMax);

      return this.life < 0;
    }

    display() {
      this.p.fill(this.color);
      this.p.circle(this.position.x, this.position.y, this.diameter);
    }
  }

global.createNoiseFieldPaintingSketch = createNoiseFieldPaintingSketch;

  function startStandaloneSketch() {
    if (loadedAsLoaderFactory) {
      return;
    };

    createNoiseFieldPaintingSketch(document.body);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startStandaloneSketch, { once: true });
  } else {
    startStandaloneSketch();
  }
}(window));