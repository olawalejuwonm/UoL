//Extension 1: Add sound
//I added sound to most common activities of the game, a sound is played:
//Continuously when the player start the game, when the player jump,
// hit an enemy, plummet, completed a level, lost all lives(game over).
//the bit i found difficult is playing sound in the draw function because the draw
//function is called continuously, the sound tends to loop instead of playing oncep.
//i was able to solve this by creating a variable called soundLoop to determine how
//sound should be called in the draw function.
//Finally i learnt about noLoop() in p5js which stop draw function from running
//continously


//Extension 2: Create enemies
//I was able to create enemies with eyeball and talking mouth, it was demanding
//understanding how constructor works. Finally, i was able to understand how it
//work and i was able to manipulate it.

var jumpSound;
var coinSound;
var fallingSound;
var backgroundSound;
var winSound;
var looseSound;
var enemySound;

var start;
var soundLoop;

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
var enemies_x;
var clouds;
var mountains;
var highLeft;
var collectables;
var canyons;

var flagpole;
var player;
var enemies;

function preload() {
	soundFormats('mp3', 'wav');
	//load your sounds here
	jumpSound = loadSound('assets/jump.mp3');
	backgroundSound = loadSound('assets/background.mp3');
	coinSound = loadSound('assets/coins.mp3');
	winSound = loadSound('assets/success.mp3');
	fallingSound = loadSound('assets/fall.mp3');
	enemySound = loadSound('assets/enemy.mp3');
	looseSound = loadSound('assets/loose.mp3');

	//set volume
	backgroundSound.setVolume(0.2);
	jumpSound.setVolume(0.3);
	coinSound.setVolume(0.3);
	winSound.setVolume(0.3);
	fallingSound.setVolume(0.3);
	enemySound.setVolume(0.3);
	looseSound.setVolume(0.3);
}


function setup() {
	createCanvas(1024, 576);

	floorPos_y = height * 3 / 4;
	player = {
		lives: 3,
		level: 1
	}

	start = false;
}


function draw() {




	background(100, 155, 255); // fill the sky blue

	noStroke();
	fill(76,31,94);
	rect(0, floorPos_y, width, height / 4); // draw some green ground
	push();
	translate(scrollPos, 0);


	if (!soundLoop) {
		backgroundSound.stop();
	}
	if(!start) {
		fill(100);
		rect(300, 150, 400, 200);
		fill(255)
		textSize(20)
		text( "Welcome To Uol Game \n Use Left & Right Arrow For Movement \
		\n Use The Space Key To Jump\n Press Space To Continue", 345, 220)
		
		return;
	}
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
			checkCollectable(collectables[i]);

		}



	}


	renderFlagpole();

	//enemies
	for (var i = 0; i < enemies.length; i++) {
		enemies[i].draw();

		var isContact = enemies[i].checkContact(gameChar_world_x, gameChar_y);

		if (isContact == true) {
			if (player.lives > 0) {
				enemySound.play();
				player.lives -= 1;
				startGame(player.level);
				break;
			}
		}

		// Logic to add off screen
		if ((scrollPos + enemies_x[i]) < -width) {
			enemies_x[i] = (-scrollPos) + random(0, width) + width;
			enemies.push(new Enemy(enemies_x[i], floorPos_y - 10, random(100, 200) * player.level / 2, player.level));
		}

	}
	pop();

	if (player.lives <= 0) {
		fill(255);
		noStroke();
		soundLoop = false;
		backgroundSound.stop();
		looseSound.play();
		noLoop();
		return text("Game over. Press space to continue.", 350, 220);
	}
	if (flagpole.isReached) {

		fill(255);
		noStroke();
		soundLoop = false;
		backgroundSound.stop();
		winSound.play();
		noLoop();
		return text("Level " + player.level + " complete. Press space to continue", 350, 220);

	}
	drawGameChar();

	fill(255);
	noStroke();
	text("score: " + player.game_score, 100, 20)





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
		backgroundSound.stop();
		fallingSound.play();
	}

	if (flagpole.isReached == false) {
		checkFlagpole();
	}

	checkPlayerDie()

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}

function startGame(level) {
	winSound.stop();
	backgroundSound.stop();
	backgroundSound.loop();

	if (level <= 0) { //prevent level from going below 0
		level = 1;
	}

	player.level = level;
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;

	soundLoop = true;

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
	enemies_x = [100, 400, 650, 800];
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

	player.game_score = 0;
	flagpole = {
		isReached: false,
		x_pos: 1700 * level
	}

	enemies = [];
	createEnemies();
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
	if (keyCode == 32) {
		if (!start) {
			startGame(player.level);
			start = true;
			return;
		}
		if (!isFalling && (gameChar_y == floorPos_y)) {
			gameChar_y -= 100;
			if (soundLoop) {
				jumpSound.play();

			}
		}
		if (flagpole.isReached || player.lives <= 0) {
			if (player.lives <= 0) {
				player.lives = 3;
				player.level = -1;
			}
			player.level += 1;

			startGame(player.level);


			loop();

		}
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
		fill(247,138,4);
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
		fill(247,138,4);
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
		fill(247,138,4);
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
		fill(247,138,4);
		rect(gameChar_x - 10, gameChar_y - 55, 20, 50);
		fill(255, 150, 150);
		ellipse(gameChar_x, gameChar_y - 55, 25, 40);
		fill(35);
		rect(gameChar_x - 12, gameChar_y - 10, 15, 10);
	}
	else if (isFalling || isPlummeting) {
		// add your jumping facing forwards code
		fill(247,138,4);
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

		fill(247,138,4);
		rect(gameChar_x - 13, gameChar_y - 35, 26, 30);

		fill(1,48,78);
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

function createEnemies() {
	for (var i = 0; i < enemies_x.length; i++) {
		enemies.push(new Enemy(enemies_x[i], floorPos_y - 10, random(50*player.level, 100*player.level) * (player.level) / 2, player.level));
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

	if (player.lives >= 0) {
		fill(255);
		noStroke();
		text("Lives: " + player.lives, 500, 20);
		text("Level: " + player.level, 900, 20);
	}


	if (gameChar_y > height * 1.5) {
		player.lives -= 1;
		if (player.lives <= 0) {

		}
		else {
			startGame(player.level);
		}
	}



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
		coinSound.play();
		player.game_score += 1;

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

function Enemy(x, y, range, inc) {
	this.x = x;
	this.y = y;
	this.range = range;

	this.currentX = x;
	this.inc = inc;
	this.level = inc;

	this.update = function() {
		this.currentX += this.inc;

		if (this.currentX >= this.x + this.range) {
			this.inc = -this.level;
		}
		else if (this.currentX < this.x)
		{
			this.inc = random(1, this.level);
		}
	}

	this.draw = function () {
		this.update();
		fill(255, 0, 0);
		ellipse(this.currentX, this.y, 30, 50);
		fill(0);
		ellipse(this.currentX + 9, this.y-5, 5, 5);
		ellipse(this.currentX - 3, this.y-5, 5, 5);
		fill(155);
		rect(this.currentX - 2, this.y + 5, random(10, this.inc), random(5, this.inc));
	}

	this.checkContact = function (gc_x, gc_y) {
		var d = dist(gc_x, gc_y, this.currentX, this.y);

		if (d < 20) {
			return true;
		}

		return false;
	}
}