// module aliases
var Engine = Matter.Engine,
  Render = Matter.Render,
  Runner = Matter.Runner,
  Bodies = Matter.Bodies,
  Composite = Matter.Composite,
  World = Matter.World;

var engine;
var box1;
var ground1;
var ground2;
var circle;
var polygon;

var boxes = [];

function setup() {
  createCanvas(900, 600);

  //create an engine
  engine = Engine.create();

  box1 = Bodies.rectangle(200, 200, 80, 80, {
    restitution: 0.8,
    friction: 0.5,
  });
  //   circle = Bodies.circle(80, 0, 20, {
  //     restitution: 0.8,
  //     friction: 0.5,
  //   });
  //   polygon = Bodies.polygon(100, 0, 5, 30, {
  //     restitution: 0.8,
  //     friction: 0.5,
  //   });

  ground1 = Bodies.rectangle(100, 200, 500, 10, {
    isStatic: true,
    angle: Math.PI * 0.06,
  });
  ground2 = Bodies.rectangle(500, 500, 500, 10, {
    isStatic: true,
    angle: -Math.PI * 0.06,
  });

  World.add(engine.world, [box1, ground1, ground2]);
}

function draw() {
  background(0);
  Engine.update(engine);

  fill(255);
  drawVertices(box1.vertices);
  //   drawVertices(circle.vertices);
  //   drawVertices(polygon.vertices);

  generateObject(width / 2, 0);

  for (var i = 0; i < boxes.length; i++) {
    drawVertices(boxes[i].vertices);

    if (isOffScreen(boxes[i])) {
      World.remove(engine.world, boxes[i]);
      boxes.splice(i, 1);
      i -= 1;
    }
  }

  fill(128);
  drawVertices(ground1.vertices);

  drawVertices(ground2.vertices);

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
