function setup() {
	createCanvas(600, 600);
	fill(255, 255, 255);

}

function draw()
{
	background(0, 0, 0);
 	noStroke()
	rect(0, 0, width/2, height/2);
	ellipse(mouseX, mouseY, 100, 100);
	
}

function mousePressed()
{
	fill(255, 0, 0)
}

function keyPressed()
{
	fill(255, 255, 0)
}