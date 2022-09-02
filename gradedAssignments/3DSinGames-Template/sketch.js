let confLocs = [];
let confTheta = [];
let slider;
function setup() {
  createCanvas(900, 800, WEBGL);
  //use a for loop to push 200 3D vectors into confLocs. Make the x component of the vector have random values ranging from -500 to 500, the y component from -800 to 0 and the z component from -500 to 500. This way we’ll have spread confetti all over the structure.

  for (let i = 0; i < 200; i++) {
    confLocs.push(
      createVector(random(-500, 500), random(-800, 0), random(-500, 500))
    );
  }

  //Push also a random angle from 0 to 360 onto the confTheta array.
  for (let i = 0; i < 200; i++) {
    confTheta.push(random(0, 360));
  }
  slider = createSlider(0, 10, 1);
  //   confetti();
}

//Create a function called confetti() where you’ll loop over the confLocs array. For each entry translate to that location the 3D vector describes, rotate by the corresponding theta and draw a plane of size 15x15. Remember to  apply these transformations within a push()/pop() pair so that it looks right.
// function confetti() {
//   push();
//   for (let i = 0; i < confLocs.length; i++) {
//     translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
//     rotateX(confTheta[i]);
//     plane(15, 15);
//   }
//   pop();
// }
//Let’s animate the confetti! Increment the y-coordinate of the specific confetti by 1 so that it keeps travelling downwards, and increment the rotation by 10 so that it keeps spinning.
// At the bottom of the for loop add an if statement to check if the y-coordinate of the confetti is greater than 0, that is, if it has reached the middle of the coordinate system. If it has, set the specific vector’s y component to -800, so that the confetti starts at the top of our world.
//Leave the other two components intact
function confetti() {
  for (let i = 0; i < confLocs.length; i++) {
    push();

    //Increment the y-coordinate of the specific confetti by 1 so that it keeps travelling downwards, and increment the rotation by 10 so that it keeps spinning.

    confLocs[i].y += 1;
    confTheta[i] += 10;
    translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
    rotateX(confTheta[i]);
    plane(15, 15);

    //At the bottom of the for loop add an if statement to check if the y-coordinate of the confetti is greater than 0, that is, if it has reached the middle of the coordinate system. If it has, set the specific vector’s y component to -800, so that the confetti starts at the top of our world. Leave the other two components intact.
    if (confLocs[i].y > 0) {
      confLocs[i].y = -800;
    }
    pop();
  }
}

function draw() {
  background(125);
  angleMode(DEGREES);
  //Step 2: Set the material to normal, set the stroke to zero and use a stroke weight of two to better distinguish the boxes.

  noStroke();
  strokeWeight(2);
  normalMaterial();
  //Step 1: Using a nested for loop, create a grid of boxes of size 50x50x50 from -400 to 400 in the x-axis and -400 to 400 on the z-axis. Place the camera at location (800, -600, 800) and have it point at the centre of the scene.
  //Place the camera at location (800, -600, 800) and have it point at the centre of the scene.
  //   camera(800, -600, 800, 0, 0, 0, 0, 1, 0);
  //Amend the camera() command and get the camera to fly in a circle around the structure we have created
  //xLoc value will go in a circle around the structure
  //   let xLoc = cos(frameCount) * length;
  //   let yLoc = map(sin(frameCount), -1, 1, -600, 600);
  //   let zLoc = map(cos(frameCount), -1, 1, 800, 800);
  //   //   camera(xLoc, yLoc, zLoc, 0, 0, 0, 0, 1, 0);
  //   camera(xLoc, -600, 800, 0, 0, 0, 0, 1, 0);

  var xLoc = cos(frameCount) * (height * 1.5);
  var zLoc = sin(frameCount) * (height * 1.5);
  camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);

  //   console.log(xLoc);
  //   camera(mouseX, -600, 800, 0, 0, 0, 0, 1, 0);

  for (let x = -400; x < 400; x += 50) {
    for (let z = -400; z < 400; z += 50) {
      //For each box in the nested for loop, calculate its distance from the centre of the coordinate system using its x and z coordinates and dist(), then save it in a variable called distance.
      let distance = dist(x, 0, z, 0, 0, 0);
      //Create a new variable length and modulate its value from 100 to 300 using the sin() function and the distance variable. Use the length variable to set the height of the boxes. If you have done things right you should have a wavy structure
      distance += frameCount;

      let length = map(sin(distance * slider.value()), -1, 1, 100, 300);
      //Use the length variable to set the height of the boxes
      //   box(50, length, 50);
      // Add frameCount to distance in order to animate the wave.

      push();

      translate(x, 0, z);
    //   Add red and green pointLight to the box
        pointLight(255, 0, 20, 0, 0, 0);
        pointLight(10, 255, 50, 0, 0, 0);
        // pointLight(0, 0, 255, 0, 0, 0);

      //   ambientMaterial(255, 255, 255);
      specularMaterial(255, 255, 255);

      box(50, length, 50);
      pop();
    }
  }
  confetti();
}
