let sketch5b = function(p) {
    let colors = ["#E32C36", "#FF5733", "#DCA80D", "#1AC7C4"];
    let rSeed;
  
    p.setup = function() {
      p.createCanvas(250, 250);
      p.pixelDensity(2);
      p.rectMode(p.CENTER);
      rSeed = p.int(p.random(777));
      p.shuffle(colors, true);
    }
  
    p.draw = function() {
      p.randomSeed(rSeed);
      p.background(0);
  
      p.noStroke();
      p.fill(0);
      p.rect(p.width / 2, p.height / 2, p.width, p.height);
  
      p.translate(p.width / 2, p.height / 2);
      p.scale(0.9);
      p.translate(-p.width / 2, -p.height / 2);
  
      let seg = 9;
      let w = p.width / seg;
      for (let i = 0; i < seg; i++) {
        for (let j = 0; j < seg; j++) {
          let x = i * w + w / 2;
          let y = j * w + w / 2;
          if ((i + j) % 2 == 0) cc(x, y, w);
        }
      }
    }
  
    function cc(x, y, w) {
      let off = w * 0.5 * ((p.sin(p.frameCount * p.random(0.2, 1) * 0.05 + p.random(10)) + 1) * 0.5);
      let cn = p.int(p.random(100));
      let col1 = p.color(colors[(cn) % colors.length]);
      let col2 = p.color(colors[(cn + 1) % colors.length]);
      let col3 = p.color(colors[(cn + 2) % colors.length]);
      let col4 = p.color(colors[(cn + 3) % colors.length]);
      p.noStroke();
      p.fill(col1);
      p.circle(x, y + off, w);
      p.fill(col2);
      p.circle(x, y - off, w);
  
      let dx = 0;
      let dy = off * 2;
      let ds = p.pow(dx, 2) + p.pow(dy, 2);
      let t = p.sqrt(
        (p.sqrt(ds) + (w / 2) + (w / 2)) *
        (p.sqrt(ds) + (w / 2) - (w / 2)) *
        (p.sqrt(ds) - (w / 2) + (w / 2)) *
        (-p.sqrt(ds) + (w / 2) + (w / 2))
      );
      let px = 0.5 * (dx + (dx * ((w / 2) ** 2 - (w / 2) ** 2) + dy * t) / ds);
      let a = p.acos(off / p.dist(0, off, px, 0));
      p.fill(col3);
      p.stroke(col3);
      p.arc(x, y + off, w, w, p.PI + p.HALF_PI - a, p.PI + p.HALF_PI + a, p.CHORD);
      p.arc(x, y - off, w, w, p.HALF_PI - a, p.HALF_PI + a, p.CHORD);
    }
  }
  
new p5(sketch5b, 'sketch5b');
  