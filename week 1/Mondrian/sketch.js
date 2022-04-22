function setup()
{
	//create a large square canvas
	createCanvas(800, 800);
}

function draw()
{

	//set the fill colour to red
	fill(255, 0, 0);

	//set a thick stroke weight for the black lines
	strokeWeight(12);

	//draw the red rectangle 
	rect(100, 50, 600, 600);

	fill(210, 210, 210);
	rect(0, 50, 100, 249);

	fill(210, 210, 210);
	rect(0, 311, 100, 330);

	fill(42, 127, 255);
	rect(0, 650, 100, 100);

	fill(210, 210, 210);
	rect(100, 650, 500, 100);

	fill(210, 210, 210);
	rect(610, 650, 90, 50);

	fill(255, 255, 85);
	rect(610, 700, 90, 50);

}