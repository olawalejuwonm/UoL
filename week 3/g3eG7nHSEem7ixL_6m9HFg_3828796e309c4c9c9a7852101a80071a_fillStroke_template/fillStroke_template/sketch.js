

function setup() 
{
    createCanvas(512, 512);
    noStroke();    
}

function draw()
{
    background(255);

    noStroke();
    fill(255, 255, 0);
    rect(50,50,100, 100);

    fill(255, 0, 0)
    ellipse(250,100,100,100);
    
    stroke(0, 255, 0);
    ellipse(100,250,100,100);
    rect(50,200,75,75);
    
    stroke(0, 0, 255);
    fill(255, 0, 0, 125);
    ellipse(250,250,100,100);
    rect(225,225,75,75);
    
    
}


