// code adopted from here:
// https://kylemcdonald.github.io/cv-examples/

var capture;
var previousPixels;
var flow;
var step = 8;
var totalPhase = 0;

////////////////////////////////////////////////////////
function setup() {
    createCanvas(640, 480);
    capture = createCapture(VIDEO);
    capture.hide();
    flow = new FlowCalculator(step);
}
////////////////////////////////////////////////////////
function same(a1, a2, stride, n) {
    for (var i = 0; i < n; i += stride) {
        if (a1[i] != a2[i]) {
            return false;
        }
    }
    return true;
}
////////////////////////////////////////////////////////
function draw() {
    capture.loadPixels();
    //    if (previousPixels)

    if (capture.pixels.length > 0) {
        if (previousPixels) {
            previousPixels.loadPixels();
            // cheap way to ignore duplicate frames
            if (same(previousPixels.pixels, capture.pixels, 4, width)) {
                return;
            }
            // calculate optical flow
            flow.calculate(previousPixels.pixels, capture.pixels, capture.width, capture.height);
        }
        else previousPixels = createImage(capture.width, capture.height);

        previousPixels.copy(capture, 0, 0, capture.width, capture.height, 0, 0, capture.width, capture.height);
        image(capture, 0, 0);

        // code to visualise optical flow
        var totalV = 0, totalU = 0, count = 0;
        var threshold = 10;

        if (flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {
            for (var i = 0; i < flow.flow.zones.length; i++) {
                zone = flow.flow.zones[i];

                if (abs(zone.u) > threshold || abs(zone.v) > threshold) { // only if movement is significant
                    stroke(map(zone.u, -step, +step, 0, 255),
                        map(zone.v, -step, +step, 0, 255), 128);
                    line(zone.x, zone.y, zone.x + zone.u, zone.y + zone.v);
                    totalU += zone.u;
                    totalV += zone.v;
                    count++;
                }
            }

            push();
            strokeWeight(2);
            stroke(255);
            translate(width / 2, height / 2);
            var lengthU = totalU / count * 10;
            var lengthV = totalV / count * 10;
            // line(0, 0, lengthU, lengthV);
            pop();
        }
    }

    if (totalU) totalPhase += constrain(totalU, -5, 5);
    genRings(totalPhase);
}
///////////////////////////////////////////////////////////////
function genRings(phase) {
    //Modify the code inside genRings() to also accept the movement on the y-axis. Have the movement on the y-axis affect the colour of the rings
    var numOfRings = 10;
    var ringWidth = 20;
    var phaseDiff = 360 / numOfRings;

    push();
    angleMode(DEGREES);
    translate(width / 2, height / 2);
    noFill();
    stroke(255);
    for (var i = 1; i < numOfRings; i++) {
        var p = phaseDiff * i + phase;
        var sW = (sin(p * 2) + 1) / 2 * (ringWidth - 2) + 2
        // console.log(sW, p);
        strokeWeight(sW);
        ellipse(0, 0, i * ringWidth * 2, i * ringWidth * 2);
        //TODO:  accept the movement on the y-axis. Have the movement on the y-axis affect the colour of the rings
        for (var j = 0; j < sW; j++) {
            stroke(255, map(j, 0, sW, 0, 255), map(j, 0, sW, 0, 255));
            ellipse(0, 0, i * ringWidth * 2, i * ringWidth * 2);
        }

    }
    pop();

}
