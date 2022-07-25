var video;

function setup() {
  createCanvas(640 * 2, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.hide();
}

function draw() {
//   scale(-1, 1, 1);
  image(video, 0, 0);

  // STEP 1 - write your cocde below
  // use the get() command to extract a strip of pixels from the incoming video
  var pixels = get(video.width / 2, 0, video.width, video.height);

  push();
  stroke(255, 0, 0);
  line(video.width / 2, 0, video.width / 2, video.height);
  pop();

  // STEP 2 - write your code below
  //translate to the appropriate place in the canvas and use the image() command to display what you extracted with get(). Paste the strips extracted with get() next to each other, until the end of the canvas is reached. When that happens start from the beginning again.
  //use modulo (%) instead of an if statement to reset the position of the slit scanner once the end of the camera is reached.

  noStroke();
  translate(video.width, 0);
  //paste pixels next to each other using frameCount
  const valFram = map(frameCount, 0, video.width, 0, video.width);
  if (valFram >= video.width) {
    frameCount = 0;
  }
  image(pixels, valFram, 0);

  //   fill(0)
  //   rect(0, 0, 100, 100)
  // console.log(pixels);

  // translate(-video.width / 2, 0);
  // image(c, video.width, 0);
}
