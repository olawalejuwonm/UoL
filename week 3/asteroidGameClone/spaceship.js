class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  draw(){
    fill(125);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);
  }

  move(){
      // YOUR CODE HERE (4 lines)
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxVelocity);
      this.location.add(this.velocity);
      this.acceleration.mult(0); //reset acceleration
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0.1, 0));
      }
      if (keyIsDown(UP_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, -0.1));
      }
      if (keyIsDown(DOWN_ARROW)){
      // YOUR CODE HERE (1 line)
      this.applyForce(createVector(0, 0.1));
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
    //YOUR CODE HERE (6 lines approx)
    //When the spaceship enters the earth's atmosphere it's affected by the earth's gravity. Create a "downwards-pointing" vector of strength 0.05 which pulls the spaceship towards the earth. The atmosphere also introduces friction and the spaceship can't move forever like in empty space. It will decelerate unless it fires its engines. Create a force called friction that's 30 times smaller than the velocity of the spaceship, points the opposite direction to velocity and is then applied in the the opposite direction.
    this.applyForce(createVector(0, 0.05));
    var friction = createVector(this.velocity.x, this.velocity.y);
    friction.mult(-0.3);
    this.applyForce(friction);
    
    

    // spaceship.applyForce(createVector(0, 0.05));
    // var friction = spaceship.velocity.copy();
    // friction.mult(-30);
    // spaceship.applyForce(friction);
  }
}
