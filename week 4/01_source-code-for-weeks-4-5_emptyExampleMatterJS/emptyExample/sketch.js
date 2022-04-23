// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  World = Matter.World,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint;
Mouse = Matter.Mouse;

var engine;
var box1;
var ground;
var ground1;
var ground2;
var circle;
var polygon;

var constraint1;
var poly1A;
var poly1B;

var poly2;
var constraint2;

var poly3;
var constraint3;

var boxes = [];

var canvas;

function setup() {
  canvas = createCanvas(800, 600);

  //create an engine
  engine = Engine.create();

  box1 = Bodies.rectangle(200, 200, 80, 80, {
    restitution: 0.8,
    friction: 0.5,
  });

  poly1A = Bodies.polygon(700, 100, 6, 20);
  poly1B = Bodies.polygon(700, 250, 1, 50);
  constraint1 = Constraint.create({
    bodyA: poly1A,
    pointA: { x: 0, y: 0 },
    bodyB: poly1B,
    pointB: { x: -10, y: -10 },
    stiffness: 0.01,
  });

  //   circle = Bodies.circle(80, 0, 20, {
  //     restitution: 0.8,
  //     friction: 0.5,
  //   });
  //   polygon = Bodies.polygon(100, 0, 5, 30, {
  //     restitution: 0.8,
  //     friction: 0.5,
  //   });

  ground = Bodies.rectangle(width / 2, height - 20, 800, 10, {
    isStatic: true,
    angle: 0,
  });
  //   ground2 = Bodies.rectangle(500, 500, 500, 10, {
  //     isStatic: true,
  //     angle: -Math.PI * 0.06,
  //   });

  World.add(engine.world, [ground, poly1A, poly1B, constraint1]);

  poly2 = Bodies.polygon(200, 200, 5, 40);
  constraint2 = Constraint.create({
    pointA: { x: 150, y: 50 },
    bodyB: poly2,
    pointB: { x: -10, y: -20 },
  });

  World.add(engine.world, [poly2, constraint2]);

  poly3 = Bodies.polygon(400, 100, 4, 30);
  constraint3 = Constraint.create({
    pointA: { x: 400, y: 120 },
    bodyB: poly3,
    pointB: { x: -10, y: -10 },
    stiffness: 0.01,
    damping: 0.05,
  });

  World.add(engine.world, [poly3, constraint3]);

  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
  };
  var mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}

function draw() {
  background(0);
  Engine.update(engine);

  fill(255);
  drawVertices(poly1A.vertices);
  drawVertices(poly1B.vertices);
  drawVertices(poly2.vertices);
  drawVertices(poly3.vertices);

  //   drawVertices(box1.vertices);
  //   drawVertices(circle.vertices);
  //   drawVertices(polygon.vertices);

  //   generateObject(width / 2, 0);

  //   for (var i = 0; i < boxes.length; i++) {
  //     drawVertices(boxes[i].vertices);

  //     if (isOffScreen(boxes[i])) {
  //       World.remove(engine.world, boxes[i]);
  //       boxes.splice(i, 1);
  //       i -= 1;
  //     }
  //   }

  stroke(128);
  drawConstraint(constraint1);
  drawConstraint(constraint2);
  drawConstraint(constraint3);

  noStroke();
  fill(128);
  drawVertices(ground.vertices);

  //   drawVertices(ground2.vertices);

  // push();
  // rectMode(CENTER);
  // fill(255);
  // var pos = box1.position;
  // translate(pos.x, pos.y);
  // rotate(box1.angle);
  // rect(0, 0, 80, 80);
  // pop();

  // push();
  // rectMode(CENTER);
  // fill(255);
  // var groundPos = ground.position;
  // translate(groundPos.x, groundPos.y);
  // rotate(ground.angle);
  // rect(0, 0, 810, 10);
  // pop();
}

function generateObject(x, y) {
  var b = Bodies.rectangle(x, y, random(10, 30), random(10, 30), {
    restitution: 0.8,
    friction: 0.5,
  });
  boxes.push(b);
  World.add(engine.world, [b]);
}

function isOffScreen(body) {
  return body.position.y > height || body.position.x > width;
}
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}

function drawConstraint(constraint) {
  var offsetA = constraint.pointA;
  var posA = { x: 0, y: 0 };
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = { x: 0, y: 0 };
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
}
