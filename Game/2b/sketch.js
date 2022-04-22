/*

The Game Project

2b - using variables

*/

var floorPos_y;

var gameChar_x;
var gameChar_y;

var treePos_x;
var treePos_y;

var canyon;
var collectable;

var mountain;
var cloud;


function setup()
{
	createCanvas(1024, 576);
	floorPos_y = 432; //NB. we are now using a variable for the floor position

	//NB. We are now using the built in variables height and width
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	treePos_x = width/2;
	treePos_y = height/2;

	canyon = {
		x_pos: 0,
		width: 100
	};

	collectable = {
		x_pos: 100,
		y_pos: 100,
		size: 50
	};

	mountain = {
		x_pos: 200,
		y_pos: 226,
		size: 100
	};

	cloud = {
		x_pos: 105,
		y_pos: 110,
		size: 100
	};
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, height, width - floorPos_y); 
	//draw some green ground

	//cloud
	fill(255, 255, 255);
	// ellipse(200, 150, 80, 80);
	// ellipse(160, 150, 60, 60);
	// ellipse(240, 150, 60, 60);

	ellipse(cloud.x_pos, cloud.y_pos, cloud.size, cloud.size);
	ellipse(cloud.x_pos - 40, cloud.y_pos, cloud.size - 20, cloud.size - 20);
	ellipse(cloud.x_pos + 40, cloud.y_pos, cloud.size - 20, cloud.size - 20);

	//mountain
	fill(155);
	// triangle(385, 226, 620, 226, 520, 112);
	// fill(105,105,105, 50)
	// triangle(385, 226, 620, 226, 520, 320);
	// triangle(385, 226, 620, 226, 520, 168);

	triangle(min(mountain.x_pos, 400), mountain.y_pos,
		min((mountain.x_pos*1.73) + mountain.size, 453), mountain.y_pos, min((mountain.x_pos*1.45) + mountain.size, 453), mountain.y_pos/2);
	fill(105,105,105, 50)
	triangle(min(mountain.x_pos, 400), mountain.y_pos,
		min((mountain.x_pos*1.73) + mountain.size, 453) , mountain.y_pos, min((mountain.x_pos*1.45) + mountain.size, 453), mountain.y_pos*1.4);
	triangle(min(mountain.x_pos, 400), mountain.y_pos,
		min((mountain.x_pos*1.73) + mountain.size, 453) , mountain.y_pos,min((mountain.x_pos*1.45) + mountain.size, 453), mountain.y_pos - 60);

	//collectable
	fill(241,190,44);
	// ellipse(505, 412, 40);
	ellipse(collectable.x_pos*6, collectable.y_pos*4, collectable.size);

	//draw the game character
	fill(200,150,150);
	ellipse(gameChar_x, gameChar_y - 50, 35);

	fill(255, 0, 0);
	rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

	fill(0);
	rect(gameChar_x - 15, gameChar_y - 5, 10, 10);
	rect(gameChar_x + 5, gameChar_y - 5, 10, 10);

	//draw tree
	fill(120, 100, 40);
	rect(treePos_x, treePos_y, 60, 150);

	//branches
	fill(0, 155, 0);
	// triangle(850, 332, 930, 232, 1010, 332);
	triangle(treePos_x - 50, treePos_y + 50, treePos_x + 30, treePos_y - 50,treePos_x + 110,
		treePos_y + 50);
	// triangle(850, 282, 930, 182, 1010, 282);
	triangle(treePos_x - 50, treePos_y, treePos_x + 30, treePos_y - 100, treePos_x + 110, treePos_y);

	//canyon
	fill(246,246,246, 200);
	//triangle(156, 432, 235, 577, 301, 432)
	triangle(canyon.x_pos + canyon.width, (canyon.width * 4) + 32,
	(canyon.x_pos + (canyon.width * 2)), (canyon.width*5) + 77, (canyon.x_pos + canyon.width * 3), (canyon.width * 4) + 32);

}

function mousePressed()
{
	gameChar_x = mouseX;
	gameChar_y = mouseY;

}
