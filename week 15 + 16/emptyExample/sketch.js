// function setup() {
//     createCanvas(900, 600);
//     background(0);
// }

// function draw() {

// }

//Invert Filters
var imgIn;

function preload() {
  imgIn = loadImage("assets/seaNettles.jpg");
}

function setup() {
  // createCanvas(900, 600);
  // background(0);
  createCanvas(imgIn.width * 2 + 20, imgIn.height);
  pixelDensity(1);
}

function draw() {
  background(255);
  image(imgIn, 0, 0);
  // image(InvertFilter(imgIn), imgIn.width + 20, 0);
  image(grayScaleFilter(imgIn), imgIn.width + 20, 0);
  noLoop();
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
