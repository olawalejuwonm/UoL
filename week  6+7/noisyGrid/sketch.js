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
  for (var x = 0; x < width; x += stepSize) {
    for (var y = 0; y < height; y += stepSize) {
      push();
      translate(x + stepSize / 2, y + stepSize / 2);
      
     
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
