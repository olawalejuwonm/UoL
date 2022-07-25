var video;

function setup() {
    createCanvas(640 * 2, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.hide();
    noStroke();
    angleMode(DEGREES);
}

function draw() {
    background(0);
    image(video, 0, 0);

    video.loadPixels();

    translate(640, 0);
    var arcSize = 20;
    translate(arcSize / 2, arcSize / 2);
    //Fill in the bits missing in order to loop over the video image in increments of arcSize. At each point read the RGB channel values directly from the array and calculate the brightness. Save it in a variable called pixelBrightness so that the arc shape can be correctly formed.
    var pixelBrightness = 0;
    for (var x = 0; x < video.width; x += arcSize) {
        for (var y = 0; y < video.height; y += arcSize) {
            var index = (y * video.width + x) * 4;
            var r = video.pixels[index];
            var g = video.pixels[index + 1];
            var b = video.pixels[index + 2];
            pixelBrightness = (r + g + b) / 3;
            // fill(pixelBrightness);
            // ellipse(x, y, arcSize, arcSize);
            push();
            translate(x, y);
            var theta = map(pixelBrightness, 0, 255, 0, 360);
            rotate((180 - theta) / 2);
            arc(0, 0, arcSize, arcSize, 0, theta);
            pop();
        }
    }


    // for (/*your code here*/) {
    //     for (/*your code here*/) {

    //         // your code here

            // push();
            // translate(x, y);
            // var theta = map(pixelBrightness, 0, 255, 0, 360);
            // rotate((180 - theta) / 2);
            // arc(0, 0, arcSize, arcSize, 0, theta);
            // pop();
    //     }
    // }
}
