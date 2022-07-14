function setup() {
  createCanvas(550, 550);
  background(0);
  angleMode(DEGREES);
}
/////////////////////////////////////////////////
function draw() {
  background(0);
  noStroke();
  fill(255, 0, 255);

  translate(width / 2, height / 2);

  //ADDITIVE SYNTHESIS IN A CIRCLE
  var radius = 150;
  beginShape();
  for (var theta = 0; theta < 360; theta += 1) {
    var wave1 = 0; // your sine code here
    //TODO: Add one line of code to set the value of wave1 which will use a sine wave. If you’ve done things right you should see something like the image below. If you don't, check the parameter passed to sin() and how you scale the returned value.
    wave1 = (sin(theta * 10) * radius) / 3;
    //use sin for wave1 to turn the circle to star
    var wave2 = 0; // your noise code here
    wave2 = (noise(theta * 10 + frameCount/50) * radius) / 3;
    var r = radius + wave1 + wave2;
    var x = cos(theta) * r;
    var y = sin(theta) * r;
    vertex(x, y);
  }
  endShape(CLOSE);
}
