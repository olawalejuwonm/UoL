/*

The Game Project

Week 3

Game interaction

*/


var gameChar_x;
var gameChar_y;
var floorPos_y;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;

var collectable;
var canyon;

function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3 / 4;
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;

	isLeft = false;
	isRight = false;
	isPlummeting = false;
	isFalling = false;

	collectable = {
		x_pos: 100,
		y_pos: floorPos_y,
		size: 50, isFound: false
	};

	//redo the canyon
	canyon = {
		x_pos: 120,
		width: 100
	};
}

function draw() {

	///////////DRAWING CODE//////////

	background(100, 155, 255); //fill the sky blue


	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon
	fill(246,246,246, 200);
	//triangle(156, 432, 235, 577, 301, 432)
	rect(canyon.x_pos,floorPos_y, canyon.width, floorPos_y )
	// triangle(canyon.x_pos , floorPos_y,
	// ((canyon.x_pos / 2 )+ (canyon.width * 2)), floorPos_y + 177, (canyon.width * 4) , floorPos_y, );
	if (gameChar_x >= canyon.x_pos && gameChar_x <= (canyon.x_pos + canyon.width)  && gameChar_y >= floorPos_y ) {
		isPlummeting = true;
	}

	if (isPlummeting == true) {
		gameChar_y += 15;
	}

	//collectable
 	if (dist(gameChar_x, gameChar_y, collectable.x_pos, collectable.y_pos) < 20) {
		collectable.isFound = true;
	}
	if (collectable.isFound == false) {
		fill(241, 190, 44);
		// ellipse(505, 412, 40);
		ellipse(collectable.x_pos , collectable.y_pos - 20, collectable.size);
	}

	stroke(0);
	//the game character
	if (isLeft && isFalling) {
		// add your jumping-left code
		fill(255, 150, 150);
		ellipse(gameChar_x, gameChar_y - 50, 35);
		fill(255, 0, 0);
		rect(gameChar_x - 2, gameChar_y - 35, 5, 20);
		quad(gameChar_x - 20, gameChar_y - 18, gameChar_x, gameChar_y - 35, gameChar_x - 3, gameChar_y - 26);
		quad(gameChar_x + 2, gameChar_y - 32, gameChar_x + 22, gameChar_y - 40, gameChar_x + 3, gameChar_y - 28);
		fill(0);
		quad(gameChar_x + 3, gameChar_y - 15, gameChar_x + 9, gameChar_y - 8, gameChar_x + 9, gameChar_y, gameChar_x - 1, gameChar_y - 15);

	}
	else if (isRight && isFalling) {
		// add your jumping-right code
		fill(255, 150, 150);
		ellipse(gameChar_x, gameChar_y - 50, 35);
		fill(255, 0, 0);
		rect(gameChar_x - 2, gameChar_y - 35, 5, 20);
		quad(gameChar_x - 20, gameChar_y - 18, gameChar_x, gameChar_y - 35, gameChar_x - 3, gameChar_y - 26);
		quad(gameChar_x + 2, gameChar_y - 32, gameChar_x + 22, gameChar_y - 40, gameChar_x + 3, gameChar_y - 28);
		fill(0);
		quad(gameChar_x - 2, gameChar_y - 16, gameChar_x - 11, gameChar_y - 2,
			gameChar_x - 5, gameChar_y - 2, gameChar_x, gameChar_y - 15);
		quad(gameChar_x + 1, gameChar_y - 16, gameChar_x + 8,
			gameChar_y - 10, gameChar_x + 3, gameChar_y - 7, gameChar_x, gameChar_y - 15)
	}
	else if (isLeft) {
		// add your walking left code
		fill(0);
		rect(gameChar_x - 12, gameChar_y - 10, 15, 10);
		fill(255, 0, 0);
		rect(gameChar_x - 10, gameChar_y - 55, 20, 50);
		fill(255, 0, 0);
		ellipse(gameChar_x, gameChar_y - 55, 25, 40);
		fill(35);
		rect(gameChar_x, gameChar_y - 10, 15, 10)

	}
	else if (isRight) {
		// add your walking right code
		fill(0);
		rect(gameChar_x, gameChar_y - 10, 15, 10);
		fill(255, 0, 0);
		rect(gameChar_x - 10, gameChar_y - 55, 20, 50);
		fill(255, 150, 150);
		ellipse(gameChar_x, gameChar_y - 55, 25, 40);
		fill(35);
		rect(gameChar_x - 12, gameChar_y - 10, 15, 10);
	}
	else if (isFalling || isPlummeting) {
		// add your jumping facing forwards code
		fill(255, 0, 0);
		rect(gameChar_x - 10, gameChar_y - 50, 20, 40);
		fill(255, 150, 150);
		ellipse(gameChar_x, gameChar_y - 50, 35);
		ellipse(gameChar_x - 10, gameChar_y - 28, 6, 10);
		ellipse(gameChar_x + 10, gameChar_y - 28, 6, 10);
		fill(0);
		rect(gameChar_x - 10, gameChar_y - 20, 5, 10);
		rect(gameChar_x + 5, gameChar_y - 20, 5, 10);

	}
	else {
		// add your standing front facing code
		fill(200, 150, 150);
		ellipse(gameChar_x, gameChar_y - 50, 35);

		fill(255, 0, 0);
		rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

		fill(0);
		rect(gameChar_x - 15, gameChar_y - 5, 10, 10);
		rect(gameChar_x + 5, gameChar_y - 5, 10, 10);

	}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

	if (isLeft == true) {
		gameChar_x -= 5;
	}

	if (isRight == true) {
		gameChar_x += 5;
	}

	if (gameChar_y < floorPos_y) {
		gameChar_y += 1;
		isFalling = true;
	}
	else {
		isFalling = false;
	}
}


function keyPressed() {
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);

	if (keyCode == 37) {
		console.log("left arrow")
		isLeft = true;
	}
	else if (keyCode == 39) {
		console.log("right arrow");
		isRight = true;
	}
	if (keyCode == 32 && (gameChar_y == floorPos_y)) {
		console.log("jump arrow");

		gameChar_y -= 100;
	}

	console.log(gameChar_y, floorPos_y)

}

function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);

	if (keyCode == 37) {
		console.log("left arrow")
		isLeft = false;
	}
	else if (keyCode == 39) {
		console.log("right arrow");
		isRight = false;
	}
}
