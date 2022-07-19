function setup() {
  createCanvas(900, 600, WEBGL);
}

function draw() {
  background(0);


  normalMaterial()
  //Rotating plane
  push();
  translate(-width/2 + 100, -height/2 + 100, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  plane(100);
  pop();

  //Rotating cube
  push();
  translate(-width/2 + 300, -height/2 + 100, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  box(100);
  pop();

  //Rotating sphere
  push();
  translate(-width/2 + 500, -height/2 + 150, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  sphere(100);
  pop();

  //Rotating cone
  push();
  translate(-width/2 + 700, -height/2 + 150, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  cone(100);
  pop();

  //Rotating cylinder
  push();
  translate(-width/2 + 300, -height/2 + 350, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  cylinder(100);
  pop();

  //Rotating torus
  push();
  translate(-width/2 + 500, -height/2 + 350, 0);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  rotateZ(frameCount * 0.01);
  torus(100);
  pop();

}




