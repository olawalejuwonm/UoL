let ball;
function setup() {
    createCanvas(900, 600);
    background(0);
    ball = new Ball()
}

function draw() {
    background(0);
    ball.run()

}

class Ball {
    constructor() {
        this.velocity = new createVector(random(-5, 5), random(-5, 5));
        this.location = new createVector(random(width), random(height));
    }
    run() {
        this.draw();
        this.move();
        this.bounce();
    }
    draw () {
        fill(125);
        ellipse(this.location.x, this.location.y, 40, 40);
    }
    bounce (){
        if (this.location.x > width || this.location.x < 0) {
            this.velocity.x *= -1;
        }
        if (this.location.y > height || this.location.y < 0) {
            this.velocity.y *= -1;
        }
    }
    

    move() {
        this.location.add(this.velocity);
    }
}
