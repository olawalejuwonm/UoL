var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var start = false; //Determine when to start the game

//////////////////////////////////////////////////
function setup() {
  createCanvas(1200, 800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width / 2, height * 2.9);
  atmosphereSize = new createVector(width * 3, width * 3);
  earthLoc = new createVector(width / 2, height * 3.1);
  earthSize = new createVector(width * 3, width * 3);
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();

  if(!start) {
		fill(100);
		rect(300, 150, 400, 200);
		fill(255)
		textSize(20)
		text( "Welcome To Asteroid Game \n Use Left, Right, Up And Down \n Arrow Key For Movement \
		\n Press The Spacebar Key To Fire\n Press Enter To Continue", 345, 220)
		return;
	}



  // // Two circles that collide with each other
  // // const loc1 = { x: width / 2, y: height / 2 };
  // const loc1 = atmosphereLoc
  // const diameter1 = atmosphereSize;
  // const loc2 = { x: mouseX, y: mouseY };
  // const diameter2 = 100;
  // fill(255);
  // ellipse(loc1.x, loc1.y, diameter1, diameter1);
  // fill(0, 255, 0);

  // ellipse(loc2.x, loc2.y, diameter2, diameter2);

  // console.log(isInside(loc2, diameter2, loc1, diameter1));

  spaceship.run();
  asteroids.run();

  drawEarth();

  checkCollisions(spaceship, asteroids); // function that checks collision between various elements

  fill(255);
  textSize(40);
  text("ASTEROIDS DESTROYED: " + asteroids.asteroidsDestroyed , 0, 60);

}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth() {
  noStroke();
  //draw atmosphere
  fill(0, 0, 255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x, atmosphereSize.y);
  //draw earth
  fill(100, 255);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids) {
  //spaceship-2-asteroid collisions
  //YOUR CODE HERE (2-3 lines approx)
  for(var i = 0; i < asteroids.locations.length; i++){
    if(isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i]))gameOver();
  }
  //asteroid-2-earth collisions
  //YOUR CODE HERE (2-3 lines approx)
  for(var i = 0; i < asteroids.locations.length; i++){
    if(isInside(asteroids.locations[i], asteroids.diams[i], earthLoc, earthSize.x))gameOver();
  }

  //spaceship-2-earth
  //YOUR CODE HERE (1-2 lines approx)
  if(isInside(spaceship.location, spaceship.size, earthLoc, earthSize.x))gameOver();
  //spaceship-2-atmosphere
  //YOUR CODE HERE (1-2 lines approx)
  if(isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.x)) spaceship.setNearEarth()

  //bullet collisions
  //YOUR CODE HERE (3-4 lines approx)
  for(var i = 0; i < spaceship.bulletSys.bullets.length; i++){
    for(var j = 0; j < asteroids.locations.length; j++){
      if(isInside(spaceship.bulletSys.bullets[i], spaceship.bulletSys.diam, asteroids.locations[j], asteroids.diams[j])) asteroids.destroy(j);
    }
  }
  
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB) {
  // YOUR CODE HERE (3-5 lines approx)
  if (dist(locA.x, locA.y, locB.x, locB.y) < (sizeA / 2 + sizeB / 2)) {//dividing by 2 to get radius because the size of the object is the diameter
    return true;
  } else return false;
}

//////////////////////////////////////////////////
function keyPressed() {
  if (keyIsPressed && keyCode === 32) {
    // if spacebar is pressed, fire!
    spaceship.fire();
  }
  if (keyIsPressed && keyCode === 13) { //Press Enter to Start the Game
    start = true;
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver() {
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height / 2);
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky() {
  push();
  while (starLocs.length < 300) {
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i = 0; i < starLocs.length; i++) {
    rect(starLocs[i].x, starLocs[i].y, 2, 2);
  }

  if (random(1) < 0.3) starLocs.splice(int(random(starLocs.length)), 1);
  pop();
}
