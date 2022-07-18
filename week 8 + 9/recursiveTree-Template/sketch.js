// Code from a modified Daniel Shiffman example
// https://thecodingtrain.com/

var angle = 0;
var seed;

function setup() {
  createCanvas(400, 400);
  seed = random(1000);

}
////////////////////////////////////////////////
function draw() {
  background(225);
  angleMode(DEGREES);
  randomSeed(seed);
  angle = 45;
  stroke(255);
  translate(200, height);
  angle = random(45, );

  //TODO: Play around with this so that some branches are bigger and shorter. Give it a random range from 0.5 to 0.8. Don’t worry about calling the random() function again and again in your draw() loop. We’ve called the randomSeed() function in the setup() function so that you get always the same values within your sketch
  branch(random(100, 120), random(1, 3));
  //TODO: The angle of the next branch is now set to a static 45 degrees. Make this random as well and different on each side

  // branch(100, 3);
}


/////////////////////////////////////////////////
function branch(len, thickness) {
  stroke(0);
  strokeWeight(thickness);
  //TODO: Make the trunk be dark brown and as you go up the branches they become a bit lighter
  // stroke(0, 0, 0, map(len, 0, 400, 0, 255));
  line(0, 0, 0, -len);
  translate(0, -len);
  //TODO: Add wind to your sketch by adding a certain amount to your random angle within branch() using the noise() function. Knowing what you know now about particles, you could have leaves falling of the tree at random times!
  

  if (len > 4) {
    //Scale the angle to act like a wind
    // angle += random(-10, 10);
    push();
    rotate(angle);
    branch(len * 0.67, thickness*0.8);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67, thickness*0.8);
    pop();
  }
  //TODO: Add an “else” part to this if-statement so that when the branch is too small to be further subdivided an leaf in the shape of an ellipse is drawn in it’s place. Make the leaf colors be interesting and plausible, not simply random
  else {
    fill(255, 0, 0);
    ellipse(0, 0, random(10, 20), random(10, 20));
  }

  angle += noise(frameCount / 100) / 180 * angle;



}

//set time out for 2 seconds
function myTimer(time, func) {
  setTimeout(function () {
    // console.log("Hello");
    func();
  }, time * 1000);
}

//console angle on mousePressed
function mousePressed() {
  console.log(angle);
}
