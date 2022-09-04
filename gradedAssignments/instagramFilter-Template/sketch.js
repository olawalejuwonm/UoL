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
  //This is to add a text below the canvas
  textSize(20);
  textAlign(CENTER);
  createP(`<pre>
  This is an interactive image filter.
  A default image has been loaded, but you can change it by clicking choose file below.
  The image on the left is the original image.
  The image on the right is the result of the filter.
  You can:
        Press Escape key to reset the image on the right side to the original image at anytime.
        Press I to apply invert filter.
        Press S to apply sepia filter.
        Press D to apply dark corners filter.
        Press R to apply radial blur filter.
        Press B to apply border filter.
        Press G to apply grayscale filter.
        Press H to apply sharpen filter.
        </pre>
  `);
  createFileInput(handleFile); //This is to add a file input
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
  var resultImg = createImage(img.width, img.height);
  resultImg = sepiaFilter(img);
  resultImg = darkCorners(resultImg);
  resultImg = radialBlurFilter(resultImg);
  resultImg = borderFilter(resultImg)
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
      var newRed = (oldRed * .393) + (oldGreen * .769) + (oldBlue * .189)
      var newGreen = (oldRed * .349) + (oldGreen * .686) + (oldBlue * .168)
      var newBlue = (oldRed * .272) + (oldGreen * .534) + (oldBlue * .131)
      imgOut.pixels[index] = newRed;
      imgOut.pixels[index + 1] = newGreen;
      imgOut.pixels[index + 2] = newBlue;
      imgOut.pixels[index + 3] = 255;

    }
  }
  imgOut.updatePixels();
  return imgOut;
}


function darkCorners(img) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();
  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (y * img.width + x) * 4;
      var oldRed = img.pixels[index + 0];
      var oldGreen = img.pixels[index + 1];
      var oldBlue = img.pixels[index + 2];
      var newRed;
      var newGreen;
      var newBlue;
      var dynLum
      //The map() and constrain() functions are used in order to remap the distance of 
      //each pixel to a new variable called dynLum (for dynamic luminance) which will hold
      // the scaling that will be required for each channel.

      var distance = dist(x, y, img.width / 2, img.height / 2)
      //Pixels that are: 
      // up to 300 pixels away from the centre of the image – no adjustment (multiply each channel by 1)
      //no adjustment - multiply each channel by 1 implies that the dynamic luminance is 1
      if (distance < 300) {
        dynLum = 1;
      }
      // from 300 to 450 are scale by 1 to 0.4 depending on distance
      else if (distance < 450) {
        dynLum = map(distance, 300, 450, 1, 0.4);
      }
      // 450 and above are scale by a value between 0.4 and 0
      else {
        dynLum = map(distance, 450, img.width, 0.4, 0);
      }
      // dynLum = map(dist(x, y, img.width / 2, img.height / 2), 0, 450, 1, 0.4);
      newRed = constrain(oldRed * dynLum, 0, 255);
      newGreen = constrain(oldGreen * dynLum, 0, 255);
      newBlue = constrain(oldBlue * dynLum, 0, 255);

      //The new values are assigned to the pixels of the output image
      imgOut.pixels[index] = newRed;
      imgOut.pixels[index + 1] = newGreen;
      imgOut.pixels[index + 2] = newBlue;
      imgOut.pixels[index + 3] = 255;

    }
  }
  imgOut.updatePixels();
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

