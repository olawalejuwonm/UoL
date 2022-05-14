var tickle;
class TickleWalker {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    move() {
        this.x += random(-5, 5);
        this.y += random(-5, 5);
    }

    display() {
        noStroke();
        fill(255);
        ellipse(this.x, this.y, 25, 25);
    }
    //mouse inside circle
    contains(x, y) {
        var d = dist(x, y, this.x, this.y);
        if (d < 25) {
            return true;
        } else {
            return false;
        }
    }
}
 

function setup() {
    createCanvas(900, 600);
    background(0);
    tickle = new TickleWalker(width/2, height/2);

}

// function draw() {
//     var randX = random(0, width);
//     var randY = random(0, height);

//     noStroke();
//     fill(random(255), random(255), random(255));
//     var size = random(10, 25);
//     ellipse(randX, randY, size, size);
// }

function draw() {
    background(0);
    tickle.display();
    if (tickle.contains(mouseX, mouseY)) {
        tickle.move();
    }
}




