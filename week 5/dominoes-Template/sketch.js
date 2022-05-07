// Example is based on examples from:
// http://brm.io/matter-js/
// https://github.com/shiffman/p5-matter
// https://github.com/b-g/p5-matter-examples

// module aliases
var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Composites = Matter.Composites;
var Body = Matter.Body;

var engine;
var ball;
var ground;
var stack;
var dominoes = [];
function setup() {
  createCanvas(1200, 600);

  // create an engine
  engine = Engine.create();

  ball = Bodies.circle(30, 0, 20, {
    restitution: 1,
    friction: 0,
    density: 0.003,
  });

  var options = { isStatic: true, angle: Math.PI * 0 };
  ground = Bodies.rectangle(width / 2, 500, width, 10, options);
  smallGround = Bodies.rectangle(50, 470, 100, 10, {
    isStatic: true,
    angle: Math.PI * 0.2,
  });

  // add all of the bodies to the world
  World.add(engine.world, [ground, ball, smallGround]);

  setupDominoes();
}
/////////////////////////////////////////////////////////
function draw() {
  background(0);
  Engine.update(engine);

  fill(255);
  drawVertices(ball.vertices);

  drawDominoes();

  fill(128);
  drawVertices(ground.vertices);
  drawVertices(smallGround.vertices);
}
/////////////////////////////////////////////////////////
function setupDominoes() {
  // your code here
  // for (var i = 0; i < 10; i++) {
  //   var x = random(width);
  //   var y = random(height);
  //   var w = random(50, 100);
  //   var h = random(50, 100);
  //   const body = Bodies.rectangle(x, y, w, h, );
  //   dominoes.push(body);
  // }

  var stack = Composites.stack(
    200,
    200,
    30,
    1,
    20,
    0,
    function (x, y, column, row) {
      var partA = Bodies.rectangle(x, y, 10, 200);
      var partB = Bodies.rectangle(x, y, 50, 50);
      return Body.create({
        parts: [partA,],
      });
    }
  );
  console.log(stack);
  //push all bodies to dominoes array
  for (var i = 0; i < stack.bodies.length; i++) {
    dominoes.push(stack.bodies[i]);
  }
  World.add(engine.world, stack);
}
/////////////////////////////////////////////////////////
function drawDominoes() {
  // your code here
  for (var i = 0; i < dominoes.length; i++) {
    // var pos = dominoes[i].position;
    // var angle = dominoes[i].angle;
    // push();
    // translate(pos.x, pos.y);
    // rotate(angle);
    // rectMode(CENTER);
    fill(255);
    drawVertices(dominoes[i].vertices);
    // pop();
  }
}
/////////////////////////////////////////////////////////
// ********* HELPER FUNCTIONS **********
/////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
