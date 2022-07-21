function setup() {
  createCanvas(900, 600, WEBGL);
  angleMode(DEGREES);
}

function draw() {
  background(125);
  noStroke();


  //Sun at the center of the screen

  // pointLight(0, 255, 0, 0, 0, 0);
  ellipse(0, 0, 120, 120);
  ///The sun should have two point lights at its centre emitting white colour
  pointLight(255, 0, 0, 0, 0, 0);
  pointLight(0, 255, 0, 0, 0, 0);

  // The earth should have an ambient white material
  ambientMaterial(255, 255, 255);
  //The earth should rotate around the sun and around its own axis
  // rotateY(frameCount);
  // rotateX(frameCount);
  rotateZ(frameCount);
  //The earth should be a sphere
  //transalate around the sun
  translate(200, 0, 0);
  sphere(100, 50, 50);
  // //The camera should be slightly lifted, so that you see the scene from slightly above
  // camera(0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
}
