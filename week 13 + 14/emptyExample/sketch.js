// function setup() {
//     createCanvas(900, 600);
//     background(0);
// }

// function draw() {

// }

//ColorMode
// function setup() {
//     createCanvas(500, 500);
//     // background(0);
//     colorMode(RGB);

//     for (var i = 0; i<255; i++) {
//         for (var j = 0; j<255; j++) {
//            stroke(i, j, 0);
//            point(i, j);
//         }

//     }
//     colorMode(HSB);

//     translate(0, 300)

//     for (var i = 0; i<360; i++) { //For Hue
//         for (var j = 0; j<100; j++) { //For Saturation or Brightness
//             stroke(i, 100, j);
//             point(i, j);
//         }
//     }

//     noLoop()
// }

// function draw() {

// }

//Color Harmony
// function setup() {
//   createCanvas(720, 400);
//   // background(0);
//   colorMode(HSB);
//   noStroke();
//   rectMode(CENTER);
// }

// function draw() {
//   background(0);
//   fill(0, 100, 100);
//   rect(width / 2, height / 2, 200, 200);
//   //color that has contrast with red
//   fill(180, 100, 100);
//   rect(width / 2, height / 2, 100, 100);
// }

//Using a webcam
// var video;
// function setup() {
//     createCanvas(900, 600);
//     pixelDensity(1);
//     video = createCapture(VIDEO);
//     video.hide();
// }

// function draw() {
//     background(255)

//     // imageMode(CENTER);
//     // translate(width/2, height/2);
//     // scale(-1, 1, 1); //flip the image
//     var c = video.get(mouseX, mouseY);
//     image(video, 0, 0);

// }

//pixel Access
var img;
function preload() {
  img = loadImage("assets/rockets.png");
}
function setup() {
  createCanvas(900, 600);
  pixelDensity(1);
}

function draw() {
  background(255);

  image(img, 0, 0);

  img.loadPixels();

  var index = (img.width * mouseY + mouseX) * 4;
  var redChannel = img.pixels[index + 0];
  var greenChannel = img.pixels[index + 1];
  var blueChannel = img.pixels[index + 2];
  var alphaChannel = img.pixels[index + 3];

  fill(redChannel, greenChannel, blueChannel, alphaChannel);
  //   var c = img.get(mouseX, mouseY);

  //   fill(c);
  rect(mouseX, mouseY, 50, 50);
}
