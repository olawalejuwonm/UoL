// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64],
  [1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64, 1 / 64]
];
/////////////////////////////////////////////////////////////////
function preload() {
  imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup() {
  createCanvas((imgIn.width * 2), imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw() {
  background(125);
  image(imgIn, 0, 0);
  image(earlyBirdFilter(imgIn), imgIn.width, 0);
  noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed() {
  loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img) {
  var resultImg = createImage(imgIn.width, imgIn.height);
  resultImg = sepiaFilter(imgIn);
  resultImg = darkCorners(resultImg);
  // resultImg = radialBlurFilter(resultImg);
  // resultImg = borderFilter(resultImg)
  return resultImg;
}

function sepiaFilter(img) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (y * img.width + x) * 4;
      var oldRed = img.pixels[index + 0];
      var oldGreen = img.pixels[index + 1];
      var oldBlue = img.pixels[index + 2];
      var oldAlpha = img.pixels[index + 3];
      var newRed = (oldRed * .393) + (oldGreen *.769) + (oldBlue * .189)
      var  newGreen = (oldRed * .349) + (oldGreen *.686) + (oldBlue * .168)
      var newBlue = (oldRed * .272) + (oldGreen *.534) + (oldBlue * .131)
      imgOut.pixels[index] = newRed;
      imgOut.pixels[index + 1] = newGreen;
      imgOut.pixels[index + 2] = newBlue;
      imgOut.pixels[index + 3] = oldAlpha;

    }
  }
  imgOut.updatePixels();
  return imgOut;
}

//What you’ll need to do is adjust the luminosity/brightness of the pixel by scaling each colour channel. Pixels that are: 

// up to 300 pixels away from the centre of the image – no adjustment (multiply each channel by 1)

// from 300 to 450 scale by 1 to 0.4 depending on distance

// 450 and above scale by a value between 0.4 and 0

