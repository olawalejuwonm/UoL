// function setup() 
// {
//     createCanvas(500,500);
// }

// function draw()
// {
//     rect(100,100,100,100);
//     rect(250, 100, 100, 100);
//     rect(100, 250, 100, 100);
//     rect(250, 250, 100, 100);
//     beginShape()
//     vertex(100, 100)
//     //vertex(250, 250)
//     vertex(350, 350)
//     //vertex()
//     endShape()
// }
function setup() 
{
    createCanvas(500,500);
}

function draw()
{
    fill(200);
    rect(50, 50, 350, 350, 50);
    fill('purple');
    rect(190, 40, 60, 25);
    fill('yellow');
    ellipse(220, 32, 30, 30)

    fill(255);
    strokeWeight(6);
    ellipse(160, 175, 50, 50);
    ellipse(300, 175, 50, 50);
    point(160, 175);
    point(300, 175);
    fill('red');
    triangle(210, 260, 232, 220, 255, 260);

    rect(40, 175, 20, 80);
    rect(390, 175, 20, 80)

    noFill();
    beginShape();
    vertex(180, 285);
    vertex(200, 300);
    vertex(220, 285);
    vertex(235, 300);
    vertex(250, 285);
    vertex(270, 300);
    vertex(285, 285);
    endShape();

}