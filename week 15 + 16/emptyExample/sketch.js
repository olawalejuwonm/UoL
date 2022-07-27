// function setup() {
//     createCanvas(900, 600);
//     background(0);
// }

// function draw() {

// }

//Invert Filters
var imgIn;
var thresholdSlider;
var matrix = [
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9],
  [1 / 9, 1 / 9, 1 / 9]
];

//guarsian blur
matrix = [
  [1 / 16, 1 / 8, 1 / 16],
  [1 / 8, 1 / 4, 1 / 8],
  [1 / 16, 1 / 8, 1 / 16]
];

//sharp filter matrix
matrix = [
  [-1, -1, -1],
  [-1, 9, -1],
  [-1, -1, -1]
];

// matrix = [
//   [1 / 16, 2 / 16, 1 / 16],
//   [2 / 16, 4 / 16, 2 / 16],
//   [1 / 16, 2 / 16, 1 / 16]
// ];

function preload() {
  imgIn = loadImage("assets/seaNettles.jpg");
}

function setup() {
  // createCanvas(900, 600);
  // background(0);
  createCanvas(imgIn.width * 2 + 20, imgIn.height);
  pixelDensity(1);
  thresholdSlider = createSlider(0, 255, 125);
  thresholdSlider.position(20, 20);
}

function draw() {
  background(255);
  image(imgIn, 0, 0);
  // image(InvertFilter(imgIn), imgIn.width + 20, 0);
  // image(grayScaleFilter(imgIn), imgIn.width + 20, 0);
  // image(thresholdFilter(imgIn), imgIn.width + 20, 0);
  image(blurFilter(imgIn), imgIn.width + 20, 0);
  noLoop();
  // console.log(thresholdSlider.value());
}

function InvertFilter(img) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (y * img.width + x) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];
      var a = img.pixels[index + 3];
      imgOut.pixels[index] = 255 - r;
      imgOut.pixels[index + 1] = 255 - g;
      imgOut.pixels[index + 2] = 255 - b;
      imgOut.pixels[index + 3] = a;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function grayScaleFilter(img) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (y * img.width + x) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];
      var a = img.pixels[index + 3];
      //   var avg = (r + g + b) / 3; // Mean average
      var avg = r * 0.299 + g * 0.587 + b * 0.114; //luma
      imgOut.pixels[index] = avg;
      imgOut.pixels[index + 1] = avg;
      imgOut.pixels[index + 2] = avg;
      imgOut.pixels[index + 3] = a;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function thresholdFilter(img) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (y * img.width + x) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];
      var a = img.pixels[index + 3];
      var avg = (r + g + b) / 3; // Mean average

      if (avg > thresholdSlider.value()) {
        avg = 255;
      } else {
        avg = 0;
      }
      imgOut.pixels[index] = avg;
      imgOut.pixels[index + 1] = avg;
      imgOut.pixels[index + 2] = avg;
      imgOut.pixels[index + 3] = a;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function blurFilter(img) {
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrix.length;
  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (y * img.width + x) * 4;
      var c = convolution(x, y, matrix, matrixSize, img);
      imgOut.pixels[index] = c[0];
      imgOut.pixels[index + 1] = c[1];
      imgOut.pixels[index + 2] = c[2];
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  console.log(imgOut);
  return imgOut;
}

function convolution(x, y, matrix, matrixSize, img) {
  var totalRed = 0;
  var totalGreen = 0;
  var totalBlue = 0;

  var offset = floor(matrixSize / 2);

  for (var i = 0; i < matrixSize; i++) {
    for (var j = 0; j < matrixSize; j++) {
      var xLoc = x + i - offset;
      var yLoc = y + j - offset;

      var index = (yLoc * img.width + xLoc) * 4;

      index = constrain(index, 0, img.pixels.length - 1);
      totalRed += img.pixels[index + 0] * matrix[i][j];
      totalGreen += img.pixels[index + 1] * matrix[i][j];
      totalBlue += img.pixels[index + 2] * matrix[i][j];
    }
  }
  return [totalRed, totalGreen, totalBlue];
}
