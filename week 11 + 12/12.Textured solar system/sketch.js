var earth;
var sun;
var moon;
var buffer;
var starLocs =[];

function preload() {
    earth = loadImage('assets/earth.jpg');
    sun = loadImage('assets/sun.jpg');
    moon = loadImage('assets/moon.jpg')
    angleMode(DEGREES);
}

function setup() {
    createCanvas(900, 600, WEBGL);
    buffer = createGraphics(2100, 2000);
    init();
}

function draw() {
    background(125);
    
    camera(0,0,2*height,0,0,0,0,1,0);
    
    push();
    perspective(40, width / height, 0, 1e5);
    translate(0,0);
    rotateX(-45);
        if(frameCount%50==0){
        init();
    }
    sky();

    normalMaterial();
    texture(buffer);
    plane(2100,2000);
    pop();
    
    push();
    rotateX(-45);
    rotateY(frameCount);
    texture(sun);
    sphere(100, 10, 10);
    pop();
    
    
    push();
    rotateX(45);
    pointLight(255, 255, 255, 0, 0, 0);
    pointLight(255, 255, 255, 0, 0, 0);
    ambientMaterial(255,255,255);
    translate(400*sin(frameCount),400*cos(frameCount));
    texture(earth);
    sphere(50,10,10);
    pop();
    
    push();
    rotateX(45);
    pointLight(255, 255, 255, 0, 0, 0);
    pointLight(255, 255, 255, 0, 0, 0);
    ambientLight(255);
    ambientMaterial(255,255,255);
    translate(400*sin(frameCount),400*cos(frameCount));
    rotate(2*frameCount);
    translate(100*sin(frameCount),100*cos(frameCount));
    texture(moon);
    sphere(10,10,10);
    pop();
}

function init() {
    for(var i=0;i<100;i++){
        starLocs[i]={x:random(0,buffer.width),y:random(0,buffer.width)};
    }
}

function sky() {
    buffer.background(0);
    buffer.fill(255);
    buffer.noStroke();
    for(var i=0;i<starLocs.length;i++) {
        buffer.rect(starLocs[i].x,starLocs[i].y,5,5);
    }
}
