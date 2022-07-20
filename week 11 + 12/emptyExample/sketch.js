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
// function setup() {
//   createCanvas(500, 500, WEBGL);
//   background(125);
// }

// function draw() {

//   // normalMaterial();
//   //It will add particular lighting to the object x, y and z

//   // ambientMaterial(255);
//   noStroke();
//   // specularMaterial(255);
//   ambientMaterial(255, 255, 255);
//   // pointLight(255, 0, 0, mouseX-width/2, mouseY-height/2, 100);
//   // pointLight(0,255, 0, -200, 0, 100);
//   // ambientLight(0, 255, 0);
//   directionalLight(255, 0, 0, 0, 1, 0);
//   sphere(100, 50, 50);

// }

//CAmera

// function setup() {
//   createCanvas(900, 600, WEBGL);
//   angleMode(DEGREES);
// }

// function draw() {
//   background(125);

//   // var zLoc = (sin(frameCount) + 1 / 2) * height + 200; //zLoc is the z-coordinate of the camera
//   // var xLoc = map(sin(frameCount), -1, 1, 200, 800);
//   // var xLoc = map(noise(frameCount / 100), 0, 1, -500, 800);
//   // var yLoc = map(noise(frameCount / 100 + 100), 0, 1, -500, 800);
//   // var zLoc = map(noise(frameCount / 100 + 150), 0, 1, 300, 800);

//   // var xLoc = cos(frameCount) * height;
//   // var zLoc = sin(frameCount * 3) * height;
//   // var yLoc = sin(frameCount) * 300
//   // camera(xLoc, yLoc, zLoc, 0, 0, 0, 0, 1, 0);

//   var xAim = sin(frameCount*3) * 300;
//   camera(0, 0, height, xAim, 0, 0, 0, 1, 0);
//   normalMaterial();
//   torus(200, 50, 50, 50);
//   translate(0, 100, 0);
//   rotateX(90);
//   fill(200);
//   plane(500, 500);
// }

//Perspective
// function setup() {
//   createCanvas(900, 600, WEBGL);
//   angleMode(DEGREES);
// }

// function draw() {
//   background(125);
//   normalMaterial();

//   camera(0, -200, height, 0, 0, 0, 0, 1, 0);
//   perspective(60, width/height, mouseY, mouseX);
//   for (var i =-600; i < 600; i += 150) {
//     push();
//     translate(i, 0, 0);
//     box(80, 80, 500)
//     pop();

  
//   }


// }