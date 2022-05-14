var points;
var font;
var amt;

function preload() {
  font = loadFont("assets/Calistoga-Regular.ttf");
}

//////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(900, 400);
  background(0);
  amt = 20;

  points = font.textToPoints("c o d e", 50, 300, 300, {
    sampleFactor: 0.3,
    simplifyThreshold: 0,
  });
}

//////////////////////////////////////////////////////////////////////
function draw() {
  fill(0, 5);
  rect(0, 0, width, height);

  amt = map(mouseX, 0, width, 0, 80);

  // **** Your code here ****
  for (var i = 0; i < points.length; i++) {
    var pt = points[i];

    var nX = noise(frameCount + pt.x);
    var g = map(nX, 0, 1, 0, 255);


    var x = map(nX, 0, 1, -amt, amt);

    var nY = noise(frameCount + pt.y + 100);

    var y = map(nY, 0, 1, -amt, amt);
    fill(0, random(255), 0, g);
    ellipse(pt.x + x, pt.y + y, map(nX, 0, 1, 10, 50), map(nY, 0, 1, 10, 50));
  }
}
