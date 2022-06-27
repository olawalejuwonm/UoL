var stepSize = 20;

function setup() {
  createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid() {
  // your code here

  for (var x = 0; x < width; x += stepSize) {
    for (var y = 0; y < height; y += stepSize) {
      // fill(255);
      // stroke(0);
      const n = noise(
        x / 100 + mouseX,
        y / 100 + mouseX,
        frameCount / 100 + mouseX
      );
      const c = lerpColor(color(255, 0, 0), color(0, 255, 0), n);
      // stroke(c);
      fill(c);
      noStroke();
      // fill(255);

      rect(x, y, stepSize, stepSize);
    }
  }
}
///////////////////////////////////////////////////////////////////////
function compassGrid() {
  // your code here
  //TODO: Amend the compassGrid() function to create a grid of 25x25 lines of length stepSize. Make sure each compass is at the center of each tile. By default they should all be pointing up. You should use translate() to move to the center of each grid.
  for (var x = 0; x < width; x += stepSize) {
    for (var y = 0; y < height; y += stepSize) {
      push();
      translate(x + stepSize / 2, y + stepSize / 2);
      //TODO: For each of the compasses generate a 3D noise value, using the compass’ x and y coordinate as well as the frameCount so that the noise values change over time. Make sure you scale the input parameters of the noise function appropriately so that you get organic values out of it. Use that noise value with map() to generate an angle between 0 and 720 degrees. Use that value to rotate the compass.
      //TODO: Make sure you scale the input parameters of the noise function appropriately so that you get organic values out of it
          
     
      const n = noise(
        x / 10000 + mouseX,
        y / 10000 + mouseX,
        frameCount / 10000 + mouseX
      );

      const angle = map(n, 0, 1, 0, 720);
      rotate(angle);
      stroke(0);
      line(0, 0, 0, stepSize);
      pop();
    }
  }
}
