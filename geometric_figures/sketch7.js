let sketch7 = function (p) {
    let objs = [];
    let colors = [
     "#E32C36", "#FF5733", "#DCA80D", "#1AC7C4"];
  
    p.setup = function () {
      p.createCanvas(400, 400);
      p.rectMode(p.CENTER);
      let c = 10;
      let w = p.width / c;
      for (let i = 0; i < c; i++) {
        for (let j = 0; j < c; j++) {
          let x = i * w + w / 2;
          let y = j * w + w / 2;
          objs.push(new OBJ(x, y, w * 0.9));
        }
      }
      p.shuffle(objs, true);
    };
  
    p.draw = function () {
      p.background(0);
      for (let i of objs) {
        i.show();
        i.move();
      }
    };
  
    function easeInOutQuart(x) {
      return x < 0.5
        ? 8 * x * x * x * x
        : 1 - Math.pow(-2 * x + 2, 4) / 2;
    }
  
    class OBJ {
      constructor(x, y, d) {
        this.x0 = x;
        this.y0 = y;
        this.d0 = d;
        this.x = this.x0;
        this.y = this.y0;
        this.d = this.d0;
        this.t = -p.int(
          p.map(
            p.dist(x, y, p.width / 2, p.height / 2),
            0,
            p.sqrt(p.sq(p.width) + p.sq(p.height)),
            0,
            200
          )
        );
        this.t1 = 130;
        this.rad = p.random(0.05, 0.5) * p.width;
        this.aa = p.random(10);
        this.pm = p.int(p.random(2)) * 2 - 1;
        this.off = 1;
        this.w = this.d;
        this.h = this.d;
        this.w1 = this.d * p.random(4);
        this.h1 = this.d * p.random(4);
        this.ang = 0;
        this.mo = p.int(p.random(-1, 1) * 3);
        this.col1 = p.color(p.random(colors));
        this.col2 = p.color(p.random(colors));
        this.col = this.col1;
      }
  
      show() {
        p.push();
        p.translate(this.x, this.y);
        p.rotate(this.ang);
        p.fill(0);
        //p.noStroke();
        p.stroke(this.col);
        p.strokeWeight(1);
        p.rect(0, 0, this.w, this.h);
        p.pop();
      }
  
      move() {
        if (0 < this.t && this.t < this.t1) {
          let n = p.norm(this.t, 0, this.t1 - 1) ** 0.75;
          let a = (p.TAU * n + this.aa) * this.pm;
          let ik = p.sin(p.PI * n);
          this.x = this.x0 + this.rad * ik * p.cos(a);
          this.y = this.y0 + this.rad * ik * p.sin(a);
          this.w = p.lerp(this.d0, this.w1, ik);
          this.h = p.lerp(this.d0, this.h1, ik);
          this.ang = n * p.TAU * this.mo;
          this.col = p.lerpColor(this.col1, this.col2, n ** 0.05);
        }
        this.t++;
  
        if (this.t1 < this.t) {
          this.t = -90;
          this.col1 = this.col2;
          this.col2 = p.color(p.random(colors));
        }
      }
    }
  };

let p5Instance7 = new p5(sketch7, 'sketch7');

// Attach the p5 instance to the container
let canvasContainer7 = document.getElementById('sketch7');
canvasContainer7.sketchInstance = p5Instance7;

// Set up an Intersection Observer to manage noLoop/loop
let observer7 = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.sketchInstance.loop();
    } else {
      entry.target.sketchInstance.noLoop();
    }
  });
  }, { threshold: 0.1 });

  // Start observing
observer7.observe(canvasContainer7);
  