let sketch6b = function(p) {
  let objs = [];
  let colors = ["#E32C36", "#FF5733", "#DCA80D", "#1AC7C4"];

  p.setup = function() {
    p.createCanvas(250, 250);
    p.rectMode(p.CENTER);
    let c = 6;
    let w = p.width / c;
    for (let i = 0; i < c; i++) {
      for (let j = 0; j < c; j++) {
        let x = i * w + w / 2;
        let y = j * w + w / 2;
        objs.push(new OBJ(x, y, w / 2));
      }
    }
  }

  p.draw = function() {
    p.background(0);
    for (let i of objs) {
      i.run();
    }
  }

  function easeInOutCirc(x) {
    return x < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
  }

  class OBJ {
    constructor(x, y, w) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.cw = this.w;
      this.t = -p.dist(0, 0, this.x, this.y) / 20;
      this.t0 = -60;
      this.t1 = 40;
      this.t2 = this.t1 + 60;
      this.t3 = this.t2 + 40;
      this.col1 = this.col2 = 'C';
      while (this.col1 === this.col2) {
        this.col1 = p.random(colors);
        this.col2 = p.random(colors);
      }
    }

    show() {
      let ww = this.w - this.cw;
      p.push();
      p.translate(this.x, this.y);
      p.noStroke();
      p.fill(this.col1);
      p.square(ww / 2, ww / 2, this.w);
      p.fill(this.col2);
      p.square(-ww / 2, -ww / 2, this.w);
      p.fill(0);
      p.square(0, 0, this.cw + 1);
      p.pop();
    }

    move() {
      if (0 < this.t && this.t < this.t1) {
        let n = p.norm(this.t, 0, this.t1 - 1);
        this.cw = p.lerp(this.w, 0, easeInOutCirc(n));
      } else if (this.t2 < this.t && this.t < this.t3) {
        let n = p.norm(this.t, this.t2, this.t3 - 1);
        this.cw = p.lerp(0, this.w, easeInOutCirc(n));
      }
      if (this.t > this.t3) {
        this.t = this.t0;
        this.col1 = this.col2 = 'C';
        while (this.col1 === this.col2) {
          this.col1 = p.random(colors);
          this.col2 = p.random(colors);
        }
      }
      this.t++;
    }

    run() {
      this.show();
      this.move();
    }
  }
}

let p5Instance6b = new p5(sketch6b, 'sketch6b');

// Attach the p5 instance to the container
let canvasContainer6b = document.getElementById('sketch6b');
canvasContainer6b.sketchInstance = p5Instance6b;

// Set up an Intersection Observer to manage noLoop/loop
let observer6b = new IntersectionObserver((entries) => {
entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.sketchInstance.loop();
  } else {
    entry.target.sketchInstance.noLoop();
  }
});
}, { threshold: 0.1 });

// Start observing
observer6b.observe(canvasContainer6b);

  