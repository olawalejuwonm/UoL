/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;


var trees_x;
var clouds;
var mountains;
var highLeft;
var collectables;
var canyons;

var game_score;
var flagpole;
var lives;

function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3 / 4;

	lives = 3;


	startGame();

}

function draw() {



	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height / 4); // draw some green ground
	push();
	translate(scrollPos, 0);

	// Draw clouds.
	drawClouds();
	// Draw mountains.
	drawMountains();
	// Draw trees.
	drawTrees();

	// Draw canyons.
	for (var i = 0; i < canyons.length; i++) {
		drawCanyon(canyons[i])
		checkCanyon(canyons[i])
	}

	// Draw collectable items.
	for (var i = 0; i < collectables.length; i++) {
		if (collectables[i].isFound === false) {
			drawCollectable(collectables[i]);
			// console.log("collectable drawn", collectables[i])
			checkCollectable(collectables[i]);

		}



	}

	// Draw game character.
	renderFlagpole()
	pop();

	if (lives <= 0) {
		fill(0);
		rect((width / 2) - 60, (height / 2) - 20, (width / 2) - 200, (height / 2) - 250);
		fill(255);
		noStroke();
		return text("Game over. Press space to continue.", width / 2, height / 2)
	}
	if (flagpole.isReached) {

		fill(0);
		rect((width / 2) - 60, (height / 2) - 20, (width / 2) - 200, (height / 2) - 250);
		fill(255);
		noStroke();
		return text("Level complete. Press space to continue", width / 2, height / 2)
	}
	drawGameChar();

	fill(255);
	noStroke();
	text("score: " + game_score, 100, 20)





	// Logic to make the game character move or the background scroll.
	if (isLeft) {
		if (gameChar_x > width * 0.2) {
			gameChar_x -= 5;
		}
		else {
			scrollPos += 5;
		}
	}

	if (isRight) {
		if (gameChar_x < width * 0.8) {
			gameChar_x += 5;
		}
		else {
			scrollPos -= 5; // negative for moving against the background
		}
	}

	// Logic to make the game character rise and fall.
	if (gameChar_y < floorPos_y) {
		gameChar_y += 1;
		isFalling = true;
	}
	else {
		isFalling = false;
	}
	if (isPlummeting == true) {
		gameChar_y += 10;
	}

	if (flagpole.isReached == false) {
		checkFlagpole();
	}

	checkPlayerDie()

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}

function startGame() {
	// floorPos_y = height * 3 / 4;
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
	trees_x = [100, 300, 500, 1000];
	highLeft = [width, width, width, width, width, width];
	collectables = [
		{
			x_pos: 100,
			y_pos: floorPos_y,
			size: 50, isFound: false,
			left: width
		},
		{
			x_pos: 822,
			y_pos: floorPos_y,
			size: 50, isFound: false,
			left: width
		}
	]
	clouds = [
		{
			x_pos: 105,
			y_pos: 200,
			size: 100,
			left: width
		}, {
			x_pos: 600,
			y_pos: 140,
			size: 100,
			left: width
		}, {
			x_pos: 800,
			y_pos: 50,
			size: 100,
			left: width
		}];
	mountains = [
		{
			x_pos: 200,
			y_pos: 226,
			size: 100,
			left: width
		},
		{
			x_pos: 300,
			y_pos: 150,
			size: 100,
			left: width
		},
		{
			x_pos: 100,
			y_pos: 270,
			size: 100,
			left: width
		}
	];
	canyons = [
		{
			x_pos: 90,
			width: 100,
			left: width
		},
		{
			x_pos: 550,
			width: 100,
			left: width
		}
	]

	game_score = 0;
	flagpole = {
		isReached: false,
		x_pos: 1500
	}
}


// ---------------------
// Key control functions
// ---------------------

function keyPressed() {

	if (key == 'A' || keyCode == 37) {
		isLeft = true;
	}

	else if (key == 'D' || keyCode == 39) {
		isRight = true;
	}
	if (keyCode == 32 && (gameChar_y == floorPos_y)) {

		gameChar_y -= 100;
	}

}

function keyReleased() {


	if (key == 'A' || keyCode == 37) {
		isLeft = false;
	}

	if (key == 'D' || keyCode == 39) {
		isRight = false;
	}

}


// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar() {
	// draw game character
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
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds() {
	for (var i = 0; i < clouds.length; i++) {
		fill(255, 255, 255);

		ellipse(clouds[i].x_pos, clouds[i].y_pos, clouds[i].size, clouds[i].size);
		ellipse(clouds[i].x_pos - 40, clouds[i].y_pos, clouds[i].size - 20, clouds[i].size - 20);
		ellipse(clouds[i].x_pos + 40, clouds[i].y_pos, clouds[i].size - 20, clouds[i].size - 20);

		//Logic to add off screen items when moving right
		if ((scrollPos + clouds[i].x_pos) < -width) {
			clouds[i].x_pos = (-scrollPos) + random(0, width) + width;
		}

		//Logic to add off screen items when moving left
		else if (scrollPos > clouds[i].left) {
			clouds[i].x_pos = - (scrollPos - random(0, width) + width);
			clouds[i].left = scrollPos + width * 2.4;
		}



	}
}
// Function to draw mountains objects.
function drawMountains() {
	for (var i = 0; i < mountains.length; i++) {
		fill(155);

		triangle(mountains[i].x_pos, floorPos_y,
			mountains[i].x_pos + (mountains[i].size / 2), mountains[i].y_pos,
			mountains[i].x_pos + mountains[i].size, floorPos_y);



		if ((scrollPos + mountains[i].x_pos) < -width) {
			mountains[i].x_pos = (-scrollPos) + random(0, width) + width;
		}

		else if (scrollPos > mountains[i].left) {
			mountains[i].x_pos = - (scrollPos - random(0, width) + width);
			mountains[i].left = scrollPos + width * 2.4;
		}
	}
}
// Function to draw trees objects.
function drawTrees() {
	for (var i = 0; i < trees_x.length; i++) {
		fill(100, 50, 0);
		rect(75 + trees_x[i], -200 / 2 + floorPos_y, 50, 200 / 2);

		//branches
		fill(0, 100, 0);
		triangle(trees_x[i] + 25, -200 / 2 + floorPos_y,
			trees_x[i] + 100, -200 + floorPos_y,
			trees_x[i] + 175,
			-200 / 2 + floorPos_y);

		triangle(trees_x[i],
			-200 / 4 + floorPos_y,
			trees_x[i] + 100,
			-200 + 3 / 4 + floorPos_y,
			trees_x[i] + 200,
			-200 / 4 + floorPos_y
		);

		if ((scrollPos + trees_x[i]) < -width) {
			highLeft[i] = (-scrollPos) + random(0, width) + width;
		}

		else if (scrollPos > highLeft[i]) {
			trees_x[i] = - (scrollPos - random(0, width) + width);
			highLeft[i] = scrollPos + width * 2.4;
		}


	}
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.

function drawCanyon(t_canyon) {
	fill(246, 246, 246, 200);
	rect(t_canyon.x_pos, floorPos_y, t_canyon.width, floorPos_y);

	if ((scrollPos + t_canyon.x_pos) < -300) {
		t_canyon.x_pos = (-scrollPos) + random(0, width) + width;
	}


	else if (scrollPos > t_canyon.left) {
		t_canyon.x_pos = - (scrollPos - random(0, width) + width);
		t_canyon.left = scrollPos + width * 2.4;
	}
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon) {
	if (gameChar_world_x >= t_canyon.x_pos && gameChar_world_x <= (t_canyon.x_pos + t_canyon.width) && gameChar_y >= floorPos_y) {
		isPlummeting = true;
	}
}

function renderFlagpole() {
	push()
	strokeWeight(5);
	stroke(180);
	line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
	fill(255, 0, 255);
	noStroke();
	if (flagpole.isReached) {
		rect(flagpole.x_pos, floorPos_y - 250, 50, 50);

	}
	else {
		rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
	}
	pop();
}

function checkFlagpole() {
	var d = abs(gameChar_world_x - flagpole.x_pos)

	if (d < 15) {
		flagpole.isReached = true;
	}


}


function checkPlayerDie() {

	if (lives >= 0) {
		fill(255);
		noStroke();
		text("Lives: " + lives, 500, 20)
	}


	if (gameChar_y > height * 1.5) {
		lives -= 1;
		if (lives <= 0) {

		}
		else {
			startGame();
		}
	}

	// for (lives; lives > 1;) {

	// }


}
// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.

function drawCollectable(t_collectable) {
	fill(241, 190, 44);
	ellipse(t_collectable.x_pos, t_collectable.y_pos - 20, t_collectable.size);


}

// Function to check character has collected an item.

function checkCollectable(t_collectable) {

	if (dist(gameChar_world_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size) {
		t_collectable.isFound = true;
		game_score += 1;

	}

	if ((scrollPos + t_collectable.x_pos) < -width) {
		t_collectable.x_pos = (-scrollPos) + random(0, width) + width;
		t_collectable.isFound = false;

	}

	else if (scrollPos > t_collectable.left) {
		t_collectable.x_pos = - (scrollPos - random(0, width) + width);
		t_collectable.left = scrollPos + width * 2.4;
		t_collectable.isFound = false;
	}

}
