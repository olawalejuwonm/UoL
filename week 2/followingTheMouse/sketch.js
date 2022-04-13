//////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
//////////////////////////////////
// Adapted from https://github.com/nature-of-code/
// released under MIT license

var balls = [];
///////////////////////////////////////////////
function setup() {
  createCanvas(900, 600);
  background(0);
  for (var i = 0; i < 100; i++) {
    balls.push(new Ball());
  }
}
////////////////////////////////////////////////
function draw() {
  balls.forEach(function(ball) {
    ball.run();
  }
  );
  
}
///////////////////////////////////////////////
class Ball {
  constructor() {
    this.velocity = new createVector(0, 0);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 7;
    var randomX = width / 2 + random(-100, 100);
    var randomY = height / 2 + random(-100, 100);
    this.prevLocation = new createVector(randomX, randomY);
    this.location = new createVector(randomX, randomY);

  }

  run() {
    this.draw();
    this.move();
    // this.edges();
  }

  draw() {
    stroke(color(random(255), random(255), random(255)));
    strokeWeight(random(1, 3));
    
    line(this.location.x, this.location.y, this.prevLocation.x, this.prevLocation.y);
    this.prevLocation = this.location.copy();
    // fill(125);

    // ellipse(this.location.x, this.location.y, 40, 40);
  }

  move() {
    var mouse = createVector(mouseX, mouseY);
    var dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.3);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity);
  }

  edges() {
    if (this.location.x < 0) this.location.x = width;
    else if (this.location.x > width) this.location.x = 0;
    else if (this.location.y < 0) this.location.y = height;
    else if (this.location.y > height) this.location.y = 0;
  }
}
