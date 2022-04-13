let ball;
function setup() {
  createCanvas(900, 600);
  background(0);
  ball = new Ball();
}

function draw() {
  ball.run();
}

class Ball {
  constructor() {
    this.velocity = new createVector(0, 0);
    this.location = new createVector(0, height / 2);
    this.prevLocation = new createVector(width / 2, height / 2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
  }
  run() {
    this.draw();
    this.move();
    // this.bounce();
    this.edges();
  }
  draw() {
    fill(125);
    stroke(255);
    // ellipse(this.location.x, this.location.y, 40, 40);
    line(
      this.location.x,
      this.location.y,
      this.prevLocation.x,
      this.prevLocation.y
    );

    this.prevLocation = this.location.copy();
  }
  bounce() {
    if (this.location.x > width || this.location.x < 0) {
      this.velocity.x *= -1;
    }
    if (this.location.y > height || this.location.y < 0) {
      this.velocity.y *= -1;
    }
  }

  move() {
    let mouse = new createVector(mouseX, mouseY);
    let dir = p5.Vector.sub(mouse, this.location);
    dir.normalize();
    dir.mult(0.5);
    this.acceleration = dir;

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxVelocity);
    this.location.add(this.velocity); //This is the addition of x and y components of location and velocity
  }

  edges() {
    if (this.location.x < 0) {
      this.location.x = width;
    } else if (this.location.x > width) {
      this.location.x = 0;
    } else if (this.location.y < 0) {
      this.location.y = height;
    } else if (this.location.y > height) {
      this.location.y = 0;
    }
  }
}
