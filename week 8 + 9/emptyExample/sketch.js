function setup() {
  createCanvas(900, 600);
  background(0);
  angleMode(DEGREES);
}

function draw() {
  //   background(0);

  //   translate(width / 2, height / 2);
  //   fill(255);
  // //   var radius = 200;

  //   // for (var theta = 0; theta < 360; theta += 20) {
  //   //     var x = cos(theta) * radius;
  //   //     var y = sin(theta) * radius;
  //   //     ellipse(x, y, 10, 10);
  //   // }

  //   var theta = frameCount;
  //   var radius = frameCount / 10;

  //   noStroke();
  //   var x = cos(theta) * radius;
  //   var y = sin(theta) * radius;
  //   ellipse(x, y, 25, 25);

  //coding osciallatio
  // background(0);
  // fill(255);
  // translate(width / 2, height / 2);
  // var amp = width / 2;
  // var period = 360;
  // var phase = 90;
  // var freq = 1;

  // // var locX = sin(360 * frameCount/period + phase) * amp;
  // var locX = sin(frameCount * 6 * freq + phase) * amp;
  // //It takes 1 second for frameCount to go from 1 to 60

  // ellipse(locX, 0, 30, 30);

  //additive synthesis
  background(0);
  fill(0);
  stroke(255);

  translate(0, height / 2);
  beginShape();

  for (var x = 0; x < width; x++) {
    var wave1 = sin(x + frameCount) * height/4;
    var wave2 = sin(x*10 + frameCount) * height/20;
    var wave3 = noise(x/10 + frameCount/100) * 100;
    vertex(x, wave1 + wave2 + wave3);
  }

  endShape();
 
  // //create a circle
  // background(0);
  // fill(255);
  // translate(width / 2, height / 2);
  // var radius = 200;
  // // ellipse(0, 0, radius * 2, radius * 2);
  // //use sine to move circle on y axis
  // //modulate the circle's size
  // var theta = frameCount;
  // var radius = frameCount / 10;
  // var x = cos(theta) * radius;
  // var y = sin(theta) * radius;
  // ellipse(x, y, 25, 25);


}
