// Example is based on examples from:
// http://brm.io/matter-js/
// https://github.com/shiffman/p5-matter
// https://github.com/b-g/p5-matter-examples

// module aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Constraint = Matter.Constraint;

var engine;
var ground;

var ball1;
var ball2;

var catapult;
var catapultSpacer;
var constraint;

function setup() {
  createCanvas(800, 600);
  engine = Engine.create(); // create an engine
  setupCatapult();
  setupBalls();
  setupGround();
}
/////////////////////////////////////////////////////////////
function draw() {
  background(0);
  Engine.update(engine);
  drawBalls();
  drawCatapult();
  drawGround();
}
/////////////////////////////////////////////////////////////
function setupCatapult(){
  // your code here
  catapult = Bodies.rectangle(width/2, height-20, 600, 10);
  constraint = Constraint.create({
    // bodyA: catapult,
    pointB: { x: -10, y: -10 },
    // bodyB: catapult,
    pointA: { x: width/2, y: height-20 },
    stiffness: 1,
    length: 0
  });

  World.add(engine.world, [catapult, constraint]);
  catapultSpacer = Bodies.rectangle(width/2 - 200, height, 25, 150, {isStatic: true});
  World.add(engine.world, [catapultSpacer]);


}
/////////////////////////////////////////////////////////////
function drawCatapult(){
  // your code here
  noStroke();
  fill(255);
  drawVertices(catapult.vertices);
  fill(255, 0, 0);
  drawVertices(catapultSpacer.vertices);

}
/////////////////////////////////////////////////////////////
function setupBalls(){
  // your code here
  ball1 = Bodies.circle(width/2 -270, 100, 20, {
    density: 0.01,
  });
  ball2 = Bodies.circle(width/2 - 200, 100, 20, {
    density: 0.01,
  });
  World.add(engine.world, [ ball1, ball2]);
}
/////////////////////////////////////////////////////////////
function drawBalls(){
  // your code here
  fill(0, 255, 0);
  drawVertices(ball1.vertices);
  fill(0, 0, 255);
  drawVertices(ball2.vertices);
}
/////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(400, height-10, 810, 25, {isStatic: true});
  World.add(engine.world, [ground]);
}
/////////////////////////////////////////////////////////////
function drawGround(){
  noStroke();
  fill(128);
  drawVertices(ground.vertices);
}
////////////////////////////////////////////////////////////////
// ******* HELPER FUNCTIONS *********
// DO NOT WRITE BELOW HERE
/////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
