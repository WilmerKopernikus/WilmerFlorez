let sketch4 = function(p) {
  let objs = [];
  let colors = ["#E32C36", "#FF5733", "#DCA80D", "#1AC7C4"];

  p.setup = function() {
    p.createCanvas(400, 400);
    p.rectMode(p.CENTER);

    let sd = p.width * 1.5;
    let c = 12;
    let w = sd / c;
    for (let i = 0; i < c; i++) {
      for (let j = 0; j < c; j++) {
        let x = i * w + (w / 2) + (p.width - sd) / 2;
        let y = j * w + (w / 2) + (p.width - sd) / 2;
        let dst = p.dist(x, y, p.width / 2, p.height / 2);
        let t = -p.int(x / 20);
        if ((i + j) % 2 == 0) {
          t -= 70;
        }
        objs.push(new MBTK(x, y, w, t));
      }
    }
  }

  p.draw = function() {
    p.background(0);
    for (let i of objs) {
      i.run();
    }
  }

  function easeInOutQuint(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }

  class MBTK {
    constructor(x, y, w, t) {
      this.x = x;
      this.y = y;
      this.w = w;
      this.t = t;
      this.t1 = 60;
      this.t2 = this.t1 + 10;
      this.t3 = this.t2 + 60;
      this.t4 = this.t3 + 10;
      this.amt1 = -1;
      this.amt2 = 1;
      this.col = p.random(colors);
    }

    show() {
      let ww = this.w / 2;
      p.push();
      p.translate(this.x, this.y);
      p.noStroke();
      p.fill(this.col);
      p.beginShape();
      p.vertex(ww, 0);
      p.vertex(ww, ww * this.amt1);
      p.vertex(-ww, ww * this.amt1);
      p.vertex(-ww, 0);
      p.vertex(-ww, -ww * this.amt2);
      p.vertex(ww, -ww * this.amt2);
      p.endShape();
      p.pop();
    }

    move() {
      if (this.ttt(0, this.t1)) {
        let n = p.norm(this.t, 0, this.t1 - 1);
        this.amt1 = p.lerp(-1, 1, easeInOutQuint(n));
      } else if (this.ttt(this.t2, this.t3)) {
        let n = p.norm(this.t, this.t2, this.t3 - 1);
        this.amt2 = p.lerp(1, -1, easeInOutQuint(n));
      }

      if (this.t > this.t4) {
        this.amt1 = -1;
        this.amt2 = 1;
        this.t = 0;
        this.col = p.random(colors);
      }
      this.t++;
    }

    ttt(t1, t2) {
      return t1 < this.t && this.t < t2;
    }

    run() {
      this.show();
      this.move();
    }
  }
}

let p5Instance4 = new p5(sketch4, 'sketch4');

// Attach the p5 instance to the container
let canvasContainer4 = document.getElementById('sketch4');
canvasContainer4.sketchInstance = p5Instance4;

// Set up an Intersection Observer to manage noLoop/loop
let observer4 = new IntersectionObserver((entries) => {
entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.sketchInstance.loop();
  } else {
    entry.target.sketchInstance.noLoop();
  }
});
}, { threshold: 0.1 });

// Start observing
observer4.observe(canvasContainer4);
