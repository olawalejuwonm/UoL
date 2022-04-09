const secLength = 160;
const secWidth = 1;
const minLength = 140;
const minWidth = 3;
const hourLength = 90;
const hourWidth = 5;

function setup() {
  createCanvas(720, 400);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  ellipse(0, 0, 350, 350);

  push();
  strokeWeight(secWidth);
  stroke(200, 0, 0);
  const secAngle = map(second(), 0, 60, 0, 360); // map the seconds to an angle
  rotate(radians(secAngle)); // rotate the angle
  line(0, 0, 0, -secLength); // draw the line
  pop();

  push();
  strokeWeight(minWidth);
  stroke(0);
  const minAngle = map(minute(), 0, 60, 0, 360); // map the seconds to an angle
  rotate(radians(minAngle)); // rotate the angle
  line(0, 0, 0, -minLength); // draw the line
  pop();

  push();
  strokeWeight(hourWidth);
  stroke(0);
  const hourAngle = map(hour(), 0, 12, 0, 360); // map the seconds to an angle
  rotate(radians(hourAngle)); // rotate the angle
  line(0, 0, 0, -hourLength); // draw the line
  push();
  translate(0, -hourLength);
  ellipse(0, 0, 20, 20);
  pop();
  pop();

  const hours = 12;
  const hourStep = 360 / hours;
  for (let i = 0; i < hours; i++) {
    push();
    rotate(radians(hourStep * i));
    translate(0, -155);
    line(0, 0, 0, -20);
    pop();
  }
}
