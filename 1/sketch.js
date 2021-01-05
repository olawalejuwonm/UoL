/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.


WARNING: Do not get too carried away. If you're shape takes more than 5 lines
of code to draw then you've probably over done it.


*/

function setup()
{
	createCanvas(1024, 576);
}

function draw()
{
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0,155,0);
	rect(0, 432, 1024, 144); //draw some green ground

	//1. a cloud in the sky
	//... add your code here
	fill(255, 255, 255);
	ellipse(200, 150, 80, 80);
	ellipse(160, 150, 60, 60);
	ellipse(240, 150, 60, 60);

	noStroke();
	fill(255);
	text("cloud", 200, 100);

	//2. a mountain in the distance
	//... add your code here
	fill(155);
	triangle(385, 226, 620, 226, 520, 112);
	fill(105,105,105, 50)
	triangle(385, 226, 620, 226, 520, 320);
	triangle(385, 226, 620, 226, 520, 168);
	//grey fill and a triangle

	noStroke();
	fill(255);
	text("mountain", 500, 256);

	//3. a tree
	//... add your code here
	fill(120, 100, 40);
	rect(900, 282, 60, 150);

	//branches
	fill(0, 155, 0);
	triangle(850, 332, 930, 232, 1010, 332);
	triangle(850, 282, 930, 182, 1010, 282);

	noStroke();
	fill(255);
	text("tree", 800, 346);

	//4. a canyon
	//NB. the canyon should go from ground-level to the bottom of the screen

	//... add your code here
	// rect(151, 432, 100, 144);
	fill(246,246,246, 200);
	triangle(156, 432, 230, 577, 301, 432)
	// rect(249, 432, 105, 50);
	// fill(0,170,0);
	// rect(151, 500, 300, 100);
	// rect(354, 432, 100, 144);

	noStroke();
	fill(255);
	text("canyon", 100, 480);

	//5. a collectable token - eg. a jewel, fruit, coins
	//... add your code here
	fill(241,190,44);
	ellipse(505, 412, 40);

	noStroke();
	fill(255);
	text("collectable item", 400, 400);
}
