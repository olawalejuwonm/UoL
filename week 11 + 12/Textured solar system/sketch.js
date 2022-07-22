var earth;
var sun;
var moon; 
var graphics;
var starLocs = [];

function preload()
{
    earth = loadImage('assets/earth.jpg')
    sun = loadImage('assets/sun.jpg')
    moon = loadImage('assets/moon.jpg')
    angleMode(DEGREES);
}


function setup() {
    createCanvas(900, 600, WEBGL);
    graphics = createGraphics(1800,1200); //adjust it to make it less strechy
    graphics.background(0);
    angleMode(DEGREES);

    for(var i = 0; i < 200; i++)
    {
        starLocs.push(new createVector(random(0,1800), random(0,1200)));
    }
    
}

function draw() {
    background(125);
    sky();

    push();
        rotateY(40);
        camera(0,0, 1000,0,0,0,0,1,0);
        texture(graphics);
        plane(1800,1200);
    pop();

    camera(0, -300, height, 0, 0, 0, 0, 1, 0);
    perspective(60, width/height);

    push();
        texture(sun);
        rotateY(frameCount/6);
        sphere(100, 50, 50);
    pop();



    push();
        rotateY(-frameCount/4); 
    
        translate(-300,10);
        rotateY(frameCount);
        ambientMaterial(255);
        pointLight(255,255,255,0,0,0);

        push();
            texture(earth);
            sphere(50, 50, 50);
        pop();

        push();
            translate(-100,0);
            texture(moon);
            sphere(20, 50, 50);
        pop();
   
    pop();
}

function sky()
{
    for(var i = 0; i < starLocs.length; i++)
    {
        graphics.fill(255);
        graphics.noStroke();
        graphics.ellipse(starLocs[i].x, starLocs[i].y, 5, 5);
    }

    var randomiser = random(0,2000);

    if(randomiser > 1950)
    {
        starLocs.splice(random(0,199),1);
        starLocs.push(new createVector(random(0,1800), random(0,1200)));
    }
}
