function setup() {
    createCanvas(900, 600);
}

function draw() {
    background(125);

    let mouse = new createVector(mouseX, mouseY);
    let center = new createVector(width / 2, height / 2);

    mouse.sub(center);

    let normal = mouse.copy();
    text("normal" + normal.normalize(), 10, 10); //normalize() returns a vector with the same direction as the 
    //original vector, but with a magnitude of 1.
    //A normalized vector, also known as a unit vector, is a vector with the magnitude removed. 
    //All that is left is the direction represented as a vector with the length of 1, that is why it is known 
    //as a unit vector, it is 1 unit long.
    normal = normal.mult(50);
    line(10, 60, 10 + normal.x, 60 + normal.y);
    // mouse.mult(0.5);
    // mouse.div(2);
    // text("magnitude: " + int( mouse.mag()), 10, 10);
    // rect(10, 20, mouse.mag(), 10);

    translate(width / 2, height / 2);

    strokeWeight(2);
    line(0, 0, mouse.x, mouse.y);



}
