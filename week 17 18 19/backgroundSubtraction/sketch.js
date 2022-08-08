// ********************************
// BACKGROUND SUBTRACTION EXAMPLE *
// ********************************
var video;
var prevImg;
var diffImg;
var currImg;
var thresholdSlider;
var threshold;
var grid;
var allSounds = [];
var startApp = false; //This is a flag to ensure that the app only start after user interaction

function preload() {
    soundFormats('wav');
    for (var i = 1; i < 17; i++) {
        //credit to https://freesound.org/people/Jaz_the_MAN_2/packs/17749/
        allSounds.push(loadSound('assets/(' + i + ').wav'));
    }
}

function setup() {
    createCanvas(640 * 2, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.hide();

    thresholdSlider = createSlider(0, 255, 50);
    thresholdSlider.position(20, 20);
    thresholdSlider.hide();
    grid = new Grid(640, 480);
    // mimics the autoplay policy
    getAudioContext().suspend();
}

function draw() {
    if (!startApp) { //This is to ensure that the app only start after user interaction
        //Push and pop are used to ensure that other settings are not affected by the drawing of intro text
        push();
        //This will write a text to the screen to let the user know that they must interact with the screen to start the app
        textSize(32);
        //This fill with a blue color
        fill(0, 0, 255);
        textAlign(CENTER, CENTER); //This aligns the text to the center of the screen
        text(`Hi there!\n
        This is a simple app that uses a webcam to detect your movement.\n
        You can move your hand around the screen to play a sound.\n
        To start the app, you need to allow access to your camera.\n
        Then, click on the screen or press a key on the keyboard. \n
        Thanks for checking this out!`, width / 2, height / 2);
        pop();
        return;
    }
    thresholdSlider.show();
    background(0);
    image(video, 0, 0);

    currImg = createImage(video.width, video.height);
    currImg.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);
    //Right before using the blur filter on the currImg, use the resize command to scale it down to a quarter of the size it was
    currImg.resize(video.width / 4, video.height / 4);
    currImg.filter(BLUR, 3);

    //Make sure you do the same for the diffImg a couple of lines later
    diffImg = createImage(video.width, video.height);
    diffImg.resize(video.width / 4, video.height / 4);
    diffImg.loadPixels();

    threshold = thresholdSlider.value();

    if (typeof prevImg !== 'undefined') {
        prevImg.loadPixels();
        currImg.loadPixels();
        for (var x = 0; x < currImg.width; x += 1) {
            for (var y = 0; y < currImg.height; y += 1) {
                var index = (x + (y * currImg.width)) * 4;
                var redSource = currImg.pixels[index + 0];
                var greenSource = currImg.pixels[index + 1];
                var blueSource = currImg.pixels[index + 2];

                var redBack = prevImg.pixels[index + 0];
                var greenBack = prevImg.pixels[index + 1];
                var blueBack = prevImg.pixels[index + 2];

                var d = dist(redSource, greenSource, blueSource, redBack, greenBack, blueBack);

                if (d > threshold) {
                    diffImg.pixels[index + 0] = 0;
                    diffImg.pixels[index + 1] = 0;
                    diffImg.pixels[index + 2] = 0;
                    diffImg.pixels[index + 3] = 255;
                } else {
                    diffImg.pixels[index + 0] = 255;
                    diffImg.pixels[index + 1] = 255;
                    diffImg.pixels[index + 2] = 255;
                    diffImg.pixels[index + 3] = 255;
                }
            }
        }
    }
    diffImg.updatePixels();
    image(diffImg, 640, 0);

    noFill();
    stroke(255);
    text(threshold, 160, 35);
    prevImg = createImage(currImg.width, currImg.height);
    prevImg.copy(currImg, 0, 0, currImg.width, currImg.height, 0, 0, currImg.width, currImg.height);
    // console.log("saved new background");
    ////allSounds is an array of all the sounds that are loaded in the preload function
    grid.run(diffImg, allSounds);  //It's passed to the run function so that it can be used to play sounds to encourage modular code
    // console.log(grid);
}

function keyPressed() {
    userStartAudio();
    startApp = true;

}

function mousePressed() {
    userStartAudio();
    startApp = true;
}

// faster method for calculating color similarity which does not calculate root.
// Only needed if dist() runs slow
function distSquared(x1, y1, z1, x2, y2, z2) {
    var d = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1) + (z2 - z1) * (z2 - z1);
    return d;
}
