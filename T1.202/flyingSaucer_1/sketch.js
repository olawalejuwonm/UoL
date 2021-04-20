//Topic 1.1 
//Object orientation revisted
//part one

var flying_saucer_x;
var flying_saucer_y;
var flying_saucer_width;
var flying_saucer_height;

function setup()
{
    createCanvas(800,600);
    noStroke();

    flying_saucer_x = 200;
    flying_saucer_y = 100;
    flying_saucer_width = 150;
}

function draw()
{
    background(50,0,80);
    
    //draw the ground
    fill(0,50,0);
    rect(0,height - 100, width, 100);
    
    //draw the flying saucer
    fill(175,238,238);
    arc(flying_saucer_x,flying_saucer_y,flying_saucer_width/2,100,PI,TWO_PI)
    fill(150);
    arc(flying_saucer_x,flying_saucer_y,flying_saucer_width,50,PI,TWO_PI);
    fill(50);
    arc(flying_saucer_x,flying_saucer_y,flying_saucer_width,25,0,PI);

    flying_saucer_x += random(-2, 2);
    flying_saucer_y += random(-1, 1);

    fill(255);

    var incr = flying_saucer_width/(10 - 1);

    for (var i = 0; i < 10; i++) {
        ellipse(flying_saucer_x - flying_saucer_width/2 * incr * i, flying_saucer_y, 5)
    }
    
}