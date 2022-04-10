var speed;

function setup() {
  createCanvas(900, 700);
}

function draw() {
  background(0);
  speed = frameCount;


  push();
    translate(width / 2, height / 2);

    //Step 5
    rotate(radians(speed/3))

    celestialObj(color(255, 150, 0), 200); // SUN

  pop();

  push();
    translate(width / 2, height / 2);
    //Step 2
    rotate(radians(speed));

    translate(300, 0);
    
    //Step 3
    rotate(radians(speed));

    //Step 1
    celestialObj(color(0, 0, 255), 80); // EARTH

    //Step 4
    rotate(radians(speed));
    translate(100, 0);
    rotate(radians(-speed *2));

    celestialObj(color(255, 255, 255), 30); // MOON


    rotate(radians(speed));
    translate(-50, 0);
    rotate(radians(-speed*3));
    celestialObj(color(255, 0, 0), 20); // ASTEROID


  pop();


}

function celestialObj(c, size) {
  strokeWeight(5);
  fill(c);
  stroke(0);
  ellipse(0, 0, size, size);
  line(0, 0, size / 2, 0);
}
