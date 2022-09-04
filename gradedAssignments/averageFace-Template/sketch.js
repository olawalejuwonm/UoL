var imgs = [];
var avgImg;
var numOfImages = 30;
var imageIndex = 0;

//////////////////////////////////////////////////////////
function preload() {
  // preload() runs once
  //Step 1: Let’s load the faces in memory. Inspect the assets folder. Notice there are 30 images with names starting from 0.jpg to 29.jpg. Use a for loop within the preload() function to load all 30 images into the imgs array
  for (var i = 0; i < numOfImages; i++) {
    const filename = "assets/" + i + ".jpg"
    imgs[i] = loadImage(filename);
  }
  console.log(imgs);
}
//////////////////////////////////////////////////////////
function setup() {
  //   createCanvas(100, 100);
  //Step 2: Update the createCanvas() line to create a canvas twice the width of the first image in the array, and equal to the first image’s height. Draw the first image on the left of the canvas
  createCanvas(imgs[0].width * 2, imgs[0].height);
  pixelDensity(1);

  //Text explaining the function of the program
  textSize(16);
  textAlign(CENTER);
  text("You can press any key to see a random face, move the mouse horizontally to see the average face", width / 2, height / 2);

  //   mouseX = 0; //set the mouseX to 0 to see the average face
  //Step 3: In the setup() function initialise the avgImg variable using the createGraphics() command. Set its size equal to the size of the first image in the array.
  avgImg = createGraphics(imgs[0].width, imgs[0].height);
}
//////////////////////////////////////////////////////////
function draw() {
  background(125);
  //This draw the first image on the left of the canvas. 
  image(imgs[imageIndex], 0, 0);

  // use a for loop to call the loadPixels() command on all images within imgs. Also call loadPixels() on the avgImg variable.
  for (var i = 0; i < imgs.length; i++) {
    imgs[i].loadPixels();
  }
  avgImg.loadPixels();

  //Step 5: Create a nested for-loop looping over all pixels on the first image in the array. Convert the x and y coordinates from the for-loop to a pixel index value and use that value to set the corresponding pixel in the avgImg to red.
  for (var x = 0; x < imgs[0].width; x++) {
    for (var y = 0; y < imgs[0].height; y++) {
      //Inside the nested for loop, this create three variables sumR, sumG, sumB and initialise them to 0.
      var sumR = 0;
      var sumG = 0;
      var sumB = 0;
      //This create a for-loop just under these variables, looping through all the images in the imgs array and
      for (var i = 0; i < imgs.length; i++) {
        //For each channel this add its value to the corresponding sum variable.
        sumR += imgs[i].pixels[(y * imgs[0].width + x) * 4];
        sumG += imgs[i].pixels[(y * imgs[0].width + x) * 4 + 1];
        sumB += imgs[i].pixels[(y * imgs[0].width + x) * 4 + 2];
      }
      //Just under this for-loop, this will update each channel in the avgImg
      avgImg.pixels[(y * imgs[0].width + x) * 4] = sumR / imgs.length;
      avgImg.pixels[(y * imgs[0].width + x) * 4 + 1] = sumG / imgs.length;
      avgImg.pixels[(y * imgs[0].width + x) * 4 + 2] = sumB / imgs.length;
      avgImg.pixels[(y * imgs[0].width + x) * 4 + 3] = 255;

    }
    //After exiting the nested for loop, this will update the pixels of the 
    //avgImg to let p5js know that the image has had its data changed, and draw
    // the avgImg to the right of the existing image.
    avgImg.updatePixels();
    image(avgImg, imgs[0].width, 0);
  }

  //Also add a noLoop() at the end of the draw() function
  noLoop();
}

function keyPressed() {
  //This is a random face from the array of faces rather than just the first one
  imageIndex = floor(random(0, imgs.length));
  loop();
}

//On mouse moved this have the pixel values of the second image transition
// between the imageIndex and the average image based on the mouseX value using lerp function
function mouseMoved() {
  //This will deep copy avgImg to img2
  var img2 = avgImg.get();
  img2.loadPixels();
  for (var x = 0; x < imgs[0].width; x++) {
    for (var y = 0; y < imgs[0].height; y++) {
      var index = (y * imgs[imageIndex].width + x) * 4;
      img2.pixels[index] = floor(
        lerp(
          avgImg.pixels[index],
          imgs[imageIndex].pixels[index],
          mouseX / width
        )
      );
      img2.pixels[index + 1] = floor(
        lerp(
          avgImg.pixels[index + 1],
          imgs[imageIndex].pixels[index + 1],
          mouseX / width
        )
      );
      img2.pixels[index + 2] = floor(
        lerp(
          avgImg.pixels[index + 2],
          imgs[imageIndex].pixels[index + 2],
          mouseX / width
        )
      );
    }
  }
  img2.updatePixels();
  image(img2, imgs[0].width, 0);
}
