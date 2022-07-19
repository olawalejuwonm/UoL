// function setup() {
//   createCanvas(900, 600);
//   background(0);
// }

// function draw() {

// }



// function setup() {
//   createCanvas(900, 600, WEBGL);
//   background(0);
//   angleMode(DEGREES);
// }

// function draw() {
//   background(125);

//   ellipse(0, 0, 30, 30);

//   rectMode(CENTER);
//   rotateY(frameCount);
//   translate(200, 0, 0);
//   box(300);
// }

//Light material
function setup() {
  createCanvas(500, 500, WEBGL);
  background(125);
}

function draw() {

  // normalMaterial(); 
  //It will add particular lighting to the object x, y and z  
  
  // ambientMaterial(255);
  noStroke();
  // specularMaterial(255);
  ambientMaterial(255, 255, 255);
  // pointLight(255, 0, 0, mouseX-width/2, mouseY-height/2, 100);
  // pointLight(0,255, 0, -200, 0, 100);
  // ambientLight(0, 255, 0);
  directionalLight(255, 0, 0, 0, 1, 0);
  sphere(100, 50, 50);

}
