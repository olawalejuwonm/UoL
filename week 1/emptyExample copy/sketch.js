function setup() {
    createCanvas(720, 400);
    rectMode(CENTER); // center the rectangle
}


function draw() {
    background(220);
    fill(0);
    // translate(60, 60)
    // rect(10, 10, 100, 100);

    // ellipse(0,0,20,20);
    // ellipse(-60, -60, 20, 20);


    // rect(200,100,100,100);


    // fill(125)
    // // rotate(radians(45));
    // translate(200,100);
    // scale(0.5, 0.5);
    // rect(0,0,100,100);


    translate(200,100);
    // rotate(radians(45));
    rect(0,0, 200, 200);


    push();
    fill(255, 0, 0);
    translate(100,100);
    ellipse(0,0,30, 30);
    pop();

    push();
    fill(255, 0, 0);
    translate(-100,-100);
    ellipse(0,0,30, 30);
    pop();


}