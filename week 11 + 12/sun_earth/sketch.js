var sunText;
var earthText
var moonText;
var starsBuffer;
var starLocs = [];

function preload() {
  sunText = loadImage('assets/sun.jpg');
  earthText = loadImage('assets/earth.jpg');
  moonText = loadImage('assets/moon.jpg');
}

function setup() {
    createCanvas(900, 600, WEBGL);
    angleMode(DEGREES);

    starsBuffer = createGraphics(width, height);
    starsBuffer.background(0);

    for(var i = 0; i < 200; i++)
    {
      // Using Z for intesity of the brightness of the star
      starLocs.push(createVector(random(0, width), random(0, height), random(100, 250)));
    }
}

function draw() {
    background(125);
    
    noStroke();
    // Sky
    push();
      sky();
      rotateX(30);
      translate(0, 0, -300);
      texture(starsBuffer);
      plane(width * 2, height * 2);
    pop();

    camera(0, -height/2, height, 0, 0, 0, 0, 1, 0);

    // Sun
    push();
      rotateY(frameCount/4);
      texture(sunText);
      sphere(80, 80);
    pop();
    pointLight(255, 255, 255, 0, 0, 0);

    ambientMaterial(255);
    
    // Earth
    push();
      ambientLight(20);
      // ambientMaterial(255);s
      rotateY(-frameCount/3);
      translate(230, 0, 0);
      rotateY(frameCount);
      texture(earthText);
      sphere(40, 40);

      // Moon
      push();
        rotateY(frameCount);
        translate(80, 0, 0);
        texture(moonText);
        sphere(15, 15);
      pop();

    pop();
}

function sky()
{
  starsBuffer.background(0);
  for(var i = 0; i < 200; i++)
  {
    starsBuffer.noStroke();
    starsBuffer.fill(255, 255, 255, starLocs[i].z);
    starsBuffer.rect(starLocs[i].x, starLocs[i].y, 2, 2);
  }

  if (frameCount % 60 == 0)
  {
    starLocs.splice(0, 1);
    starLocs.push(createVector(random(0, width), random(0, height), random(100, 250)));
  }
}
