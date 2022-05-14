var tickle;
class TickleWalker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, 25, 25);
  }
  //mouse inside circle
  contains(x, y) {
    var d = dist(x, y, this.x, this.y);
    if (d < 25) {
      return true;
    } else {
      return false;
    }
  }
}

function setup() {
  createCanvas(900, 600);
  background(0);
  tickle = new TickleWalker(width / 2, height / 2);

  rectMode(CENTER);
}

// function draw() {
//     var randX = random(0, width);
//     var randY = random(0, height);

//     noStroke();
//     fill(random(255), random(255), random(255));
//     var size = random(10, 25);
//     ellipse(randX, randY, size, size);
// }

// function draw() {
//     background(0);
//     tickle.display();
//     if (tickle.contains(mouseX, mouseY)) {
//         tickle.move();
//     }
// }
//Noise
var time = 0;
function draw() {
  background(0);

  var nx = noise(time);

  var locX = map(nx, 0, 1, 0, width);
  var g = map(nx, 0, 1, 0, 255);

  var nY = noise(time + 5);
  var locY = map(nY, 0, 1, 0, height);
  
  var rotZ = map(nx, 0, 1, -25, 25);



  translate(locX, locY);
  rotate(rotZ);

  fill(0, g, 0);
  rect(0, 0, 50, 50);
  time += 0.01;
}