function radialBlurFilter(img) {
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrix.length;
  imgOut.loadPixels();
  img.loadPixels();


  for (var x = 0; x < img.width; x++) {
    for (var y = 0; y < img.height; y++) {
      var index = (y * img.width + x) * 4;
      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];
      var newRed;
      var newGreen;
      var newBlue;
      var c = convolution(x, y, matrix, matrixSize, img);
      //This a radial filter that blurs more as you move away from its centre
      //dynBlur is a value generated using the distance from the mouse
      var dynBlur;
      var distance;
      // For each pixel i calculate the distance between it and the mouse on imgIn variable
      //mouseX and mouseY coordinates on imgIn
      //This check if mouseX and mouseY are within the bounds of the imgIn variable
      if (mouseX > 0 && mouseX < img.width && mouseY > 0 && mouseY < img.height) {
        // distance is the distance between the mouse and the pixel
        distance = dist(x, y, mouseX, mouseY);

      }
      //When the pixels are up to 100 pixels from the mouse they are clear 
      //(the original image values are used and none of the ones returned from the convolution).
      //So the dynamic blur is 0
      if (distance < 100) {
        dynBlur = 0;
      }
      //When the distance from the mouse increases from 100 to 300, more of the
      // blurred image is gradually used until 300 is reached - after which only
      // the blurred image is used and none of the original (i.e. clear) image.
      // I remap the distance from a range 100 to 300 to a new range from 0 to 1
      else if (distance < 300) {
        dynBlur = map(distance, 100, 300, 0, 1);
      }

      //When the distance from the mouse increases from 100 to 300, 
      //more of the blurred image is gradually used until 300 is reached - 
      //after which only the blurred image is used and none of the original (i.e. clear) image.
      //The dynamic blur is 1
      else {
        dynBlur = 1;
      }
      //I then need to constrain the returned value from 0 to 1
      dynBlur = constrain(dynBlur, 0, 1);
      //I then need to multiply the original image values by the dynBlur variable
      newRed = c[0] * dynBlur + r * (1 - dynBlur);
      newGreen = c[1] * dynBlur + g * (1 - dynBlur);
      newBlue = c[2] * dynBlur + b * (1 - dynBlur);

      imgOut.pixels[index] = newRed;
      imgOut.pixels[index + 1] = newGreen;
      imgOut.pixels[index + 2] = newBlue;
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function borderFilter(img) {
  //This create a local buffer called buffer of the same size as the input image
  var buffer = createGraphics(img.width, img.height);
  //This draw the img onto the buffer
  buffer.image(img, 0, 0);
  //This draw a big, fat, white rectangle with rounded corners around the image
  buffer.noFill()
  buffer.stroke(255);
  buffer.strokeWeight(25);
  buffer.rect(0, 0, img.width, img.height, 70);

  //This draw another rectangle now, without rounded corners, in order to get rid of the little triangles
  buffer.rect(0, 0, img.width, img.height);


  return buffer;
}

function greyscaleFilter(img) {
  var imgOut = createImage(img.width, img.height);
  imgOut.loadPixels();
  img.loadPixels();

  for (x = 0; x < imgOut.width; x++) {
    for (y = 0; y < imgOut.height; y++) {

      var index = (x + y * imgOut.width) * 4;

      var r = img.pixels[index + 0];
      var g = img.pixels[index + 1];
      var b = img.pixels[index + 2];

      var gray = (r + g + b) / 3; // simple
      // var gray = r * 0.299 + g * 0.587 + b * 0.114; // LUMA ratios 

      imgOut.pixels[index + 0] = imgOut.pixels[index + 1] = imgOut.pixels[index + 2] = gray;
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function invertFilter(img) {
  imgOut = createImage(img.width, img.height);

  imgOut.loadPixels();
  img.loadPixels();

  for (var x = 0; x < imgOut.width; x++) {
    for (var y = 0; y < imgOut.height; y++) {

      var index = (x + y * imgOut.width) * 4;

      var r = 255 - img.pixels[index + 0];
      var g = 255 - img.pixels[index + 1];
      var b = 255 - img.pixels[index + 2];

      imgOut.pixels[index + 0] = r;
      imgOut.pixels[index + 1] = g;
      imgOut.pixels[index + 2] = b;
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}

function sharpenFilter(img) {
  var imgOut = createImage(img.width, img.height);
  var matrixSize = matrix.length;

  imgOut.loadPixels();
  img.loadPixels();

  // read every pixel
  for (var x = 0; x < imgOut.width; x++) {
    for (var y = 0; y < imgOut.height; y++) {

      var index = (x + y * imgOut.width) * 4;
      var c = convolution(x, y, matrix, matrixSize, img);

      imgOut.pixels[index + 0] = c[0];
      imgOut.pixels[index + 1] = c[1];
      imgOut.pixels[index + 2] = c[2];
      imgOut.pixels[index + 3] = 255;
    }
  }
  imgOut.updatePixels();
  return imgOut;
}





function keyPressed() {
  //If ESC is pressed, the image will be reset to the original image
  if (keyCode === 27 || key === 'Escape') {
    image(imgIn, imgIn.width, 0);
  }
  //This will get present image from the left of the canvas so that different filter can be applied to it
  let currentImage = get(imgIn.width, 0, imgIn.width, imgIn.height);
  //If R is pressed, this will apply radial blur filter to the image
  if (keyCode === 82 || key === 'r') {
    image(radialBlurFilter(currentImage), imgIn.width, 0);
  }
  //If S is pressed, this will apply sepia filter to the image
  if (keyCode === 83 || key === 's') {
    image(sepiaFilter(currentImage), imgIn.width, 0);
  }
  //If G is pressed, this will apply greyscale filter to the image
  if (keyCode === 71 || key === 'g') {
    image(greyscaleFilter(currentImage), imgIn.width, 0);
  }
  //If I is pressed, this will apply invert filter to the image
  if (keyCode === 73 || key === 'i') {
    image(invertFilter(currentImage), imgIn.width, 0);
  }
  //If B is pressed, this will apply border filter to the image
  if (keyCode === 66 || key === 'b') {
    image(borderFilter(currentImage), imgIn.width, 0);
  }
  //If H is pressed, this will apply sharpen filter to the image
  if (keyCode === 72 || key === 'h') {
    image(sharpenFilter(currentImage), imgIn.width, 0);
  }
  //If D is pressed, this will apply dark conner filter to the image
  if (keyCode === 68 || key === 'd') {
    image(darkCorners(currentImage), imgIn.width, 0);
  }

}

//Additional functions
//This is use for handling file upload
async function handleFile(file) {
  if (file.type === 'image') { // check if the file is an image
    const resultingImg = createImg(file.data, "", "uploaded image", function success() {
      //The function will be called when the image is loaded
      resultingImg.hide(); // hide the image in the browser
      //This converts it to p5.image
      let imgBuffer = createGraphics(resultingImg.width, resultingImg.height);
      imgBuffer.image(resultingImg, 0, 0);
      imgIn = imgBuffer.get(); //This will get the image from the buffer
      resizeCanvas(imgIn.width * 2, imgIn.height); //Resize the canvas to fit the image uploaded
      image(imgIn, 0, 0);
      image(imgIn, imgIn.width, 0);


    });

  }
  else {
    alert('Please upload an image file.');
  }

}