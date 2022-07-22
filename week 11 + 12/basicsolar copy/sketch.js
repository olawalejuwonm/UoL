var sunImg;
var earthImg;
var moonImg;
var buffer;
var starsLoc = [];

function preload() {
  sunImg = loadImage("assets/sun.jpg");
  earthImg = loadImage("assets/earth.jpg");
  moonImg = loadImage("assets/moon.jpg");
}

function setup() {
  createCanvas(900, 600, WEBGL);
  angleMode(DEGREES);
  //Create a "stars plane" that is in the background of the scene and apply to it a dynamic texture (an off-screen buffer) which you have generated using the createGraphics() function. Remember to rotate your plane by 40 degrees or so, so that it faces the camera at the appropriate angle.
  // buffer = createGraphics(500, 300);
  buffer = createGraphics(width, height);
  buffer.background(0);
  // buffer.noStroke();
  //Create an array called starLocs which you populate with 200 random locations on that buffer in your setup function.
  for (var i = 0; i < 200; i++) {
    starsLoc[i] = createVector(
      random(0, buffer.width),
      random(0, buffer.height)
    );
  }
}

// Write a function sky() that loops over starLocs and draws a small white rectangle in each location specified
function sky() {
  for (var i = 0; i < starsLoc.length; i++) {
    // console.log(starsLoc[i]);
    buffer.fill(255);
    buffer.rect(starsLoc[i].x, starsLoc[i].y, 2, 2);
    //delete the star from the array
    starsLoc.splice(i, 1);
    //generate a new star at a random location
    starsLoc[i] = createVector(
      random(0, buffer.width),
      random(0, buffer.height)
    );
  }
}

function draw() {
  sky();

  background(125);

  noStroke();

  //Sun at the center of the screen
  // //The camera should be slightly lifted, so that you see the scene from slightly above
  camera(0, 0, height, 0, 0, 0, 0, 1, 0);
  // camera(0, 0, 0, 0, 0, 0, 0, 0, 1, 0);
  //Create a "stars plane"
  // plane(width, height);

  texture(buffer);

  //Remember to rotate your plane by 40 degrees or so, so that it faces the camera at the appropriate angle.
  //Draw a plane that is in the background of the scene and apply to it the texture you created in your setup function.
  plane(width * 2, height * 2);

  push();

  // pointLight(0, 255, 0, 0, 0, 0);
  //Rotate the sun on its Y-axis
  rotateZ(frameCount / 5);
  texture(sunImg);
  ellipse(0, 0, 120, 120);

  pop();

  ///The sun should have two point lights at its centre emitting white colour
  pointLight(255, 0, 0, 0, 0, 0);
  pointLight(0, 255, 0, 0, 0, 0);

  push();
  // The earth should have an ambient white material
  ambientMaterial(255, 255, 255);
  //The earth should rotate around the sun and around its own axis
  // rotateX(frameCount);
  rotateY(0);
  rotateZ(frameCount);

  // rotateY(frameCount);

  //The earth should be a sphere
  //transalate around the sun
  translate(200, -100, 0);
  //Load the appropriate texture on the earth using the asset
  texture(earthImg);
  sphere(100, 50, 50);
  pop();

  //Add a moon to the earth
  push();
  noStroke();
  // fill(255, 255, 255);
  //The moon should be a sphere
  //transalate around the earth
  translate(-300, -300, 0);
  // translate(-mouseX, -mouseY, 0);
  //Load the appropriate texture on the moon using the asset
  texture(moonImg);
  sphere(50, 50, 50);
  pop();

}
