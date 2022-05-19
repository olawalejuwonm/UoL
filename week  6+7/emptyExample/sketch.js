var tickle;
class TickleWalker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  display() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, 25, 25);
  }
  //mouse inside circle
  contains(x, y) {
    var d = dist(x, y, this.x, this.y);
    if (d < 25) {
      return true;
    } else {
      return false;
    }
  }
}

// function setup() {
//   createCanvas(900, 600);
//   background(0);
//   tickle = new TickleWalker(width / 2, height / 2);

//   rectMode(CENTER);
// }


// function draw() {
//     var randX = random(0, width);
//     var randY = random(0, height);

//     noStroke();
//     fill(random(255), random(255), random(255));
//     var size = random(10, 25);
//     ellipse(randX, randY, size, size);
// }

// function draw() {
//     background(0);
//     tickle.display();
//     if (tickle.contains(mouseX, mouseY)) {
//         tickle.move();
//     }
// }
//Noise
var time = 0;
// function draw() {
//   background(0);

//   var nx = noise(time);

//   var locX = map(nx, 0, 1, 0, width);
//   var g = map(nx, 0, 1, 0, 255);

//   var nY = noise(time + 5);
//   var locY = map(nY, 0, 1, 0, height);
  
//   var rotZ = map(nx, 0, 1, -25, 25);



//   translate(locX, locY);
//   rotate(rotZ);

//   fill(0, g, 0);
//   rect(0, 0, 50, 50);
//   time += 0.01;
// }

////2D Noise
// function setup() {
//   createCanvas(100, 100);
//   background(0);
//   rectMode(CENTER);

// }

// function draw() {
//   background(0);
//   // randomGrid();
//   noiseGrid();
//   noLoop();
// }

// function noiseGrid() {
//   for (var x = 0; x < width; x ++) {
//     for (var y = 0; y < height; y ++) {
//       var n = noise(x/10, y/10);
//       var c = map(n, 0, 1, 0, 255);

//       stroke(c);
//       point(x, y);

//       // var n = random(0, 1);
//       // if (n > 0.5) {
//       //   fill(0, 255, 0);
//       //   rect(x, y, 50, 50);
//       // }
//     }
//   }
// }

// function randomGrid() {
//   for (var x = 0; x < width; x ++) {
//     for (var y = 0; y < height; y ++) {
//       var c = random(0, 255);
//       stroke(c);
//       point(x, y);

//       // var n = random(0, 1);
//       // if (n > 0.5) {
//       //   fill(0, 255, 0);
//       //   rect(x, y, 50, 50);
//       // }
//     }
//   }
// }


//3D Noise

function setup() {
  createCanvas(200, 200);
  background(0);
  rectMode(CENTER);

}

function draw() {
  background(0);
  // randomGrid();
  noiseGrid();
  // noLoop();
}

function noiseGrid() {
  for (var x = 0; x < width; x ++) {
    for (var y = 0; y < height; y ++) {
      var n = noise(x/100, y/100, frameCount/100);
      var c = map(n, 0, 1, 0, 255);

      stroke(c);
      point(x, y);

      // var n = random(0, 1);
      // if (n > 0.5) {
      //   fill(0, 255, 0);
      //   rect(x, y, 50, 50);
      // }
    }
  }
}

