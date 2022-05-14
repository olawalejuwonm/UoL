var font;
function preload() {
  font = loadFont('assets/Calistoga-Regular.ttf');
}

var points;

function setup() {
  createCanvas(900, 400);
  fill(255, 104, 204, 150);
  noStroke();

  points = font.textToPoints('c o d e', 50, 300, 300, {
    sampleFactor: .3,
    simplifyThreshold: 0
  });

}

function draw() {
    background(0);

    // *** your code here ****
    for (var i = 0; i < points.length; i++) {
        var pt = points[i];
        //use the random() function to add a random amount to the x and y coordinates of each point in order to make it appear in a new location. HINT: the random() function will return a different range of values depending on how many arguments are passed into it, look at the p5.js random() reference to remind yourself. 
        //Use mouseX to vary the range the random() function takes to generate the value that you add to the location of each point. HINT: you can use the map() function to map mouseX to a new range.
        var x = map(mouseX, 0, width, 0, random(0, width/2));
        var y = map(mouseY, height, 0, 0, random(0, height/2));
        console.log(x, y);
        ellipse(pt.x + x, pt.y + y, 10, 10);
    }
    noLoop();
}

function mouseMoved(){
    loop();
}
